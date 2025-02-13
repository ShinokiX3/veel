'use client';
import React from 'react';
import FormCreateTodo from './form';
import TodoList from './list';


const Todos = () => {
    return (
        <>
            <TodoList />
            <FormCreateTodo />
        </>
    );
};

export default Todos;
