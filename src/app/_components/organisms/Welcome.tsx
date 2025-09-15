"use client";

import { Button } from "@/app/_components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/app/_components/ui/card";

import { Plus } from "lucide-react";

import { useFlowsData } from "@/app/context/FlowsDataContext";
import { useFlowModal } from "@/app/context/FlowModalContext";
import Loading from "../atoms/Loading";

export default function Welcome() {
  const { flows, isLoading } = useFlowsData();
  const { openModal } = useFlowModal();

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted">
      <Card className="max-w-md w-full shadow-lg">
        <CardHeader>
          <CardTitle className="text-3xl font-light text-center">
            Welcome to <b className="text-primary font-bold">Process Flow</b>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex justify-center">
              <Loading className="mr-2" /> Getting things ready...
            </div>
          ) : flows.length > 0 ? (
            <div className="space-y-4 text-center">
              <p className="text-regular">Select a flow to get started.</p>
            </div>
          ) : (
            <div className="space-y-4 text-center">
              <p className="text-regular">
                There is no flow yet. To create your first flow, click on the{" "}
                <Plus className="inline-block" size={16} /> button in the{" "}
                <b>Flows</b> menu, or below.
              </p>

              <Button
                variant="default"
                className="w-full flex items-center justify-center gap-2"
                onClick={() => {
                  openModal("create");
                }}
              >
                <Plus size={18} />
                Add new Flow
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
