import { ButtonHTMLAttributes } from "react";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
    variant?: "primary" | "secondary" | "danger" | "ghost";
};

export default function Button({
    variant = "primary",
    className = "",
    ...props
}: ButtonProps) {
    const variants = {
        primary: "bg-black text-white hover:bg-neutral-800",
        secondary:
            "border border-neutral-200 bg-white text-neutral-900 hover:bg-neutral-50",
        danger: "bg-red-50 text-red-600 hover:bg-red-100",
        ghost: "text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900",
    };

    return (
        <button
            className={`
        inline-flex items-center justify-center
        rounded-lg px-4 py-2
        text-sm font-medium
        transition-colors
        focus:outline-none focus:ring-2
        focus:ring-neutral-900 focus:ring-offset-2
        disabled:pointer-events-none
        disabled:opacity-50
        ${variants[variant]}
        ${className}
      `}
            {...props}
        />
    );
}
