import { NodeBaseService } from "./nodeBaseService";

export interface IEdge {
  id: string;
  flowId: string;
  source: string;
  sourceHandle?: string;
  target: string;
  targetHandle: string | object | null;
  type: string;
}

class EdgesService extends NodeBaseService<IEdge> {
  constructor() {
    super(`/edge`, "edge");
  }
}

export const edgesService = new EdgesService();
