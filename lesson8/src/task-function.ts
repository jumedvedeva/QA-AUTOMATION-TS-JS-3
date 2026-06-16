import type { Todo, TodosResponse, FetchTodosOptions, TodoStatus } from './task-interface';

const BASE_URL = 'https://jsonplaceholder.typicode.com';

function buildUrl(options: FetchTodosOptions): string {
    if (options.todoId !== undefined) {
        return `${BASE_URL}/todos/${options.todoId}`;
    }

    const url = new URL(`${BASE_URL}/todos`);

    if (options.userId !== undefined) {
        url.searchParams.set('userId', String(options.userId));
    }

    if (options.completed !== undefined) {
        url.searchParams.set('completed', String(options.completed));
    }

    return url.toString();
}

export async function fetchTodos(
    options: FetchTodosOptions = {}
): Promise<TodosResponse> {
    const url = buildUrl(options);
    const response = await fetch(url, { signal: options.signal });

    if (!response.ok) {
        throw new Error(
            `Failed to fetch todos: ${response.status} ${response.statusText} — ${url}`
        );
    }

    const raw: unknown = await response.json();
    const data: Todo[] = Array.isArray(raw) ? (raw as Todo[]) : [raw as Todo];

    return { data, status: response.status, statusText: response.statusText };
}

export async function fetchTodoById(
    todoId: number,
    signal?: AbortSignal
): Promise<Todo> {
    const { data } = await fetchTodos({ todoId, signal });
    const todo = data[0];
    if (!todo) throw new Error(`Todo with id ${todoId} not found`);
    return todo;
}

export async function countTodos(
    options: FetchTodosOptions = {}
): Promise<number> {
    const { data } = await fetchTodos(options);
    return data.length;
}

export async function groupTodosByUser(
    options: FetchTodosOptions = {}
): Promise<Map<number, Todo[]>> {
    const { data } = await fetchTodos(options);
    return data.reduce<Map<number, Todo[]>>((map, todo) => {
        const bucket = map.get(todo.userId) ?? [];
        bucket.push(todo);
        return map.set(todo.userId, bucket);
    }, new Map());
}

export async function groupTodosByStatus(
    options: FetchTodosOptions = {}
): Promise<Map<TodoStatus, Todo[]>> {
    const { data } = await fetchTodos(options);
    return data.reduce<Map<TodoStatus, Todo[]>>(
        (map, todo) => {
            const key: TodoStatus = todo.completed ? 'completed' : 'pending';
            const bucket = map.get(key) ?? [];
            bucket.push(todo);
            return map.set(key, bucket);
        },
        new Map<TodoStatus, Todo[]>([
            ['completed', []],
            ['pending', []]
        ])
    );
}

export function filterTodos(
    todos: Todo[],
    userId?: number,
    completed?: boolean
): Todo[] {
    return todos.filter((todo) => {
        const matchUser      = userId    === undefined || todo.userId    === userId;
        const matchCompleted = completed === undefined || todo.completed === completed;
        return matchUser && matchCompleted;
    });
}

export function filterTodosByStatus(
    todos: Todo[],
    status: TodoStatus,
    userId?: number
): Todo[] {
    return filterTodos(todos, userId, status === 'completed');
}
