"use client";

import { cn } from "@/lib/utils";
import { Building2, FileText, Workflow, Users, Wrench } from "lucide-react";
import { TooltipTrigger, Tooltip, TooltipContent } from "../ui/tooltip";
import { useNode } from "@/app/context/NodesContext";

import { NODE_TYPES } from "@/lib/consts";

interface BottomToolbarProps {
  className?: string;
}

export function BottomToolbar({ className }: BottomToolbarProps) {
  const { setNodes } = useNode();

  const handleCreateNewNode = (options: {
    type: string;
    data: Record<string, unknown>;
  }) => {
    const { type, data } = options;

    setNodes((nodes) => [
      ...nodes,
      {
        id: crypto.randomUUID(),
        position: { x: 0, y: 0 },
        type,
        data,
      },
    ]);
  };

  const ACTION_BUTTONS = [
    {
      icon: Building2,
      iconClasses: "text-green-200 bg-green-800 hover:bg-green-700",
      type: NODE_TYPES.DEPARTMENT,
      onClick: handleCreateNewNode,
      data: { title: "", type: NODE_TYPES.DEPARTMENT },
    },
    {
      icon: FileText,
      iconClasses: "text-yellow-200 bg-yellow-800 hover:bg-yellow-700",
      type: NODE_TYPES.DOCUMENT,
      onClick: handleCreateNewNode,
      data: {
        title: "",
        type: NODE_TYPES.DOCUMENT,
        links: [],
      },
    },
    {
      icon: Workflow,
      iconClasses: "text-violet-200 bg-violet-800 hover:bg-violet-700",
      type: NODE_TYPES.PROCESS,
      onClick: handleCreateNewNode,
      data: {
        title: "",
        type: NODE_TYPES.PROCESS,
        description: "",
      },
    },
    {
      icon: Users,
      iconClasses: "text-blue-200 bg-blue-800 hover:bg-blue-700",
      type: NODE_TYPES.OWNER,
      onClick: handleCreateNewNode,
      data: {
        title: "",
        type: NODE_TYPES.OWNER,
        owners: [],
      },
    },
    {
      icon: Wrench,
      iconClasses: "text-zinc-200 bg-zinc-800 hover:bg-zinc-700",
      type: NODE_TYPES.TOOL,
      onClick: handleCreateNewNode,
      data: {
        title: "",
        type: NODE_TYPES.TOOL,
        tools: [],
      },
    },
  ];

  return (
    <div
      className={cn(
        "absolute bottom-4 left-1/2 -translate-x-1/2",
        "bg-neutral-900 border border-neutral-700 shadow-lg rounded-xl",
        "px-4 py-2 flex items-center gap-2 z-50",
        "hover:scale-105 transition-transform duration-300",
        className
      )}
    >
      {ACTION_BUTTONS.map(
        ({ icon: Icon, type, iconClasses, onClick, data }, index) => (
          <Tooltip key={type}>
            <TooltipTrigger asChild className="dark">
              <div
                key={index}
                className={cn(
                  "p-2 rounded cursor-pointer hover:bg-gray-100 hover:-translate-y-2 transition-all duration-300",
                  iconClasses
                )}
                onClick={() => onClick({ type, data })}
              >
                <Icon size={20} />
              </div>
            </TooltipTrigger>

            <TooltipContent>
              <p className="capitalize">{type}</p>
            </TooltipContent>
          </Tooltip>
        )
      )}
    </div>
  );
}
