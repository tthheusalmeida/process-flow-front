import { NODE_TYPES } from "@/lib/consts";
import { NodeBaseService } from "./nodeBaseService";

export interface ITool {
  id: string;
  title: string;
  data: object;
  position: object;
  createdAt: Date;
  updatedAt: Date;
}

export class ToolsService extends NodeBaseService<ITool> {
  constructor() {
    super(`/${NODE_TYPES.TOOL}`, NODE_TYPES.TOOL);
  }
}

export const toolsService = new ToolsService();
