import type { Todo, TodosResponse, FetchTodosOptions, TodoStatus } from './task-interface';
import {
    fetchTodos,
    fetchTodoById,
    countTodos,
    groupTodosByUser,
    groupTodosByStatus,
    filterTodos,
    filterTodosByStatus
} from './task-function';
import { TodoAnalysis, type TodoAnalysisResult } from './task-transform-function';
import {
    AllTodosService,
    SingleTodoService,
    AnalyticsTodoService,
    TodoServiceComposer
} from './task-abstractions';


function printSection(section: string): void {
    console.log(`\n${'═'.repeat(60)}`);
    console.log(`  ${section}`);
    console.log('═'.repeat(60));
}

function sub(label: string): void {
    console.log(`\n  ── ${label}`);
}

async function runFetchTodos(): Promise<TodosResponse> {
    printSection('function.ts › fetchTodos()');

    const response: TodosResponse = await fetchTodos();
    console.log(`HTTP ${response.status} ${response.statusText} | total: ${response.data.length}`);

    const first: Todo = response.data[0];
    console.log(`First : [id=${first.id}] [${first.completed ? '✓' : '○'}] "${first.title}"`);

    sub('Server-side: userId=2');
    const byUser: TodosResponse = await fetchTodos({ userId: 2 });
    console.log(`  todos for userId 2: ${byUser.data.length}`);
    byUser.data.slice(0, 3).forEach((t: Todo) =>
        console.log(`  [${t.id}] [${t.completed ? '✓' : '○'}] ${t.title}`)
    );

    sub('Server-side: completed=true');
    const done: TodosResponse = await fetchTodos({ completed: true });
    console.log(`  completed todos (all users): ${done.data.length}`);

    sub('Server-side: userId=3 & completed=false');
    const opts: FetchTodosOptions = { userId: 3, completed: false };
    const pending: TodosResponse = await fetchTodos(opts);
    console.log(`  pending todos for userId 3: ${pending.data.length}`);

    return response;
}

async function runFetchTodoById(todoId: number): Promise<void> {
    printSection(`function.ts › fetchTodoById(${todoId})`);

    const todo: Todo = await fetchTodoById(todoId);
    console.log(JSON.stringify(todo, null, 2));
}

async function runCountTodos(): Promise<void> {
    printSection('function.ts › countTodos() — network-based');

    const total      = await countTodos();
    const doneAll    = await countTodos({ completed: true });
    const pendingAll = await countTodos({ completed: false });
    const doneU1     = await countTodos({ userId: 1, completed: true });
    const pendingU2  = await countTodos({ userId: 2, completed: false });

    console.log(`  Total todos            : ${total}`);
    console.log(`  Completed (all users)  : ${doneAll}`);
    console.log(`  Pending   (all users)  : ${pendingAll}`);
    console.log(`  Completed for userId 1 : ${doneU1}`);
    console.log(`  Pending   for userId 2 : ${pendingU2}`);
}

async function runGroupTodosByUser(): Promise<void> {
    printSection('function.ts › groupTodosByUser() — network-based');

    const groups: Map<number, Todo[]> = await groupTodosByUser();

    groups.forEach((todos, userId) => {
        const done = todos.filter((t) => t.completed).length;
        console.log(
            `  userId ${userId} | total ${todos.length} | done ${done} | pending ${todos.length - done}`
        );
    });
}

async function runGroupTodosByStatus(): Promise<void> {
    printSection('function.ts › groupTodosByStatus() — network-based');

    const groups: Map<TodoStatus, Todo[]> = await groupTodosByStatus();

    groups.forEach((todos, status) => {
        console.log(`  ${status} : ${todos.length} todos`);
    });
}

function runFilterTodos(todos: Todo[]): void {
    printSection('function.ts › filterTodos() + filterTodosByStatus() — in-memory');

    sub('filterTodos(all, userId=5)');
    const u5 = filterTodos(todos, 5);
    console.log(`  todos for userId 5: ${u5.length}`);

    sub('filterTodos(all, undefined, completed=false)');
    const allPending = filterTodos(todos, undefined, false);
    console.log(`  all pending todos: ${allPending.length}`);

    sub('filterTodos(all, userId=4, completed=true)');
    const u4done = filterTodos(todos, 4, true);
    console.log(`  completed by userId 4: ${u4done.length}`);
    u4done.slice(0, 3).forEach((t) => console.log(`  [${t.id}] ${t.title}`));

    sub('filterTodosByStatus(all, "pending", userId=1)');
    const u1pending = filterTodosByStatus(todos, 'pending', 1);
    console.log(`  pending todos for userId 1: ${u1pending.length}`);

    sub('filterTodosByStatus(all, "completed")');
    const allDone = filterTodosByStatus(todos, 'completed');
    console.log(`  all completed todos: ${allDone.length}`);
}


function runTransformer(source: TodosResponse): void {
    printSection('transformer.ts › new TodoAnalysis(response)');

    const analysis = new TodoAnalysis(source, 'velit');
    const r: TodoAnalysisResult = analysis.result;

    sub('Overview');
    console.log(
        `  Total: ${r.totalTodos} | Completed: ${r.byStatus.completedCount}` +
    ` | Pending: ${r.byStatus.pendingCount} | Rate: ${r.byStatus.overallCompletionRate}`
    );

    sub('Enriched todos (first 3)');
    r.enrichedTodos.slice(0, 3).forEach((t) =>
        console.log(`  [id=${t.id} userId=${t.userId}] [${t.status}] "${t.titleFormatted}"`)
    );

    sub('By-user buckets');
    r.byUser.forEach((b) =>
        console.log(
            `  userId ${b.userId} | total ${b.total} | done ${b.completedCount}` +
      ` | pending ${b.pendingCount} | rate ${b.completionRate}`
        )
    );

    sub('By-status breakdown');
    console.log(`  completed : ${r.byStatus.completedCount}`);
    console.log(`  pending   : ${r.byStatus.pendingCount}`);
    console.log(`  rate      : ${r.byStatus.overallCompletionRate}`);

    sub('Keyword "velit" matches');
    console.log(`  Total: ${r.keywordMatches.length}`);
    r.keywordMatches.slice(0, 3).forEach((t) =>
        console.log(`  [id=${t.id}] [${t.status}] ${t.title}`)
    );

    sub('Second instance — keyword "quo"');
    const r2 = new TodoAnalysis(source, 'quo').result;
    console.log(`  "quo" matches: ${r2.keywordMatches.length}`);
}

async function runAllTodosService(): Promise<void> {
    printSection('abstraction.ts › AllTodosService (extends BaseTodoService)');

    const svc = new AllTodosService();
    await svc.fetch();
    console.log(svc.summary());

    sub('countByStatus(true) — completed');
    console.log(`  Completed: ${svc.countByStatus(true)}`);

    sub('countByStatus(false) — pending');
    console.log(`  Pending: ${svc.countByStatus(false)}`);

    sub('countByUser(1, true) — completed for userId 1');
    console.log(`  Completed by userId 1: ${svc.countByUser(1, true)}`);

    sub('groupByUser()');
    svc.groupByUser().forEach((todos, userId) =>
        console.log(`  userId ${userId} → ${todos.length} todos`)
    );

    sub('groupByStatus()');
    svc.groupByStatus().forEach((todos, status) =>
        console.log(`  ${status} → ${todos.length} todos`)
    );

    sub('filterBy(userId=2, completed=true)');
    const u2done = svc.filterBy(2, true);
    console.log(`  Completed by userId 2: ${u2done.length}`);
    u2done.slice(0, 2).forEach((t) => console.log(`  [${t.id}] ${t.title}`));

    sub('filterByStatus("pending", userId=3)');
    const u3pending = svc.filterByStatus('pending', 3);
    console.log(`  Pending for userId 3: ${u3pending.length}`);
}

async function runSingleTodoService(todoId: number): Promise<void> {
    printSection(`abstraction.ts › SingleTodoService(${todoId}) (extends BaseTodoService)`);

    const svc = new SingleTodoService(todoId);
    await svc.fetch();
    console.log(svc.summary());

    const todo: Todo = svc.getTodo();
    console.log(`\n  Todo : [id=${todo.id}] [${todo.completed ? '✓' : '○'}] "${todo.title}"`);

    sub(`retarget(${todoId + 1}) then re-fetch`);
    svc.retarget(todoId + 1);
    await svc.fetch();
    const next = svc.getTodo();
    console.log(`  New  : [id=${next.id}] [${next.completed ? '✓' : '○'}] "${next.title}"`);
}

async function runAnalyticsTodoService(): Promise<void> {
    printSection(
        'abstraction.ts › AnalyticsTodoService (extends AllTodosService + composes TodoAnalysis)'
    );

    const svc = new AnalyticsTodoService('eum');
    await svc.fetch();
    console.log(svc.summary());

    sub('Enriched todos (first 2)');
    svc.enrichedTodos.slice(0, 2).forEach((t) =>
        console.log(`  [id=${t.id}] [${t.status}] "${t.titleFormatted}"`)
    );

    sub('By-user buckets');
    svc.byUser.forEach((b) =>
        console.log(
            `  userId ${b.userId} | total ${b.total} | done ${b.completedCount} | rate ${b.completionRate}`
        )
    );

    sub('Completed / pending counts from analytics layer');
    console.log(`  Completed : ${svc.completedCount}`);
    console.log(`  Pending   : ${svc.pendingCount}`);
    console.log(`  Rate      : ${svc.completionRate}`);

    sub('Keyword "eum" matches');
    console.log(`  Total: ${svc.keywordMatches.length}`);
    svc.keywordMatches.slice(0, 3).forEach((t) =>
        console.log(`  [id=${t.id}] ${t.title}`)
    );

    sub('AllTodosService methods still accessible (filterBy / groupByStatus)');
    const pending = svc.filterByStatus('pending');
    console.log(`  All pending (via inherited filterByStatus): ${pending.length}`);
}

async function runComposer(): Promise<void> {
    printSection('abstraction.ts › TodoServiceComposer (pure composition)');

    const composer = new TodoServiceComposer(10, 'aut');
    await composer.fetchAll();

    sub('Summaries from all composed services');
    composer.summaries().forEach((s) => console.log(`  ${s}`));

    sub('composer.all — countByStatus / groupByStatus');
    console.log(`  Completed (all): ${composer.all.countByStatus(true)}`);
    console.log(`  Pending   (all): ${composer.all.countByStatus(false)}`);
    composer.all.groupByStatus().forEach((todos, status) =>
        console.log(`  ${status} → ${todos.length}`)
    );

    sub('composer.single — targeted todo');
    const single: Todo = composer.single.getTodo();
    console.log(`  [id=${single.id}] [${single.completed ? '✓' : '○'}] "${single.title}"`);

    sub('composer.analytics — keyword "aut" matches');
    console.log(`  Matches: ${composer.analytics.keywordMatches.length}`);
    composer.analytics.keywordMatches.slice(0, 3).forEach((t) =>
        console.log(`  [id=${t.id}] ${t.title}`)
    );

    sub('composer.analytics — byUser rates');
    composer.analytics.byUser.forEach((b) =>
        console.log(`  userId ${b.userId} | rate ${b.completionRate}`)
    );
}


async function main(): Promise<void> {
    const allResponse = await runFetchTodos();
    await runFetchTodoById(12);
    await runCountTodos();
    await runGroupTodosByUser();
    await runGroupTodosByStatus();
    runFilterTodos(allResponse.data);
    runTransformer(allResponse);
    await runAllTodosService();
    await runSingleTodoService(5);
    await runAnalyticsTodoService();
    await runComposer();
    printSection('All scenarios completed ✓');
}

main().catch((err: unknown) => {
    console.error('\n[ERROR]', err instanceof Error ? err.message : err);
    process.exit(1);
});
