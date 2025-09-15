import { NodeProps, Handle, Position } from "@xyflow/react";
import { Workflow } from "lucide-react";
import BaseNode from "../organisms/BaseNode";

export default function NodeProcess({ data, id }: NodeProps) {
  const handleColor = "#7c3aed";
  const description = data.description as string;

  const customHandles = (
    <>
      <Handle
        id="top"
        type="target"
        position={Position.Top}
        className="w-3 h-3 !border-none !-top-1.5 !rounded-full"
        style={{ backgroundColor: handleColor }}
      />

      <Handle
        id="bottom"
        type="target"
        position={Position.Bottom}
        className="w-3 h-3 !border-none !-bottom-1.5 !rounded-full"
        style={{ backgroundColor: handleColor }}
      />

      <Handle
        id="left"
        type="target"
        position={Position.Left}
        className="w-3 h-3 !border-none !-left-1.5 !rounded-full"
        style={{ backgroundColor: handleColor }}
      />

      <Handle
        id="right"
        type="source"
        position={Position.Right}
        className="w-3 h-3 !border-none !-right-1.5 !rounded-full"
        style={{ backgroundColor: handleColor }}
      />
    </>
  );

  return (
    <BaseNode
      data={data}
      id={id}
      colorClass="bg-violet-200"
      icon={Workflow}
      iconClasses="text-violet-200 bg-violet-800"
      minWidth={220}
      minHeight={description ? 180 : 140}
      customHandles={customHandles}
    >
      <div className="space-y-2 text-xs">
        <span className="text-violet-700 break-words block max-w-[200px]">
          {description}
        </span>
      </div>
    </BaseNode>
  );
}
