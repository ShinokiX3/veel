import { axiosInstance } from "@/lib/axios";
import { PAG_LIMIT } from "@/lib/const/todo";
import { TodoItem } from "@/scheme/todo.type";

export async function getTodos(): Promise<TodoItem[]> {
    try {
        const response = await axiosInstance.get(`/todos?_limit=${PAG_LIMIT}&_page=1`);
        return response.data;
    } catch (error) {
        console.error("Error with get TODO:", error);
        throw new Error("Todo fetching issues");
    }
}