import { NodeProps } from "@xyflow/react";

import BaseNode from "../organisms/BaseNode";

export default function NodeOwner({ data, id }: NodeProps) {
  return <BaseNode data={data} id={id} colorClass="bg-blue-300" />;
}
