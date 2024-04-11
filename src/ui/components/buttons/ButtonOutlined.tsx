// Button.tsx
import React, { ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  icon?: ReactNode | null;
  className?: string | null;
  onClick: () => void;
}

const ButtonOutlined: React.FC<ButtonProps> = ({
  children,
  icon,
  onClick,
  className,
}) => {
  return (
    <div className="flex justify-center">
      <button
        onClick={onClick}
        className={`w-full flex items-center justify-center bg-bgButtonOutlined font-open-sans border font-bold py-[6px] px-3 rounded-md text-[16px] ${
          className ? className : "border-textButtonOutlined text-textButtonOutlined hover:text-textButtonOutlinedHover hover:bg-bgButtonOutlinedHover"
        }`}
      >
        {icon && <span className="mr-2">{icon}</span>}
        {children}
      </button>
    </div>
  );
};

export default ButtonOutlined;
