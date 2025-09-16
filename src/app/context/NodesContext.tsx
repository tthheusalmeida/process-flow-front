"use client";

import React, {
  createContext,
  useContext,
  Dispatch,
  SetStateAction,
  useState,
  useEffect,
} from "react";

import { useNodesState, Node, OnNodesChange } from "@xyflow/react";
import { getServiceByType } from "../services";
import { NODE_TYPES, NODES_TO_NODE_TYPES } from "@/lib/consts";

interface NodesToFetch {
  departments: string[];
  documents: string[];
  owners: string[];
  processes: string[];
  tools: string[];
}

interface NodeContextType {
  nodes: Node[];
  nodesToFetch: NodesToFetch;
  setNodes: Dispatch<SetStateAction<Node[]>>;
  onNodesChange: OnNodesChange;
  updatePartialNodeData: (id: string, newData: Partial<Node["data"]>) => void;
  setNodesToFetch: Dispatch<SetStateAction<NodesToFetch>>;
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
const initialNodesToFetch: NodesToFetch = {
  departments: [],
  documents: [],
  owners: [],
  processes: [],
  tools: [],
};

export function NodesProvider({ children }: NodesProviderProps) {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [nodesToFetch, setNodesToFetch] =
    useState<NodesToFetch>(initialNodesToFetch);

  function updatePartialNodeData(id: string, newData: Partial<Node["data"]>) {
    setNodes((prev) =>
      prev.map((node) =>
        node.id === id ? { ...node, data: { ...node.data, ...newData } } : node
      )
    );
  }

  useEffect(() => {
    async function fetchNodes() {
      const entries = Object.entries(nodesToFetch) as [
        keyof NodesToFetch,
        string[]
      ][];

      const allResults = await Promise.all(
        entries.map(async ([key, ids]) => {
          if (!ids.length) {
            return [key, []] as const;
          }

          const nodeType = NODES_TO_NODE_TYPES[key.toUpperCase()];
          const type = NODE_TYPES[nodeType];

          const service = getServiceByType(type);
          const data = await Promise.all(
            ids.map((id) => service.getDataById(id))
          );
          return [key, data] as const;
        })
      );

      const newNodes = allResults.flatMap(([_, data]) => data as Node[]);
      setNodes((prev) => [...prev, ...newNodes]);

      setNodesToFetch(initialNodesToFetch);
    }

    if (Object.values(nodesToFetch).some((arr) => arr.length > 0)) {
      fetchNodes();
    }
  }, [nodesToFetch, setNodes]);

  return (
    <NodeContext.Provider
      value={{
        nodes,
        nodesToFetch,
        setNodes,
        onNodesChange,
        updatePartialNodeData,
        setNodesToFetch,
      }}
    >
      {children}
    </NodeContext.Provider>
  );
}
