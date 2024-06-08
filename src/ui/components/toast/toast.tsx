import { ToastProps, ToastType } from "@/libs/interfaces/toast.interface";
import React, { useState, useEffect } from "react";

const Toast: React.FC<ToastProps> = ({
  message,
  type = ToastType.INFO,
  duration = 3000,
  onClose,
}) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(true);
    const timer = setTimeout(() => {
      setVisible(false);
      if (onClose) {
        onClose();
      }
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const getTitle = () => {
    switch (type) {
      case ToastType.SUCCESS:
        return "Éxito";
      case ToastType.ERROR:
        return "Error";
      case ToastType.WARNING:
        return "Advertencia";
      case ToastType.INFO:
        return "Información";
    }
  };

  const getBackgroundColor = () => {
    switch (type) {
      case ToastType.SUCCESS:
        return "bg-emerald-500";
      case ToastType.ERROR:
        return "bg-red-500";
      case ToastType.WARNING:
        return "bg-yellow-500";
      case ToastType.INFO:
        return "bg-blue-500";
    }
  };

  const getTextColor = () => {
    switch (type) {
      case ToastType.SUCCESS:
        return "text-emerald-500";
      case ToastType.ERROR:
        return "text-red-500";
      case ToastType.WARNING:
        return "text-yellow-400";
      case ToastType.INFO:
        return "text-blue-500";
    }
  };

  const getIcon = () => {
    switch (type) {
      case "success":
        return (
          <svg
            className="w-6 h-6 text-white fill-current"
            viewBox="0 0 40 40"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M20 3.33331C10.8 3.33331 3.33337 10.8 3.33337 20C3.33337 29.2 10.8 36.6666 20 36.6666C29.2 36.6666 36.6667 29.2 36.6667 20C36.6667 10.8 29.2 3.33331 20 3.33331ZM16.6667 28.3333L8.33337 20L10.6834 17.65L16.6667 23.6166L29.3167 10.9666L31.6667 13.3333L16.6667 28.3333Z" />
          </svg>
        );
      case "error":
        return (
          <svg
            className="w-6 h-6 text-white fill-current"
            viewBox="0 0 40 40"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M20 3.36667C10.8167 3.36667 3.3667 10.8167 3.3667 20C3.3667 29.1833 10.8167 36.6333 20 36.6333C29.1834 36.6333 36.6334 29.1833 36.6334 20C36.6334 10.8167 29.1834 3.36667 20 3.36667ZM19.1334 33.3333V22.9H13.3334L21.6667 6.66667V17.1H27.25L19.1334 33.3333Z" />
          </svg>
        );
      case "warning":
        return (
          <svg
            className="w-6 h-6 text-white fill-current"
            viewBox="0 0 40 40"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M20 3.33331C10.8 3.33331 3.33337 10.8 3.33337 20C3.33337 29.2 10.8 36.6666 20 36.6666C29.2 36.6666 36.6667 29.2 36.6667 20C36.6667 10.8 29.2 3.33331 20 3.33331ZM21.6667 28.3333H18.3334V25H21.6667V28.3333ZM21.6667 21.6666H18.3334V11.6666H21.6667V21.6666Z" />
          </svg>
        );
      case "info":
        return (
          <svg
            className="w-6 h-6 text-white fill-current"
            viewBox="0 0 40 40"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M20 3.33331C10.8 3.33331 3.33337 10.8 3.33337 20C3.33337 29.2 10.8 36.6666 20 36.6666C29.2 36.6666 36.6667 29.2 36.6667 20C36.6667 10.8 29.2 3.33331 20 3.33331ZM21.6667 28.3333H18.3334V25H21.6667V28.3333ZM21.6667 21.6666H18.3334V11.6666H21.6667V21.6666Z" />
          </svg>
        );
    }
  };

  return (
    <div
      className={`fixed flex items-center z-[100] top-4 right-4 rounded-md p-4 text-white } ${
        visible ? "opacity-100" : "opacity-0"
      } transition-opacity duration-500`}
    >
      <div className="flex w-full max-w-sm overflow-hidden bg-white rounded-lg shadow-md dark:bg-gray-800">
        <div
          className={`flex items-center justify-center w-14 ${getBackgroundColor()}`}
        >
          {getIcon()}
        </div>

        <div className="px-4 py-2">
          <div className="">
            <span className={`font-semibold  ${getTextColor()}`}>
              {getTitle()}
            </span>
            <div className="text-sm text-gray-600 dark:text-gray-200">
              {message}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Toast;
