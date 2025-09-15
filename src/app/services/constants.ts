export interface ICreate {
  id: string;
  position: { x: number; y: number };
  type: string;
  flowId: string;
  data: object;
  createdAt: Date;
  updatedAt: Date;
}
