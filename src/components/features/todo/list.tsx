import React, { useEffect, useRef } from 'react';
import { useTodos } from '@/lib/api/todo/api';
import TodoItem from './item';
import Stub from '@/components/shared/common/stub';

const TodoList = () => {
    const { data } = useTodos();

    const scrollContainerRef = useRef<HTMLDivElement | null>(null);
    const prevDataRef = useRef<typeof data | []>([]);

    useEffect(() => {
        if (!scrollContainerRef.current || !prevDataRef.current) return;

        if (data && data.length > prevDataRef.current.length) {
            scrollContainerRef.current.scrollTo({
                top: scrollContainerRef.current.scrollHeight,
                behavior: 'smooth',
            });
        }

        prevDataRef.current = data;
    }, [data]);

    return (
        <div ref={scrollContainerRef} className='flex flex-col p-2 gap-3 h-[400px] md:w-[500px] overflow-auto'>
            {data?.length === 0 && <Stub passage="Empty Todo List" />}
            {data?.map(todo => ( 
                <TodoItem key={todo.id} {...todo} /> 
            ))}
        </div>
    );
};

export default TodoList;