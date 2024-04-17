// Button.tsx
import React, { ReactNode, useState } from "react";

interface ModalParentProps {
  children: ReactNode;
  onClose: () => void;
}


const ModalParent: React.FC<ModalParentProps> = ({ children, onClose }) => {
  return (
    <div
      className="fixed z-10 inset-0 overflow-y-auto w-full"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      <div className="flex items-center justify-center min-h-screen">
        <div
          className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
          aria-hidden="true"
        ></div>
        <div className="inline-block align-bottom bg-white rounded-lg overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-3xl sm:w-full">
          <button
            onClick={onClose}
            className="absolute top-0 right-0 p-2 transform hover:scale-150 transition duration-500 ease-in-out"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="h-6 w-6 text-gray-600"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
          {children}
        </div>
      </div>
    </div>
  );
};

export default ModalParent;
