"use client";

import React, {
  createContext,
  useContext,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from "react";

import { useEdgesState, Edge, OnEdgesChange } from "@xyflow/react";
import { edgesService, IEdge } from "../services/edges";

interface EdgeContextType {
  edges: Edge[];
  edgesToFetch: string[];
  setEdges: Dispatch<SetStateAction<Edge[]>>;
  onEdgesChange: OnEdgesChange;
  setEdgesToFetch: (value: string[]) => void;
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
  const [edgesToFetch, setEdgesToFetch] = useState<string[]>([]);

  useEffect(() => {
    if (!edgesToFetch || edgesToFetch.length === 0) return;

    async function fetchEdges() {
      const allResults = await Promise.all(
        edgesToFetch.map(async (edge: string) => {
          return edgesService.getDataById(edge);
        })
      );

      const newNodes = allResults.flatMap((data: IEdge) => {
        const { flowId, ...rest } = data;
        return rest as Edge;
      });

      setEdges((prev) => [...prev, ...newNodes]);
      setEdgesToFetch([]);
    }

    fetchEdges();
  }, [edgesToFetch, setEdges]);

  return (
    <EdgeContext.Provider
      value={{
        edges,
        edgesToFetch,
        setEdges,
        onEdgesChange,
        setEdgesToFetch,
      }}
    >
      {children}
    </EdgeContext.Provider>
  );
}
