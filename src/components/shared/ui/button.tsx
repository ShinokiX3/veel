import React from 'react';

export type ThemeButton = 'clear' | 'filled';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    theme?: ThemeButton;
    classNames?: string;
    children?: React.ReactNode;
}

const buttonStyles = {
    filled: "btn-filled",
    clear: "btn-clear",
};

const Button: React.FC<ButtonProps> = ({ 
    theme = 'filled',
    children, 
    ...props 
}) => {
    const buttonClass = buttonStyles[theme];

    return (
        <button 
            {...props}
            className={`btn ${buttonClass} ${props.classNames}`} 
        >
            { children ? children : null }
        </button>
    );
};

export default Button;