import "@xyflow/react/dist/style.css";
import { Handle, Position } from "@xyflow/react";
import React, { useState } from "react";
import { Columns, LucideIcon } from "lucide-react";
import BaseNodeHeader from "./BaseNodeHeader";
import { cn } from "@/lib/utils";
import { useConfirmationModal } from "@/app/context/ConfirmationModalContext";
import { useNode } from "@/app/context/NodesContext";
import { useEdge } from "@/app/context/EdgesContext";
import { useNodeModal } from "@/app/context/NodesModalContext";

// Mapeamento de cores para os handles
const TYPE_HANDLE_COLORS: Record<string, string> = {
  department: "#16a34a", // green-600
  document: "#ca8a04", // yellow-600
  owner: "#2563eb", // blue-600
  process: "#7c3aed", // violet-600
  tool: "#52525b", // zinc-600
};

interface BaseNodeProps {
  data: {
    title?: string;
    label?: string;
    type?: string;
    [key: string]: unknown;
  };
  id: string;
  colorClass: string;
  icon: LucideIcon;
  iconClasses: string;
  minWidth?: number;
  minHeight?: number;
  children?: React.ReactNode;
  customHandles?: React.ReactNode;
}

export default function BaseNode({
  data,
  id,
  colorClass,
  icon,
  iconClasses,
  minWidth = 200,
  minHeight = 120,
  children,
  customHandles,
}: BaseNodeProps) {
  const { setNodes } = useNode();
  const { setEdges } = useEdge();
  const { openConfirmation } = useConfirmationModal();
  const {
    setIsOpenDepartment,
    setIsOpenOwner,
    setIsOpenDocument,
    setIsOpenProcess,
    setIsOpenTool,
    setNodeModalId,
  } = useNodeModal();

  const MODAL_TYPE: Record<string, (value: boolean) => void> = {
    department: setIsOpenDepartment,
    owner: setIsOpenOwner,
    document: setIsOpenDocument,
    process: setIsOpenProcess,
    tool: setIsOpenTool,
  };

  const handleEdit = () => {
    MODAL_TYPE[data.type as string](true);
    setNodeModalId(id);
  };

  const handleDelete = () => {
    openConfirmation({
      title: "Delete node",
      description: `Are you sure you want to delete the ${data.type} "${data.title}"? This action cannot be undone.`,
      confirmText: "Delete",
      cancelText: "Cancel",
      variant: "destructive",
      onConfirm: async () => {
        setEdges((prev) =>
          prev.filter((edge) => edge.source !== id && edge.target !== id)
        );
        setNodes((prev) => prev.filter((node) => node.id !== id));
      },
    });
  };

  const handleColor = TYPE_HANDLE_COLORS[data.type!] || "#52525b";
  const nodeType = data.type;
  const title = data.title || data.label || "";

  return (
    <>
      <div
        className={cn(
          colorClass,
          "rounded-lg shadow-lg",
          minWidth ? `min-w-[${minWidth}px]` : "min-w-[200px]",
          minHeight ? `min-h-[${minHeight}px]` : "min-h-[120px]",
          "flex flex-col relative group"
        )}
        style={{ minWidth, minHeight }}
      >
        {/* Header */}
        <BaseNodeHeader
          title={title}
          icon={icon}
          iconClasses={iconClasses}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />

        {/* Content */}
        <div className="flex-1 p-3">{children}</div>

        {/* Custom Handles ou Handles Padrão */}
        {customHandles || (
          <>
            {/* Owner: apenas handle na parte de BAIXO */}
            {nodeType === "owner" && (
              <Handle
                type="source"
                position={Position.Bottom}
                className="w-3 h-3 !border-none !-bottom-1.5 !rounded-full"
                style={{ backgroundColor: handleColor }}
              />
            )}

            {/* Department: apenas handle na parte da direita */}
            {nodeType === "department" && (
              <Handle
                type="source"
                position={Position.Right}
                className="w-3 h-3 !border-none !-bottom-1.5 !rounded-full"
                style={{ backgroundColor: handleColor }}
              />
            )}

            {/* Document e Tool: apenas handle na parte de CIMA */}
            {(nodeType === "document" || nodeType === "tool") && (
              <Handle
                type="source"
                position={Position.Top}
                className="w-3 h-3 !border-none !-top-1.5 !rounded-full"
                style={{ backgroundColor: handleColor }}
              />
            )}
          </>
        )}

        <div
          className={cn(
            "w-5/12 h-12 absolute flex items-start justify-center",
            "bg-neutral-900 text-neutral-200 font-semibold",
            "text-xs rounded-lg capitalize",
            "group-hover:-top-6 top-0 -z-10",
            "transition-all duration-300"
          )}
        >
          <span className="mt-1">{nodeType}</span>
        </div>
      </div>
    </>
  );
}
