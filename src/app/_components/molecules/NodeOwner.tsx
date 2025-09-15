import { NodeProps } from "@xyflow/react";
import { Users } from "lucide-react";
import BaseNode from "../organisms/BaseNode";

export default function NodeOwner({ data, id }: NodeProps) {
  const people = (data.owners as string[]) ?? [];

  return (
    <BaseNode
      data={data}
      id={id}
      colorClass="bg-blue-200"
      icon={Users}
      iconClasses="text-blue-200 bg-blue-800"
      minWidth={220}
      minHeight={140 + people.length * 10}
    >
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-xs font-medium text-blue-800">
            Responsible ({people.length})
          </span>
        </div>

        <div className="space-y-1 max-h-32 overflow-y-auto">
          {people.map((person, index) => (
            <div
              key={index}
              className="flex items-center justify-between bg-white/50 rounded p-1.5 text-xs"
            >
              <div className="font-medium text-blue-600">{person}</div>
            </div>
          ))}
        </div>

        {people.length === 0 && (
          <div className="text-xs text-blue-600 text-center py-2 italic">
            No registered responsible person
          </div>
        )}
      </div>
    </BaseNode>
  );
}
