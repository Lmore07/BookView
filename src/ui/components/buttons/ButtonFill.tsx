// Button.tsx
import React, { ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  onClick: () => void;
}

const Button: React.FC<ButtonProps> = ({ children, onClick }) => {
  return (
    <div className="flex justify-center">
      <button
        onClick={onClick}
        className="w-full font-open-sans font-bold py-2 rounded-lg bg-bgButtonFill text-textButtonFill hover:text-textButtonFillHover hover:bg-bgButtonFillHover"
      >
        {children}
      </button>
    </div>
  );
};

export default Button;
