import { NodeBaseService } from "./nodeBaseService";

export interface IFlow {
  id: string;
  title: string;
  departments: string[];
  documents: string[];
  owners: string[];
  processes: string[];
  tools: string[];
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
