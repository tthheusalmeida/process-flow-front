import { NodeBaseService } from "./nodeBaseService";

export interface IFlowNode {
  departments: string[];
  documents: string[];
  owners: string[];
  processes: string[];
  tools: string[];
}

export interface IFlow {
  id: string;
  title: string;
  nodes: IFlowNode;
  edges: string[];
  createdAt: Date;
  updatedAt: Date;
}

class FlowsService extends NodeBaseService<IFlow> {
  constructor() {
    super(`/flow`, "flow");
  }
}

export const flowsService = new FlowsService();
