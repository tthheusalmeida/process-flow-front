import { NODE_TYPES } from "@/lib/consts";
import { NodeBaseService } from "./nodeBaseService";

export interface IDocuments {
  id: string;
  title: string;
  createdAt: Date;
  updatedAt: Date;
}

class DocumentsService extends NodeBaseService<IDocuments> {
  constructor() {
    super(`/${NODE_TYPES.DEPARTMENT}`, NODE_TYPES.DEPARTMENT);
  }
}

export const documentsService = new DocumentsService();
