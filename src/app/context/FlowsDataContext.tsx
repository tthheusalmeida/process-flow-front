"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { useTotalFlows } from "../_hooks/use-flows";
import { IFlow } from "@/app/services/flows";
import { useNode } from "./NodesContext";
import { useEdge } from "./EdgesContext";

interface FlowsDataContextType {
  flows: IFlow[];
  isLoading: boolean;
  selectedFlowId: string;
  add: (data: IFlow) => void;
  update: (id: string, data: Partial<IFlow>) => void;
  remove: (id: string) => void;
  setSelectedFlowId: (id: string) => void;
}

const FlowsDataContext = createContext<FlowsDataContextType | undefined>(
  undefined
);

export function useFlowsData() {
  const context = useContext(FlowsDataContext);
  if (!context) {
    throw new Error("useFlowsData must be used within a FlowsDataProvider");
  }
  return context;
}

interface FlowsDataProviderProps {
  children: React.ReactNode;
}

export function FlowsDataProvider({ children }: FlowsDataProviderProps) {
  const { data: flowsData, isLoading: isLoadingFlows } = useTotalFlows();
  const { setNodesToFetch, setNodes } = useNode();
  const {} = useEdge();

  const [flows, setFlows] = useState<IFlow[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedFlowId, setSelectedFlowId] = useState<string>("");

  const add = (data: IFlow) => {
    setFlows((prevFlows) => [...prevFlows, data]);
  };

  const update = async (id: string, data: Partial<IFlow>) => {
    setFlows((prevFlows) =>
      prevFlows.map((flow) => (flow.id === id ? { ...flow, ...data } : flow))
    );
  };

  const remove = async (id: string) => {
    setFlows((prevFlows) => prevFlows.filter((flow) => flow.id !== id));
  };

  useEffect(() => {
    if (!isLoadingFlows && flowsData) {
      setFlows(flowsData);
      setIsLoading(false);
    }
  }, [flowsData, isLoadingFlows]);

  useEffect(() => {
    if (selectedFlowId) {
      setNodes([]);
    }

    if (selectedFlowId && flowsData) {
      const flow = flowsData.filter((f) => f.id === selectedFlowId)[0];

      const dataToFetch = {
        departments: flow?.departments || [],
        documents: flow?.documents || [],
        owners: flow?.owners || [],
        processes: flow?.processes || [],
        tools: flow?.tools || [],
      };

      setNodesToFetch(() => dataToFetch);
    }
  }, [selectedFlowId, flowsData, setNodesToFetch, setNodes]);

  return (
    <FlowsDataContext.Provider
      value={{
        flows,
        isLoading,
        selectedFlowId,
        add,
        update,
        remove,
        setSelectedFlowId,
      }}
    >
      {children}
    </FlowsDataContext.Provider>
  );
}
