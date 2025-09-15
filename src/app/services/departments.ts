import { NODE_TYPES } from "@/lib/consts";
import { NodeBaseService } from "./nodeBaseService";

export interface IDepartment {
  id: string;
  title: string;
  data: object;
  createdAt: Date;
  updatedAt: Date;
}

class DepartmentsService extends NodeBaseService<IDepartment> {
  constructor() {
    super(`/${NODE_TYPES.DEPARTMENT}`, NODE_TYPES.DEPARTMENT);
  }
}

export const departmentsService = new DepartmentsService();
