import React from "react";
import { Edit2, Trash2, LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface BaseNodeHeaderProps {
  title: string;
  icon: LucideIcon;
  iconClasses: string;
  onEdit: () => void;
  onDelete: () => void;
}

export default function BaseNodeHeader({
  title,
  icon: Icon,
  iconClasses,
  onEdit,
  onDelete,
}: BaseNodeHeaderProps) {
  return (
    <div className="flex items-center justify-between p-2 ">
      <div className="flex items-center gap-2">
        <div className={cn("rounded p-1", iconClasses)}>
          <Icon size={16} />
        </div>

        <span className="font-bold text-base truncate text-black">{title}</span>
      </div>

      <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <button
          onClick={onEdit}
          className="p-1 rounded hover:bg-black/10 transition-colors"
          title="Edit"
        >
          <Edit2 size={14} className="text-zinc-600" />
        </button>
        <button
          onClick={onDelete}
          className="p-1 rounded hover:bg-red-100 transition-colors"
          title="Delete"
        >
          <Trash2 size={14} className="text-red-600" />
        </button>
      </div>
    </div>
  );
}
