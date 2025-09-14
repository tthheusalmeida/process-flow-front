"use client";

import React, { createContext, useContext, useState } from "react";

interface IFlowData {
  id?: string;
  title: string;
}

type ModalType = "create" | "edit";

interface FlowModalContextType {
  isOpen: boolean;
  modalType: ModalType | null;
  flowData: IFlowData | null;
  openModal: (type: ModalType, flowData?: IFlowData) => void;
  closeModal: () => void;
  handleSubmit: (data: IFlowData) => void;
  onOpenChange: (open: boolean) => void;
}

const FlowModalContext = createContext<FlowModalContextType | undefined>(
  undefined
);

export function useFlowModal() {
  const context = useContext(FlowModalContext);
  if (!context) {
    throw new Error("useFlowModal must be used within a FlowModalProvider");
  }
  return context;
}

interface FlowModalProviderProps {
  children: React.ReactNode;
}

export function FlowModalProvider({ children }: FlowModalProviderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [modalType, setModalType] = useState<ModalType | null>(null);
  const [flowData, setFlowData] = useState<IFlowData | null>(null);

  const openModal = (type: ModalType, data?: IFlowData) => {
    setModalType(type);
    setFlowData(data || null);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);

    setTimeout(() => {
      setModalType(null);
      setFlowData(null);
    }, 300);
  };

  const onOpenChange = (open: boolean) => {
    if (!open) {
      closeModal();
    }
  };

  const handleSubmit = (data: IFlowData) => {
    if (modalType === "create") {
      console.log("Creating flow:", data);
      // TODO: implements flow creation
    } else if (modalType === "edit") {
      console.log("Editing flow:", data);
      // TODO: implements flow editing
    }
    closeModal();
  };

  return (
    <FlowModalContext.Provider
      value={{
        isOpen,
        modalType,
        flowData,
        openModal,
        closeModal,
        handleSubmit,
        onOpenChange,
      }}
    >
      {children}
    </FlowModalContext.Provider>
  );
}
