import { NodeProps } from "@xyflow/react";
import { Wrench } from "lucide-react";
import BaseNode from "../organisms/BaseNode";

interface INodeTool {
  title: string;
  description: string;
}

export default function NodeTool({ data, id }: NodeProps) {
  const tools = (data.tools as INodeTool[]) ?? [];

  return (
    <BaseNode
      data={data}
      id={id}
      colorClass="bg-zinc-200"
      icon={Wrench}
      iconClasses="text-zinc-200 bg-zinc-800"
      minWidth={200}
      minHeight={160 + tools.length * 24}
    >
      <div className="space-y-2 text-xs">
        {tools.length > 0 ? (
          tools.map((t, i) => (
            <div key={i} className="p-1 border rounded bg-zinc-100">
              <div className="font-medium text-zinc-800 text-[11px]">
                {t.title}
              </div>
              <div className="text-zinc-700 text-[10px]">{t.description}</div>
            </div>
          ))
        ) : (
          <div className="text-zinc-600 text-[10px] italic text-center py-2">
            No tools registered
          </div>
        )}
      </div>
    </BaseNode>
  );
}
