import { useMutation, useQuery, useQueryClient, UseQueryOptions } from "@tanstack/react-query";
import { createTodo, deleteTodo } from "@/app/api/todo/actions";
import type { TodoCreateRequest, TodoDeleteRequest, TodoItem, TodoUpdateRequest } from "@/scheme/todo.type";
import { getTodos } from "@/app/api/todo/routes";

interface MutationContext {
	previousTodos: TodoItem[],
	optimisticTodo: TodoItem
}

export function useTodos() {
	return useQuery<TodoItem[], Error>({
		queryKey: ["todos"],
		queryFn: getTodos,
		onError: (error: Error) => {
		  	console.error('Error occur while fetching todos:', error.message);
		},
	} as UseQueryOptions<TodoItem[], Error>);
}

export function useCreateTodo() {
	const queryClient = useQueryClient();
	
	return useMutation<
		TodoItem, 
		Error, 
		TodoCreateRequest, 
		MutationContext
	>({
		mutationFn: createTodo,
		onMutate: async (newTodo) => {
            await queryClient.cancelQueries({ queryKey: ['todos'] });
            
			const previousTodos = queryClient.getQueryData<TodoItem[]>(['todos']) || [];
            const optimisticTodo = { ...newTodo, id: Date.now() };
            
			queryClient.setQueryData<TodoItem[]>(['todos'], (old) => {
                if (old) {
                    return [...old, optimisticTodo];
                } else {
                    return [optimisticTodo];
                }
            });

            return { previousTodos, optimisticTodo };
        },
		onSuccess: (data, _, context) => {
			queryClient.setQueryData<TodoItem[]>(['todos'], (old) => {
                if (old) {
                    return old.map(
						todo => todo.id === context.optimisticTodo.id ? 
						{ ...todo, id: data.id + Math.floor(Math.random() * 1000) } : todo
					);
                } else {
                    return [data];
                }
            });
		},
		onError: (error, _, context) => {
			if (context) 
				queryClient.setQueryData<TodoItem[]>(['todos'], context.previousTodos);

            console.error('Some mutation issues:', error);        
        }
	});
}

export function useDeleteTodo() {
	const queryClient = useQueryClient();
	
	return useMutation<
		TodoItem, 
		Error, 
		TodoDeleteRequest, 
		Omit<MutationContext, 'optimisticTodo'>
	>({
		mutationFn: deleteTodo,
		onMutate: async ({ id }) => {
            await queryClient.cancelQueries({ queryKey: ['todos'] });
            const previousTodos = queryClient.getQueryData<TodoItem[]>(['todos']) || [];

            queryClient.setQueryData<TodoItem[]>(['todos'], (old) => {
                if (old) {
                    return old.filter(todo => todo.id !== id);
                } else {
                    return [];
                }
            });

            return { previousTodos };
        },
        onSuccess: () => {},
        onError: (error, _, context) => {
            if (context) 
				queryClient.setQueryData<TodoItem[]>(['todos'], context.previousTodos);

            console.error('Cannot delete todo', error);
        },
	});
}

export function useUpdateTodo() {
	const queryClient = useQueryClient();
	
	return useMutation<
		TodoItem, 
		Error, 
		TodoUpdateRequest, 
		Omit<MutationContext, 'optimisticTodo'>
	>({
		mutationFn: deleteTodo,
		onMutate: async (todo) => {
            await queryClient.cancelQueries({ queryKey: ['todos'] });
            const previousTodos = queryClient.getQueryData<TodoItem[]>(['todos']) || [];

            queryClient.setQueryData<TodoItem[]>(['todos'], (old) => {
                if (old) {
                    return old.map((prevTodo) => 
						prevTodo.id === todo.id ? { ...prevTodo, ...todo } : prevTodo
					);
                } else {
                    return [];
                }
            });

            return { previousTodos };
        },
        onSuccess: () => {},
        onError: (error, _, context) => {
            if (context) 
				queryClient.setQueryData<TodoItem[]>(['todos'], context.previousTodos);

            console.error('Cannot delete todo', error);
        },
	});
}
