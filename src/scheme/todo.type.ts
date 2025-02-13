export type TodoItemId = number;

export interface TodoItem {
    userId: number;
    id: TodoItemId;
    title: string;
    completed: boolean;
}

export type TodoGetRequest = {
    pag?: number,
    page?: number
};
export type TodoCreateRequest = Omit<TodoItem, 'id'>;
export type TodoDeleteRequest = {
    id: number
};
export type TodoUpdateRequest = Partial<TodoItem> & Required<Pick<TodoItem, 'id'>>;
