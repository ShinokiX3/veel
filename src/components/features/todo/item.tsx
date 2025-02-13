import React, { useState } from 'react';
import Button from '@/components/shared/ui/button';
import Checkbox from '@/components/shared/ui/checkbox';
import { useDeleteTodo, useUpdateTodo } from '@/lib/api/todo/api';

interface TodoItemProps {
    id: number,
    userId: number,
    title: string,
    completed: boolean
}

const TodoItem: React.FC<TodoItemProps> = ({ ...props }) => {
    const { mutate: update, isPending } = useUpdateTodo();
    const { mutate: deletion } = useDeleteTodo();

    const [animateDelete, setAnimateDelete] = useState<boolean>(false);

    const {
        id,
        userId,
        title,
        completed,
    } = props;

    const handleUpdateTodo = () => {
        const todo = { id, userId, title, completed: !completed };

        update(todo);
    };

    const handleDeleteTodo = async (id: number) => {
        if (!id) return;

        setAnimateDelete(true);
        setTimeout(() => { deletion({ id }) }, 300);
    }

    return (
        <div className={`flex justify-between p-3 rounded-md bg-primaryLight transition-all duration-300 ease-in-out
            ${animateDelete ? 'opacity-0 scale-95' : 'opacity-100 scale-100'}`}
        >
            <div className='flex gap-3'>
                <p className='font-bold'>{`User ${userId}`}</p>
                <p className={`${completed && 'line-through'} italic`}>{title}</p>
            </div>
            <div className='flex gap-3'>
                <Checkbox checked={completed} disabled={isPending} onChange={handleUpdateTodo} />
                <Button theme='clear' onClick={() => handleDeleteTodo(id)}> ❌ </Button>
            </div>
        </div>
    );
};

export default TodoItem;