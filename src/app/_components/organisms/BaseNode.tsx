import "@xyflow/react/dist/style.css";

import { Handle, Position } from "@xyflow/react";
import { Edit2, Save, X } from "lucide-react";

import React, { useState } from "react";

const TYPE_HANDLE_COLORS: Record<string, string> = {
  department: "#16a34a", // green-600
  document: "#ca8a04", // yellow-600
  owner: "#2563eb", // blue-600
  process: "#7c3aed", // violet-600
  tool: "#52525b", // zinc-600
};

export default function BaseNode({
  data,
  id,
  colorClass,
  children,
}: {
  data: {
    title?: string;
    label?: string;
    type?: string;
    [key: string]: unknown;
  };
  id: string;
  colorClass: string;
  children?: React.ReactNode;
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(data.title || data.label || "");

  const handleSave = () => {
    setIsEditing(false);
    // TODO: save node data to database
    console.log(`Saving node ${id} with title: ${title}`);
  };

  const handleCancel = () => {
    setTitle(data.title || data.label || "");
    setIsEditing(false);
  };

  const handleColor = TYPE_HANDLE_COLORS[data.type!] || "#52525b";
  const nodeType = data.type;

  return (
    <div
      className={`w-[120px] h-[80px] ${colorClass} rounded flex flex-col items-center justify-center p-2 relative group`}
    >
      {(nodeType === "department" || nodeType === "owner") && (
        <Handle
          type="source"
          position={Position.Bottom}
          className="w-2 h-2 !border-none !-bottom-2"
          style={{ backgroundColor: handleColor }}
        />
      )}

      {(nodeType === "document" || nodeType === "tool") && (
        <Handle
          type="source"
          position={Position.Top}
          className="w-2 h-2 !border-none !-top-2"
          style={{ backgroundColor: handleColor }}
        />
      )}

      {isEditing ? (
        <div className="flex flex-col items-center gap-1">
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-1 py-0.5 text-xs border rounded bg-white text-black"
            autoFocus
          />
          <div className="flex gap-1">
            <button
              onClick={handleSave}
              className="p-0.5 bg-green-500 text-white rounded hover:bg-green-600"
            >
              <Save size={10} />
            </button>
            <button
              onClick={handleCancel}
              className="p-0.5 bg-red-500 text-white rounded hover:bg-red-600"
            >
              <X size={10} />
            </button>
          </div>
        </div>
      ) : (
        <>
          <div className="text-xs font-semibold text-center truncate w-full text-black">
            {title}
          </div>
          <button
            onClick={() => setIsEditing(true)}
            className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity p-0.5 bg-black/20 rounded hover:bg-black/40"
          >
            <Edit2 size={10} />
          </button>
          {children}
        </>
      )}
    </div>
  );
}
