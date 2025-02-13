"use server";
import { axiosInstance } from "@/lib/axios";
import { TodoCreateRequest, TodoDeleteRequest, TodoItem, TodoUpdateRequest } from "@/scheme/todo.type";

export async function createTodo(todo: TodoCreateRequest): Promise<TodoItem> {
	try {
		const response = await axiosInstance.post("/todos", todo);
		return response.data;
	} catch (error) {
		console.error("Error creating TODO:", error);
		throw new Error("Error creating TODO");
	}
}

export async function deleteTodo({ id }: TodoDeleteRequest): Promise<TodoItem> {
	try {
		const response = await axiosInstance.delete(`/todos/${id}`);
		return response.data;
	} catch (error) {
		console.error("Error deleting TODO:", error);
		throw new Error("Error deleting TODO");
	}
}

export async function updateTodo(todo: TodoUpdateRequest): Promise<TodoItem> {
	try {
		const response = await axiosInstance.put(`/todos/${todo.id}`, todo);
		return response.data;
	} catch (error) {
		console.error("Error updating TODO:", error);
		throw new Error("Error updating TODO");
	}
}

