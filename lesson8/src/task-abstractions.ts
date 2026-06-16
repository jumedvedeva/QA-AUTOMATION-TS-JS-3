import type { Todo, TodosResponse, FetchTodosOptions, TodoStatus } from './task-interface';
import { fetchTodos, fetchTodoById,
//countTodos,
// groupTodosByStatus,
// groupTodosByUser,
    filterTodos, filterTodosByStatus } from './task-function';
import { TodoAnalysis, type TodoAnalysisResult, type UserTodoBucket, type EnrichedTodo } from './task-transform-function';

export abstract class BaseTodoService {
    protected response: TodosResponse | null = null;
    public abstract fetch(options?: FetchTodosOptions): Promise<void>;
    public getTodos(): Todo[] {
        if (!this.response) throw new Error('No data loaded. Call fetch() first.');
        return this.response.data;
    }

    public get httpStatus(): number | null {
        return this.response?.status ?? null;
    }

    public get count(): number {
        return this.response?.data.length ?? 0;
    }

    public summary(): string {
        return `[${this.constructor.name}] HTTP ${this.httpStatus} | todos: ${this.count}`;
    }
}

export class AllTodosService extends BaseTodoService {

    public async fetch(options: FetchTodosOptions = {}): Promise<void> {
        this.response = await fetchTodos(options);
    }

    public countByStatus(completed?: boolean): number {
        const todos = this.getTodos();
        if (completed === undefined) return todos.length;
        return todos.filter((t) => t.completed === completed).length;
    }

    public countByUser(userId: number, completed?: boolean): number {
        const byUser = filterTodos(this.getTodos(), userId);
        if (completed === undefined) return byUser.length;
        return byUser.filter((t) => t.completed === completed).length;
    }

    public groupByUser(): Map<number, Todo[]> {
        return this.getTodos().reduce<Map<number, Todo[]>>((map, todo) => {
            const bucket = map.get(todo.userId) ?? [];
            bucket.push(todo);
            return map.set(todo.userId, bucket);
        }, new Map());
    }

    public groupByStatus(): Map<TodoStatus, Todo[]> {
        return this.getTodos().reduce<Map<TodoStatus, Todo[]>>(
            (map, todo) => {
                const key: TodoStatus = todo.completed ? 'completed' : 'pending';
                const bucket = map.get(key) ?? [];
                bucket.push(todo);
                return map.set(key, bucket);
            },
            new Map<TodoStatus, Todo[]>([['completed', []], ['pending', []]])
        );
    }

    public filterBy(userId?: number, completed?: boolean): Todo[] {
        return filterTodos(this.getTodos(), userId, completed);
    }

    public filterByStatus(status: TodoStatus, userId?: number): Todo[] {
        return filterTodosByStatus(this.getTodos(), status, userId);
    }
}

export class SingleTodoService extends BaseTodoService {
    private todoId: number;

    public constructor(todoId: number) {
        super();
        this.todoId = todoId;
    }

    public async fetch(): Promise<void> {
        const todo: Todo = await fetchTodoById(this.todoId);
        this.response = { data: [todo], status: 200, statusText: 'OK' };
    }

    public getTodo(): Todo {
        const todos = this.getTodos();
        if (todos.length === 0) throw new Error('Todo not loaded.');
        return todos[0];
    }

    public retarget(newTodoId: number): void {
        this.todoId = newTodoId;
        this.response = null;
    }
}

export class AnalyticsTodoService extends AllTodosService {
    private keyword: string;
    private _analysis: TodoAnalysis | null = null;

    public constructor(keyword = '') {
        super();
        this.keyword = keyword;
    }

    public override async fetch(options: FetchTodosOptions = {}): Promise<void> {
        await super.fetch(options);
        this._analysis = new TodoAnalysis(
            this.response!,
            this.keyword
        );
    }

    public get analysis(): TodoAnalysisResult {
        if (!this._analysis) throw new Error('Analysis not ready. Call fetch() first.');
        return this._analysis.result;
    }

    public get enrichedTodos(): EnrichedTodo[]  {
        return this.analysis.enrichedTodos;
    }
    public get byUser(): UserTodoBucket[]       {
        return this.analysis.byUser;
    }
    public get completedCount(): number         {
        return this.analysis.byStatus.completedCount;
    }
    public get pendingCount(): number           {
        return this.analysis.byStatus.pendingCount;
    }
    public get completionRate(): string         {
        return this.analysis.byStatus.overallCompletionRate;
    }
    public  get keywordMatches(): EnrichedTodo[] {
        return this.analysis.keywordMatches;
    }

    public override summary(): string {
        return (
            `${super.summary()} | done: ${this.completedCount}` +
      ` | pending: ${this.pendingCount}` +
      ` | rate: ${this.completionRate}`
        );
    }
}

export class TodoServiceComposer {
    public readonly all: AllTodosService;
    public readonly single: SingleTodoService;
    public readonly analytics: AnalyticsTodoService;

    public constructor(targetTodoId: number, keyword = '') {
        this.all       = new AllTodosService();
        this.single    = new SingleTodoService(targetTodoId);
        this.analytics = new AnalyticsTodoService(keyword);
    }

    public async fetchAll(): Promise<void> {
        await Promise.all([
            this.all.fetch(),
            this.single.fetch(),
            this.analytics.fetch()
        ]);
    }

    public summaries(): string[] {
        return [
            this.all.summary(),
            this.single.summary(),
            this.analytics.summary()
        ];
    }
}
