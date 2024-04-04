// Button.tsx
import React, { ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  icon?: ReactNode | null;
  onClick: () => void;
}

const Button: React.FC<ButtonProps> = ({ children, icon, onClick }) => {
  return (
    <div className="flex justify-center">
      <button
        onClick={onClick}
        className="w-full font-open-sans font-bold py-2 rounded-lg bg-bgButtonFill text-textButtonFill hover:text-textButtonFillHover hover:bg-bgButtonFillHover"
      >
        {icon && <span className="mr-2">{icon}</span>}
        {children}
      </button>
    </div>
  );
};

export default Button;
