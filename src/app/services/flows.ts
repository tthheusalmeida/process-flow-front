export interface IFlow {
  id: string;
  title: string;
  createdAt: Date;
  updatedAt: Date;
}

function throwErrorIfFailedToFetch(isResponseOk: boolean) {
  if (!isResponseOk) {
    throw new Error("Failed to fetch flows data");
  }
}

export async function getFlows() {
  const endPoint = `/flows`;
  const url = process.env.NEXT_PUBLIC_BASE_URL + endPoint;

  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  throwErrorIfFailedToFetch(response.ok);

  const responseData = await response.json();
  return responseData;
}

export async function getFlowById(id: string) {
  const endPoint = `/flows/${id}`;
  const url = process.env.NEXT_PUBLIC_BASE_URL + endPoint;

  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  throwErrorIfFailedToFetch(response.ok);

  const responseData = await response.json();
  return responseData;
}

export async function createFlow(newData: IFlow) {
  const endPoint = `/flows`;
  const url = process.env.NEXT_PUBLIC_BASE_URL + endPoint;

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newData),
  });

  throwErrorIfFailedToFetch(response.ok);

  const responseData = await response.json();
  return responseData;
}

export async function updateFlow(id: string, data: Partial<IFlow>) {
  const endPoint = `/flows/${id}`;
  const url = process.env.NEXT_PUBLIC_BASE_URL + endPoint;

  const response = await fetch(url, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ ...data }),
  });

  throwErrorIfFailedToFetch(response.ok);

  const responseData = await response.json();
  return responseData;
}

export async function deleteFlow(id: string) {
  const endPoint = `/flows/${id}`;
  const url = process.env.NEXT_PUBLIC_BASE_URL + endPoint;

  const response = await fetch(url, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });

  throwErrorIfFailedToFetch(response.ok);

  return true;
}
