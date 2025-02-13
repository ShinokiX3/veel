import React from 'react';

export type ThemeInput = 'default';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    theme?: ThemeInput,
    classNames?: string,
    value?: string,
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void,
}

const inputStyles = {
    default: "input-default",
};

const Input: React.FC<InputProps> = ({ 
    theme = 'default', 
    ...props 
}) => {
    const inputClass = inputStyles[theme];

    return (
        <input 
            {...props}
            className={`input ${inputClass} ${props.classNames}`}
        />
  );
};

export default Input;
