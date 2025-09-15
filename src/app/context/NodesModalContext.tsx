"use client";

import { useState, createContext, useContext } from "react";

interface NodeContextType {
  isOpenDepartment: boolean;
  isOpenDocument: boolean;
  isOpenOwner: boolean;
  isOpenProcess: boolean;
  isOpenTool: boolean;
  nodeModalId: string;
  setIsOpenDepartment: (value: boolean) => void;
  setIsOpenDocument: (value: boolean) => void;
  setIsOpenOwner: (value: boolean) => void;
  setIsOpenProcess: (value: boolean) => void;
  setIsOpenTool: (value: boolean) => void;
  setNodeModalId: (value: string) => void;
}

const NodeModalContext = createContext<NodeContextType | undefined>(undefined);

export function useNodeModal() {
  const context = useContext(NodeModalContext);
  if (!context) {
    throw new Error("useNodeModal must be used within a NodeModalProvider");
  }
  return context;
}

interface NodeModalProviderProps {
  children: React.ReactNode;
}

export function NodeModalProvider({ children }: NodeModalProviderProps) {
  const [isOpenDepartment, setIsOpenDepartment] = useState(false);
  const [isOpenDocument, setIsOpenDocument] = useState(false);
  const [isOpenOwner, setIsOpenOwner] = useState(false);
  const [isOpenProcess, setIsOpenProcess] = useState(false);
  const [isOpenTool, setIsOpenTool] = useState(false);
  const [nodeModalId, setNodeModalId] = useState("");

  return (
    <NodeModalContext.Provider
      value={{
        isOpenDepartment,
        isOpenDocument,
        isOpenOwner,
        isOpenProcess,
        isOpenTool,
        nodeModalId,
        setIsOpenDepartment,
        setIsOpenDocument,
        setIsOpenOwner,
        setIsOpenProcess,
        setIsOpenTool,
        setNodeModalId,
      }}
    >
      {children}
    </NodeModalContext.Provider>
  );
}
