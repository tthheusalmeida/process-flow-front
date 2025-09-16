import { NODE_TYPES } from "@/lib/consts";
import { NodeBaseService } from "./nodeBaseService";

export interface IProcess {
  id: string;
  title: string;
  data: object;
  createdAt: Date;
  updatedAt: Date;
}

export class ProcessesService extends NodeBaseService<IProcess> {
  constructor() {
    super(`/${NODE_TYPES.PROCESS}e`, NODE_TYPES.PROCESS);
  }
}

export const processesService = new ProcessesService();
