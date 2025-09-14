"use client";

import React, { createContext, useContext, useState } from "react";

interface ConfirmationConfig {
  title: string;
  description: string;
  confirmText?: string;
  cancelText?: string;
  variant?: "default" | "destructive";
  onConfirm: () => void;
  onCancel?: () => void;
}

interface ConfirmationModalContextType {
  isOpen: boolean;
  config: ConfirmationConfig | null;
  openConfirmation: (config: ConfirmationConfig) => void;
  closeConfirmation: () => void;
  handleConfirm: () => void;
  handleCancel: () => void;
}

const ConfirmationModalContext = createContext<
  ConfirmationModalContextType | undefined
>(undefined);

export function useConfirmationModal() {
  const context = useContext(ConfirmationModalContext);
  if (!context) {
    throw new Error(
      "useConfirmationModal must be used within a ConfirmationModalProvider"
    );
  }
  return context;
}

interface ConfirmationModalProviderProps {
  children: React.ReactNode;
}

export function ConfirmationModalProvider({
  children,
}: ConfirmationModalProviderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [config, setConfig] = useState<ConfirmationConfig | null>(null);

  const openConfirmation = (confirmationConfig: ConfirmationConfig) => {
    setConfig(confirmationConfig);
    setIsOpen(true);
  };

  const closeConfirmation = () => {
    setIsOpen(false);

    setTimeout(() => {
      setConfig(null);
    }, 300);
  };

  const handleConfirm = () => {
    if (config?.onConfirm) {
      config.onConfirm();
    }
    closeConfirmation();
  };

  const handleCancel = () => {
    if (config?.onCancel) {
      config.onCancel();
    }
    closeConfirmation();
  };

  return (
    <ConfirmationModalContext.Provider
      value={{
        isOpen,
        config,
        openConfirmation,
        closeConfirmation,
        handleConfirm,
        handleCancel,
      }}
    >
      {children}
    </ConfirmationModalContext.Provider>
  );
}
