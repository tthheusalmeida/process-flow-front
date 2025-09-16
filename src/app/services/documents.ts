import { NODE_TYPES } from "@/lib/consts";
import { NodeBaseService } from "./nodeBaseService";

export interface IDocuments {
  id: string;
  title: string;
  data: object;
  position: object;
  createdAt: Date;
  updatedAt: Date;
}

class DocumentsService extends NodeBaseService<IDocuments> {
  constructor() {
    super(`/${NODE_TYPES.DOCUMENT}`, NODE_TYPES.DOCUMENT);
  }
}

export const documentsService = new DocumentsService();
