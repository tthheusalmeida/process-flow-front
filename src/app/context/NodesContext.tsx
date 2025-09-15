"use client";

import React, {
  createContext,
  useContext,
  Dispatch,
  SetStateAction,
} from "react";

import { useNodesState, Node, OnNodesChange } from "@xyflow/react";

interface NodeContextType {
  nodes: Node[];
  setNodes: Dispatch<SetStateAction<Node[]>>;
  onNodesChange: OnNodesChange;
  updatePartialNodeData: (id: string, newData: Partial<Node["data"]>) => void;
}

const NodeContext = createContext<NodeContextType | undefined>(undefined);

export function useNode() {
  const context = useContext(NodeContext);
  if (!context) {
    throw new Error("useNode must be used within a NodesProvider");
  }
  return context;
}

interface NodesProviderProps {
  children: React.ReactNode;
}

const initialNodes: Node[] = [];

export function NodesProvider({ children }: NodesProviderProps) {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);

  function updatePartialNodeData(id: string, newData: Partial<Node["data"]>) {
    setNodes((prev) =>
      prev.map((node) =>
        node.id === id ? { ...node, data: { ...node.data, ...newData } } : node
      )
    );
  }

  return (
    <NodeContext.Provider
      value={{
        nodes,
        setNodes,
        onNodesChange,
        updatePartialNodeData,
      }}
    >
      {children}
    </NodeContext.Provider>
  );
}
