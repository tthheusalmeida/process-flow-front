"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { useTotalFlows } from "../_hooks/use-flows";
import { IFlow } from "@/app/services/flows";

interface FlowsDataContextType {
  flows: IFlow[];
  isLoading: boolean;
  add: (data: IFlow) => void;
  update: (id: string, data: Partial<IFlow>) => Promise<void>;
  remove: (id: string) => Promise<void>;
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

  const [flows, setFlows] = useState<IFlow[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const add = (data: IFlow) => {
    setFlows((prevFlows) => [...prevFlows, data]);
  };

  const update = async (id: string, data: Partial<IFlow>) => {
    // TODO: Implementar update
  };

  const remove = async (id: string) => {
    // TODO: Implementar remove
  };

  useEffect(() => {
    if (!isLoadingFlows && flowsData) {
      setFlows(flowsData);
      setIsLoading(false);
    }
  }, [flowsData, isLoadingFlows]);

  return (
    <FlowsDataContext.Provider
      value={{
        flows,
        isLoading,
        add,
        update,
        remove,
      }}
    >
      {children}
    </FlowsDataContext.Provider>
  );
}
