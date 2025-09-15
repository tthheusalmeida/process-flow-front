import { NodeProps, Handle, Position } from "@xyflow/react";
import { Workflow, Clock, CheckCircle } from "lucide-react";
import BaseNode from "../organisms/BaseNode";

export default function NodeProcess({ data, id }: NodeProps) {
  const handleColor = "#7c3aed"; // violet-600

  const process = {
    status: data.status || "active",
    duration: data.duration || "N/A",
    complexity: data.complexity || "medium",
    description: data.description || "",
    steps: data.steps || [],
    ...data,
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "text-green-600";
      case "inactive":
        return "text-red-600";
      case "draft":
        return "text-yellow-600";
      default:
        return "text-gray-600";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "active":
        return <CheckCircle size={10} className="text-green-600" />;
      case "inactive":
        return <div className="w-2 h-2 bg-red-600 rounded-full" />;
      case "draft":
        return <Clock size={10} className="text-yellow-600" />;
      default:
        return <div className="w-2 h-2 bg-gray-400 rounded-full" />;
    }
  };

  const customHandles = (
    <>
      {/* Handle TOPO - recebe conexões de Department e Owner */}
      <Handle
        id="top"
        type="target"
        position={Position.Top}
        className="w-3 h-3 !border-none !-top-1.5 !rounded-full"
        style={{ backgroundColor: handleColor }}
      />

      {/* Handle BAIXO - recebe conexões de Document e Tool */}
      <Handle
        id="bottom"
        type="target"
        position={Position.Bottom}
        className="w-3 h-3 !border-none !-bottom-1.5 !rounded-full"
        style={{ backgroundColor: handleColor }}
      />

      {/* Handle ESQUERDA - recebe conexões de outros Processos */}
      <Handle
        id="left"
        type="target"
        position={Position.Left}
        className="w-3 h-3 !border-none !-left-1.5 !rounded-full"
        style={{ backgroundColor: handleColor }}
      />

      {/* Handle DIREITA - conecta COM outros processos */}
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
      minHeight={process.description ? 180 : 140}
      customHandles={customHandles}
    >
      <div className="space-y-2 text-xs">
        <div className="grid grid-cols-2 gap-2">
          <div className="flex items-center gap-1">
            {getStatusIcon(process.status as string)}
            <span
              className={`capitalize ${getStatusColor(
                process.status as string
              )}`}
            >
              {process.status as string}
            </span>
          </div>

          <div className="text-right text-violet-700">
            <Clock size={10} className="inline mr-1" />
            {!process.duration}
          </div>
        </div>

        <div className="flex justify-between items-center">
          <span className="text-violet-800 font-medium">Complexidade:</span>
          <div className="flex gap-0.5">
            {[1, 2, 3].map((level) => (
              <div
                key={level}
                className={`w-2 h-2 rounded-full ${
                  level <=
                  (process.complexity === "low"
                    ? 1
                    : process.complexity === "medium"
                    ? 2
                    : 3)
                    ? "bg-violet-600"
                    : "bg-violet-200"
                }`}
              />
            ))}
          </div>
        </div>

        {/* {process.steps && process.steps.length > 0 && (
          <div>
            <div className="text-violet-800 font-medium mb-1">
              Etapas ({!process.steps.length}):
            </div>
            <div className="text-black text-[10px] space-y-0.5">
              {process.steps.slice(0, 3).map((step: string, index: number) => (
                <div key={index}>• {step}</div>
              ))}
              {process.steps.length > 3 && (
                <div className="text-violet-600">
                  +{process.steps.length - 3} mais...
                </div>
              )}
            </div>
          </div>
        )} */}

        {/* {process.description && (
          <div className="mt-2 pt-2 border-t border-violet-300">
            <div className="text-black text-[10px] leading-relaxed">
              {process.description.substring(0, 80)}
              {process.description.length > 80 && "..."}
            </div>
          </div>
        )} */}
      </div>
    </BaseNode>
  );
}
