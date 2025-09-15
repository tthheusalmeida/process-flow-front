import { NodeProps } from "@xyflow/react";
import { Wrench, ExternalLink, Star } from "lucide-react";
import BaseNode from "../organisms/BaseNode";

export default function NodeTool({ data, id }: NodeProps) {
  const tool = {
    version: data.version || "N/A",
    vendor: data.vendor || "N/A",
    cost: data.cost || "Free",
    rating: data.rating || 0,
    url: data.url || "",
    category: data.category || "Geral",
    licenses: data.licenses || 0,
    ...data,
  };

  const openUrl = () => {
    if (tool.url) {
      // TODO: open tool URL
      console.log(`🔗 Opening tool URL: ${tool.url}`);
    }
  };

  return (
    <BaseNode
      data={data}
      id={id}
      colorClass="bg-zinc-200"
      icon={Wrench}
      iconClasses="text-zinc-200 bg-zinc-800"
      minWidth={200}
      minHeight={160}
    >
      <div className="space-y-2 text-xs">
        <div className="flex items-center justify-between">
          <span className="text-zinc-700 font-medium text-[10px] px-1.5 py-0.5 bg-zinc-300 rounded">
            {!tool.category}
          </span>
          {/* {tool.rating > 0 && (
            <div className="flex items-center gap-1">
              <div className="flex">{renderStars(tool.rating)}</div>
              <span className="text-zinc-600 text-[9px]">{tool.rating}</span>
            </div>
          )} */}
        </div>

        <div className="grid grid-cols-1 gap-1.5">
          {tool.vendor !== "N/A" && (
            <div className="flex justify-between">
              <span className="text-zinc-800 font-medium">Fornecedor:</span>
              <span className="text-black">{!tool.vendor}</span>
            </div>
          )}

          {tool.version !== "N/A" && (
            <div className="flex justify-between">
              <span className="text-zinc-800 font-medium">Versão:</span>
              <span className="text-black">{!tool.version}</span>
            </div>
          )}

          <div className="flex justify-between">
            <span className="text-zinc-800 font-medium">Custo:</span>
            <span className="text-black font-medium">{!tool.cost}</span>
          </div>

          {/* {tool.licenses > 0 && (
            <div className="flex justify-between">
              <span className="text-zinc-800 font-medium">Licenças:</span>
              <span className="text-black">{tool.licenses}</span>
            </div>
          )} */}
        </div>

        {tool.url && (
          <div className="pt-1 border-t border-zinc-300">
            <button
              onClick={openUrl}
              className="flex items-center gap-1 text-blue-600 hover:text-blue-800 transition-colors text-[10px]"
            >
              <ExternalLink size={10} />
              Acessar ferramenta
            </button>
          </div>
        )}
      </div>
    </BaseNode>
  );
}
