"use client";
import ModalParent from "@/ui/modals/modal";
import React, { createContext, ReactNode, useState } from "react";

interface ModalContextType {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  modalContent: ReactNode | null;
  openModal: (content: ReactNode) => void;
  closeModal: () => void;
}

export const ModalContext = createContext<ModalContextType | null>(null);

export const ModalProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [modalContent, setModalContent] = useState<ReactNode | null>(null);

  const openModal = (content: ReactNode) => {
    setModalContent(content);
    setIsOpen(true);
  };

  const closeModal = () => {
    setModalContent(null);
    setIsOpen(false);
  };

  return (
    <ModalContext.Provider
      value={{ setIsOpen, modalContent, openModal, closeModal }}
    >
      {children}
      {isOpen && <ModalParent onClose={closeModal}>{modalContent}</ModalParent>}
    </ModalContext.Provider>
  );
};
