import { NodeProps } from "@xyflow/react";

import BaseNode from "../organisms/BaseNode";

export default function NodeDepartment({ data, id }: NodeProps) {
  return <BaseNode data={data} id={id} colorClass="bg-green-300" />;
}
