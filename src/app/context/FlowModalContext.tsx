"use client";

import React, { createContext, useContext, useState } from "react";
import { createFlow } from "../services/flows";
import { useFlowsData } from "./FlowsDataContext";

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
  const { add } = useFlowsData();

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

  const handleSubmit = async (data: IFlowData) => {
    try {
      if (modalType === "create") {
        const newFlow = {
          id: crypto.randomUUID(),
          title: data.title,
          createdAt: new Date(),
          updatedAt: new Date(),
        };

        await createFlow(newFlow);
        add(newFlow);
      } else if (modalType === "edit" && data.id) {
        console.log("Editing flow:", data);
        // TODO: Integrar com useFlowsData
        // await updateFlow(data.id, { title: data.title });
      }
      closeModal();
    } catch (error) {
      console.error("Error submitting form:", error);
      // TODO: add toast when error occurs (toast, etc.)
    }
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
