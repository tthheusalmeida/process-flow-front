import { NODE_TYPES } from "@/lib/consts";
import { NodeBaseService } from "./nodeBaseService";

export interface IOwner {
  id: string;
  title: string;
  data: object;
  createdAt: Date;
  updatedAt: Date;
}

class OwnerService extends NodeBaseService<IOwner> {
  constructor() {
    super(`/${NODE_TYPES.OWNER}`, NODE_TYPES.OWNER);
  }
}

export const ownerService = new OwnerService();
