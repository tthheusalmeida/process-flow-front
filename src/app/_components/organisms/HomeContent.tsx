"use client";

import Welcome from "@/app/_components/organisms/Welcome";
import CustomReactFlow from "@/app/_components/organisms/CustomReactFlow";

import { useFlowsData } from "@/app/context/FlowsDataContext";

export default function HomeContent() {
  const { selectedFlowId } = useFlowsData();

  return (
    <main className="flex-1">
      {selectedFlowId ? <CustomReactFlow /> : <Welcome />}
    </main>
  );
}
