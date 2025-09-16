"use client";

import Welcome from "@/app/_components/organisms/Welcome";
import CustomReactFlow from "@/app/_components/organisms/CustomReactFlow";

import { useFlowsData } from "@/app/context/FlowsDataContext";
import { useEffect } from "react";

export default function HomeContent() {
  const { selectedFlowId, flows, setSelectedFlowId } = useFlowsData();

  useEffect(() => {
    if (flows.length <= 0) {
      setSelectedFlowId("");
    }
  }, [flows, setSelectedFlowId]);

  return (
    <main className="flex-1">
      {selectedFlowId ? <CustomReactFlow /> : <Welcome />}
    </main>
  );
}
