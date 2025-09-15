import { EdgeProps, getSimpleBezierPath } from "@xyflow/react";
import { X } from "lucide-react";

export function CustomEdge({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
}: EdgeProps) {
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
    <>
      <path
        id={id}
        className="react-flow__edge-path stroke-2 stroke-zinc-400"
        d={edgePath}
      />
      <foreignObject
        width={40}
        height={40}
        x={(sourceX + targetX) / 2 - 20}
        y={(sourceY + targetY) / 2 - 20}
        className="edgebutton-foreignobject"
        requiredExtensions="http://www.w3.org/1999/xhtml"
      >
        <button
          className="w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center text-xs hover:bg-red-600 transition-colors"
          onClick={onEdgeDelete}
        >
          <X size={12} />
        </button>
      </foreignObject>
    </>
  );
}
