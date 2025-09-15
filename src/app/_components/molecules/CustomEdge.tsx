import { EdgeProps, getSimpleBezierPath } from "@xyflow/react";
import { X } from "lucide-react";
import { useState } from "react";

export function CustomEdge({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
}: EdgeProps) {
  const [hovered, setHovered] = useState(false);
  const [edgePath] = getSimpleBezierPath({
    sourceX,
    sourceY,
    targetX,
    targetY,
  });

  const onEdgeDelete = () => {
    // TODO: delete edge from database
    console.log(`Deleting edge ${id}`);
  };

  return (
    <g
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <path
        id={id}
        d={edgePath}
        className="react-flow__edge-path !stroke-2 stroke-zinc-400"
        style={{ pointerEvents: "stroke" }}
      />
      {hovered && (
        <foreignObject
          width={40}
          height={40}
          x={(sourceX + targetX) / 2 - 20}
          y={(sourceY + targetY) / 2 - 20}
          requiredExtensions="http://www.w3.org/1999/xhtml"
        >
          <button
            className="w-4 h-4 bg-neutral-700 hover:bg-red-600/10 text-red-400 rounded-full flex items-center justify-center text-xs transition-colors"
            onClick={onEdgeDelete}
          >
            <X size={10} />
          </button>
        </foreignObject>
      )}
    </g>
  );
}
