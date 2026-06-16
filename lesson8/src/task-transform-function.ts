import type { Todo, TodosResponse, TodoStatus } from './task-interface';
import { fetchTodos } from './task-function';

export interface EnrichedTodo {
    id: number;
    userId: number;
    title: string;
    titleFormatted: string;
    status: TodoStatus;
}

export interface UserTodoBucket {
    userId: number;
    total: number;
    completedCount: number;
    pendingCount: number;
    completionRate: string;
    todos: EnrichedTodo[];
}

export interface StatusBreakdown {
    completed: EnrichedTodo[];
    pending: EnrichedTodo[];
    completedCount: number;
    pendingCount: number;
    overallCompletionRate: string;
}

export interface TodoAnalysisResult {
    httpStatus: number;
    httpStatusText: string;
    totalTodos: number;
    enrichedTodos: EnrichedTodo[];
    byUser: UserTodoBucket[];
    byStatus: StatusBreakdown;
    keywordMatches: EnrichedTodo[];
}

function toTitleCase(str: string): string {
    return str.replace(/\b\w/g, (c) => c.toUpperCase());
}

function toEnriched(todo: Todo): EnrichedTodo {
    return {
        id: todo.id,
        userId: todo.userId,
        title: todo.title,
        titleFormatted: toTitleCase(todo.title),
        status: todo.completed ? 'completed' : 'pending'
    };
}

function toPercent(part: number, total: number): string {
    return total === 0 ? '0.00%' : `${((part / total) * 100).toFixed(2)}%`;
}

function buildUserBuckets(enriched: EnrichedTodo[]): UserTodoBucket[] {
    const map = new Map<number, EnrichedTodo[]>();
    for (const todo of enriched) {
        const bucket = map.get(todo.userId) ?? [];
        bucket.push(todo);
        map.set(todo.userId, bucket);
    }

    return Array.from(map.entries()).map(([userId, todos]) => {
        const completedCount = todos.filter((t) => t.status === 'completed').length;
        return {
            userId,
            total: todos.length,
            completedCount,
            pendingCount: todos.length - completedCount,
            completionRate: toPercent(completedCount, todos.length),
            todos
        };
    });
}

function buildStatusBreakdown(enriched: EnrichedTodo[]): StatusBreakdown {
    const completed = enriched.filter((t) => t.status === 'completed');
    const pending   = enriched.filter((t) => t.status === 'pending');
    return {
        completed,
        pending,
        completedCount: completed.length,
        pendingCount: pending.length,
        overallCompletionRate: toPercent(completed.length, enriched.length)
    };
}

export class TodoAnalysis {
    public readonly result: TodoAnalysisResult;
    public constructor(source: TodosResponse, keyword = '') {
        const enriched = source.data.map(toEnriched);
        const kw = keyword.toLowerCase().trim();

        this.result = {
            httpStatus:    source.status,
            httpStatusText: source.statusText,
            totalTodos:    enriched.length,
            enrichedTodos: enriched,
            byUser:        buildUserBuckets(enriched),
            byStatus:      buildStatusBreakdown(enriched),
            keywordMatches: kw
                ? enriched.filter((t) => t.title.toLowerCase().includes(kw))
                : []
        };
    }
}

function printSection(section: string): void {
    console.log(`\n${'─'.repeat(60)}`);
    console.log(`  ${section}`);
    console.log('─'.repeat(60));
}

fetchTodos()
    .then((response: TodosResponse) => {
        const analysis = new TodoAnalysis(response, 'velit');
        const r: TodoAnalysisResult = analysis.result;

        printSection('Overview');
        console.log(`HTTP ${r.httpStatus} ${r.httpStatusText} | total: ${r.totalTodos}`);
        console.log(`  Completed : ${r.byStatus.completedCount} (${r.byStatus.overallCompletionRate})`);
        console.log(`  Pending   : ${r.byStatus.pendingCount}`);

        printSection('Enriched todos (first 3)');
        r.enrichedTodos.slice(0, 3).forEach((t) =>
            console.log(`  [id=${t.id} userId=${t.userId}] [${t.status}] "${t.titleFormatted}"`)
        );

        printSection('By-user buckets');
        r.byUser.forEach((b) =>
            console.log(
                `  userId ${b.userId} | total ${b.total} | done ${b.completedCount}` +
        ` | pending ${b.pendingCount} | rate ${b.completionRate}`
            )
        );

        printSection('By-status breakdown');
        console.log(`  completed : ${r.byStatus.completedCount}`);
        console.log(`  pending   : ${r.byStatus.pendingCount}`);

        printSection('Keyword "velit" matches');
        console.log(`  Total: ${r.keywordMatches.length}`);
        r.keywordMatches.slice(0, 5).forEach((t) =>
            console.log(`  [id=${t.id}] [${t.status}] ${t.title}`)
        );
    })
    .catch((err: unknown) => {
        console.error('[ERROR]', err instanceof Error ? err.message : err);
        process.exit(1);
    });
