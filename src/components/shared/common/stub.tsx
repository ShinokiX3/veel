import React from 'react';
import Image from 'next/image';
import emptyImage from '@/assets/images/empty.jpg';

interface StubProps {
    passage?: string;
}

const Stub: React.FC<StubProps> = ({ passage = 'Epmpty' }) => {
    return (
        <div className='flex flex-col-reverse items-center justify-center h-fit w-auto gap-4'>
            <div className='flex items-center'>
                <span className="text-6xl">🪹</span>
                <p className='font-bold italic text-3xl'>{passage}</p>
            </div>
            <Image
                src={emptyImage}
                alt="Empty data"
                width={250}
                priority
                className="rounded-lg shadow-lg"
            />
        </div>
    );
};

export default Stub;