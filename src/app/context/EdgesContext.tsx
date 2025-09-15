"use client";

import React, {
  createContext,
  useContext,
  Dispatch,
  SetStateAction,
} from "react";

import { useEdgesState, Edge, OnEdgesChange } from "@xyflow/react";

interface EdgeContextType {
  edges: Edge[];
  setEdges: Dispatch<SetStateAction<Edge[]>>;
  onEdgesChange: OnEdgesChange;
}

const EdgeContext = createContext<EdgeContextType | undefined>(undefined);

export function useEdge() {
  const context = useContext(EdgeContext);
  if (!context) {
    throw new Error("useEdge must be used within a EdgeProvider");
  }
  return context;
}

interface EdgeProviderProps {
  children: React.ReactNode;
}

const initialEdges: Edge[] = [
  {
    type: "default",
    source: "department-1",
    target: "process-1",
    targetHandle: "left",
    id: "process-1-department-1",
    selected: false,
  },
  {
    type: "default",
    source: "document-1",
    target: "process-1",
    targetHandle: "bottom",
    id: "process-1-document-1",
    selected: false,
  },
];

export function EdgesProvider({ children }: EdgeProviderProps) {
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  return (
    <EdgeContext.Provider
      value={{
        edges,
        setEdges,
        onEdgesChange,
      }}
    >
      {children}
    </EdgeContext.Provider>
  );
}
