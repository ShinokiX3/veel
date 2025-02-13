import Button from '@/components/shared/ui/button';
import Checkbox from '@/components/shared/ui/checkbox';
import Input from '@/components/shared/ui/input';
import { useCreateTodo } from '@/lib/api/todo/api';
import React from 'react';

const FormCreateTodo: React.FC = () => {
    const { mutate: create, isPending } = useCreateTodo();
    
    const createTodo = async (formData: FormData) => {
        const title = formData.get('title') as string;
        const completed = !!formData.get('completed');

        if (!title) return;
        
        create({ 
            userId: 69, 
            title, 
            completed
        });
    };

    return (
        <form 
            action={createTodo} 
            className='mt-4 flex gap-2'
        >
            <Input 
                type="text" 
                name="title" 
                placeholder="Your Todo is Here..." 
                disabled={isPending} 
            />
            <Checkbox 
                name="completed"
                disabled={isPending}
            />
            <Button 
                type='submit' 
                disabled={isPending}
            >
                {isPending ? 'Creating...' : 'Create'}
            </Button>
        </form>
    );
};

export default FormCreateTodo;