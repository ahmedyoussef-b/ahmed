
import React from "react";
import { cn } from "@/lib/utils";

interface AnimatedButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost";
  size?: "default" | "sm" | "lg";
  children: React.ReactNode;
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
}

const AnimatedButton = ({
  variant = "primary",
  size = "default",
  children,
  className,
  icon,
  iconPosition = "right",
  ...props
}: AnimatedButtonProps) => {
  const baseStyles = "relative inline-flex items-center justify-center font-medium transition-all duration-300 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 overflow-hidden";

  const variantStyles = {
    primary: "bg-primary text-primary-foreground hover:bg-primary/90 focus:ring-primary/50",
    secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80 focus:ring-secondary/50",
    ghost: "bg-transparent hover:bg-secondary focus:ring-secondary/50"
  };

  const sizeStyles = {
    sm: "px-4 py-1.5 text-sm",
    default: "px-5 py-2 text-base",
    lg: "px-6 py-3 text-lg"
  };

  return (
    <button
      className={cn(
        baseStyles,
        variantStyles[variant],
        sizeStyles[size],
        "group",
        className
      )}
      {...props}
    >
      <span className="relative flex items-center gap-2">
        {icon && iconPosition === "left" && (
          <span className="transition-transform duration-300 ease-apple group-hover:-translate-x-0.5">
            {icon}
          </span>
        )}
        <span className="transition-transform duration-300 ease-apple group-hover:translate-x-0.5">
          {children}
        </span>
        {icon && iconPosition === "right" && (
          <span className="transition-transform duration-300 ease-apple group-hover:translate-x-1">
            {icon}
          </span>
        )}
      </span>
    </button>
  );
};

export default AnimatedButton;
