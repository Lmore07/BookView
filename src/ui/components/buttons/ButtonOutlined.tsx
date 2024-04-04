// Button.tsx
import React, { ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  icon?: ReactNode | null;
  onClick: () => void;
}

const ButtonOutlined: React.FC<ButtonProps> = ({ children, icon, onClick }) => {
  return (
    <div className="flex justify-center">
      <button
        onClick={onClick}
        className="w-full flex items-center justify-center font-open-sans border border-textButtonOutlined font-bold py-[6px] px-3 rounded-md bg-bgButtonOutlined text-[16px] text-textButtonOutlined hover:text-textButtonOutlinedHover hover:bg-bgButtonOutlinedHover"
      >
        {icon && <span className="mr-2">{icon}</span>}
        {children}
      </button>
    </div>
  );
};

export default ButtonOutlined;
