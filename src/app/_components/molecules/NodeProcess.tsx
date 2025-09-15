import { NodeProps, Handle, Position } from "@xyflow/react";

import BaseNode from "../organisms/BaseNode";

export default function NodeProcess({ data, id }: NodeProps) {
  const handleColor = "#7c3aed"; // violet-600

  return (
    <BaseNode data={data} id={id} colorClass="bg-violet-300">
      {/* Handle TOP - recive connections from Department and Owner */}
      <Handle
        id="top"
        type="target"
        position={Position.Top}
        className="w-2 h-2 !border-none !-top-2"
        style={{ backgroundColor: handleColor }}
      />

      {/* Handle Bottom - recive connections from Document and Tool */}
      <Handle
        id="bottom"
        type="target"
        position={Position.Bottom}
        className="w-2 h-2 !border-none !-bottom-2"
        style={{ backgroundColor: handleColor }}
      />

      {/* Handle Left - recive connections from others Processes */}
      <Handle
        id="left"
        type="target"
        position={Position.Left}
        className="w-2 h-2 !border-none !-left-2"
        style={{ backgroundColor: handleColor }}
      />

      {/* Handle Right - conect WITH other Processes */}
      <Handle
        id="right"
        type="source"
        position={Position.Right}
        className="w-2 h-2 !border-none !-right-2"
        style={{ backgroundColor: handleColor }}
      />
    </BaseNode>
  );
}
