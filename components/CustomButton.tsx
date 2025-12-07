import React from "react";

type ButtonProps = {
    label: string;
    variant?: "primary" | "secondary";
    onClick: () => void;
};

export default function CustomButton({
    label,
    variant = "primary",
    onClick,
}: ButtonProps) {
    const baseStyle =
        "px-4 py-2 rounded-lg font-semibold transition-all duration-200 border-2 border-black neo-shadow hover:translate-x-1 hover:translate-y-1 hover:shadow-none";
    const variants = {
        primary: "bg-[--primary] text-secondary",
        secondary: "bg-[--secondary] text-secondary",
    };
    return (
        <button className={`${baseStyle} ${variants[variant]}`} onClick={onClick}>
            {label}
        </button>
    );
}
