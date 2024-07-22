// Button.tsx
import React, { ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  icon?: ReactNode | null;
  onClick?: () => void;
  className?: string | null;
  type?: "button" | "reset" | "submit";
}

const Button: React.FC<ButtonProps> = ({
  children,
  icon,
  onClick,
  className,
  type = "button",
}) => {
  return (
    <div className="flex justify-center">
      <button
        onClick={onClick}
        type={type}
        className={`w-full flex items-center justify-center font-custom font-bold py-2 rounded-lg px-3 ${
          className
            ? className
            : "bg-bgButtonFill text-textButtonFill hover:text-textButtonFillHover hover:bg-bgButtonFillHover"
        }`}
      >
        {icon && <span className="mr-2">{icon}</span>}
        {children}
      </button>
    </div>
  );
};

export default Button;
