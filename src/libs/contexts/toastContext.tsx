"use client";
import Toast from "@/ui/components/toast/toast";
import { createContext, useState } from "react";
import { ToastType } from "../interfaces/toast.interface";

interface ToastContextValue {
  handleShowToast: (
    message: string,
    type: ToastType,
    duration?: number
  ) => void;
}

export const ToastContext = createContext<ToastContextValue | null>(null);

export const ToastProvider = ({ children }: { children: React.ReactNode }) => {
  const [messageToast, setMessageToast] = useState("");
  const [typeToast, setTypeToast] = useState(ToastType.ERROR);
  const [durationToast, setDurationToast] = useState(1000000);

  const handleShowToast = (
    message: string,
    type: ToastType,
    duration = 400000
  ) => {
    setMessageToast(message);
    setTypeToast(type);
    setDurationToast(duration);
  };

  const handleCloseToast = () => {
    setMessageToast("");
    setTypeToast(ToastType.INFO);
  };

  return (
    <ToastContext.Provider value={{ handleShowToast }}>
      {messageToast && (
        <Toast
          message={messageToast}
          type={typeToast}
          duration={durationToast}
          onClose={handleCloseToast}
        />
      )}
      {children}
    </ToastContext.Provider>
  );
};
