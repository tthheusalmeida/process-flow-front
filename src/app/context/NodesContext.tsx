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

const initialNodes: Node[] = [
  {
    id: "department-1",
    type: "department",
    position: { x: 200, y: 0 },
    data: { title: "RH", type: "department" },
  },
  {
    id: "owner-1",
    type: "owner",
    position: { x: 350, y: 0 },
    data: {
      title: "CEO",
      type: "owner",
      owners: ["Ana Silva", "João Santos"],
    },
  },
  {
    id: "process-1",
    type: "process",
    position: { x: 200, y: 120 },
    data: {
      title: "Recrutamento",
      type: "process",
      description: "Ah pao de queijo",
    },
  },
  {
    id: "process-2",
    type: "process",
    position: { x: 400, y: 120 },
    data: {
      title: "Aprovação",
      type: "process",
      description: "hoje eu so quero quebrar esse codigo",
    },
  },
  {
    id: "document-1",
    type: "document",
    position: { x: 150, y: 240 },
    data: {
      title: "Manual",
      type: "document",
      links: [
        {
          label: "Google",
          link: "www.google.com.br",
        },
      ],
    },
  },
  {
    id: "tool-1",
    type: "tool",
    position: { x: 300, y: 240 },
    data: {
      title: "MAVEN",
      type: "tool",
      tools: [{ title: "Slack", description: "Gestão de candidatos" }],
    },
  },
];

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
