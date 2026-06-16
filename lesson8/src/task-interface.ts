export interface Todo {
    id: number;
    userId: number;
    title: string;
    completed: boolean;
}

export interface TodosResponse {
    data: Todo[];
    status: number;
    statusText: string;
}

export interface FetchTodosOptions {
    userId?: number;
    todoId?: number;
    completed?: boolean;
    signal?: AbortSignal;
}

export type TodoStatus = 'completed' | 'pending';
