import { NodeProps } from "@xyflow/react";

import BaseNode from "../organisms/BaseNode";

export default function NodeTool({ data, id }: NodeProps) {
  return <BaseNode data={data} id={id} colorClass="bg-zinc-300" />;
}
