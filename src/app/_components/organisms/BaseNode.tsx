import "@xyflow/react/dist/style.css";
import { Handle, Position } from "@xyflow/react";
import React, { useState } from "react";
import { Columns, LucideIcon } from "lucide-react";
import BaseNodeHeader from "./BaseNodeHeader";
import { cn } from "@/lib/utils";
import { useConfirmationModal } from "@/app/context/ConfirmationModalContext";
import { useNode } from "@/app/context/NodesContext";
import { useEdge } from "@/app/context/EdgesContext";

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
  const [showEditModal, setShowEditModal] = useState(false);
  const { nodes, setNodes } = useNode();
  const { edges, setEdges } = useEdge();
  const { openConfirmation } = useConfirmationModal();

  const handleEdit = () => {
    // setShowEditModal(true);
    // TODO: open edit modal with specific form for node type
    console.log(`📝 Opening edit modal for ${data.type} ${id}`);
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

  console.log("EDGES: ", edges);

  const confirmDelete = () => {
    // setShowDeleteModal(false);
    // TODO: delete node from database and react flow
    console.log(`🗑️ Deleting ${data.type} ${id}`);
  };

  const cancelDelete = () => {
    // setShowDeleteModal(false);
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

      {/* TODO: Modal de Edição será implementado por tipo */}
      {showEditModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md mx-4">
            <h3 className="text-lg font-semibold mb-2 text-black">
              Editar {data.type}
            </h3>
            <p className="text-gray-600 mb-4">
              Modal de edição para {data.type} será implementado aqui
            </p>
            <button
              onClick={() => setShowEditModal(false)}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Fechar
            </button>
          </div>
        </div>
      )}
    </>
  );
}
