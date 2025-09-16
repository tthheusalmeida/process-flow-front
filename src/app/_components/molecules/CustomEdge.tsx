import { useEdge } from "@/app/context/EdgesContext";
import { edgesService } from "@/app/services/edges";
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
  const { edges, setEdges } = useEdge();

  const [hovered, setHovered] = useState(false);
  const [edgePath] = getSimpleBezierPath({
    sourceX,
    sourceY,
    targetX,
    targetY,
  });

  const onEdgeDelete = async () => {
    await edgesService.deleteData(id);
    setEdges((prev) => prev.filter((edge) => edge.id !== id));
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
            className="w-6 h-6 bg-destructive/80 hover:bg-destructive text-white rounded-full flex items-center justify-center text-xs transition-colors"
            onClick={onEdgeDelete}
          >
            <X size={14} />
          </button>
        </foreignObject>
      )}
    </g>
  );
}
