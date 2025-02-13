
import React, { useState } from "react";

export type ThemeCheckbox = 'filled';

interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
    theme?: ThemeCheckbox,
    classNames?: string,
    checked?: boolean;
    onChange?: () => void;
}

const checkboxStyles = {
    filled: "checkbox-filled",
};

const Checkbox: React.FC<CheckboxProps> = ({ theme = 'filled', disabled, ...props }) => {
    const [checked, setChecked] = useState(props.checked || false);
    const checkboxClass = checkboxStyles[theme];

    const handleChange = () => {
        setChecked(!checked);
        if (props.onChange) props.onChange();
    };

    return (
        <label className={`relative flex items-center cursor-pointer ${disabled && 'cursor-not-allowed'}`}>
            <input
                {...props}
                disabled={disabled}
                type="checkbox"
                onChange={handleChange}
                className="peer sr-only"
            />
            <div className={`${checkboxClass} ${disabled && 'bg-black'}`}>
                {checked && (
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="white"
                        strokeWidth="4"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="w-4 h-4"
                    >
                        <polyline points="20 6 9 17 4 12" />
                    </svg>
                )}
            </div>
        </label>
    );
};

export default Checkbox;

