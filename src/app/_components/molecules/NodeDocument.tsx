import { NodeProps } from "@xyflow/react";

import BaseNode from "../organisms/BaseNode";

export default function NodeDocument({ data, id }: NodeProps) {
  return <BaseNode data={data} id={id} colorClass="bg-yellow-300" />;
}
