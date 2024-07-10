import { forwardRef } from "react";
import { twMerge } from "tailwind-merge";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    className?: string;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(({ children, type = "button", className, ...props }, ref) => {
    return (
        <button
            type={type}
            ref={ref}
            className={twMerge(
                'px-3 py-3 hover:opacity-75 w-full rounded-full bg-green-500 border border-transparent disabled:opacity-50 text-black font-bold transition',
                className 
            )}
            {...props}
        >
            {children}
        </button>
    );
});

Button.displayName = 'Button';

export default Button;
