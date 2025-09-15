import { ICreate } from "./constants";

export interface INode {
  id: string;
  title: string;
  createdAt: Date;
  updatedAt: Date;
}

export class NodeBaseService<T> {
  private endPoint: string;
  private type: string;

  constructor(endPoint: string, type: string) {
    this.endPoint = endPoint + "s";
    this.type = type;
  }

  async getData(): Promise<T[]> {
    const url = process.env.NEXT_PUBLIC_BASE_URL + this.endPoint;

    const response = await fetch(url, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    this.throwErrorIfFailedToFetch(response.ok);

    return await response.json();
  }

  async getDataById(id: string): Promise<T> {
    const url = `${process.env.NEXT_PUBLIC_BASE_URL}${this.endPoint}/${id}`;

    const response = await fetch(url, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    this.throwErrorIfFailedToFetch(response.ok);

    return await response.json();
  }

  async createData(newData: ICreate | T): Promise<T> {
    const url = process.env.NEXT_PUBLIC_BASE_URL + this.endPoint;

    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newData),
    });

    this.throwErrorIfFailedToFetch(response.ok);

    return await response.json();
  }

  async updateData(id: string, data: Partial<T>): Promise<T> {
    const url = `${process.env.NEXT_PUBLIC_BASE_URL}${this.endPoint}/${id}`;

    const response = await fetch(url, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    console.log(data);
    this.throwErrorIfFailedToFetch(response.ok);

    return await response.json();
  }

  async deleteData(id: string): Promise<boolean> {
    const url = `${process.env.NEXT_PUBLIC_BASE_URL}${this.endPoint}/${id}`;

    const response = await fetch(url, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    });

    this.throwErrorIfFailedToFetch(response.ok);

    return true;
  }

  private throwErrorIfFailedToFetch(isResponseOk: boolean) {
    if (!isResponseOk) {
      throw new Error(`Failed to fetch ${this.type} data`);
    }
  }
}
