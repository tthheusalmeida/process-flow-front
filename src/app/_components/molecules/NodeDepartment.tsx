import { NodeProps } from "@xyflow/react";
import { Building2 } from "lucide-react";
import BaseNode from "../organisms/BaseNode";

export default function NodeDepartment({ data, id }: NodeProps) {
  return (
    <BaseNode
      data={data}
      id={id}
      colorClass="bg-green-200"
      icon={Building2}
      iconClasses="text-green-200 bg-green-800"
      minWidth={200}
      minHeight={0}
    />
  );
}
