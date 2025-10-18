import React from 'react';
import { useRouter } from 'next/router';

type ButtonProps = {
    label: string,
    variant?: "primary" | "secondary",
    onClick: () => void,
}

export default function CustomButton({label, variant="primary", onClick}: ButtonProps) {
    const baseStyle = "px-4 py-2 rounded-lg font-semibold transition-colors duration-200";
    const variants = {
        primary: "bg-blue-500 hover:bg-blue-600 text-white",
        secondary: "bg-green-400 hover:bg-green-500 text-white"
    };
    return (
            <button className={`${baseStyle} ${variants[variant]}`} onClick={onClick}>{ label }</button>
  )
}
