import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { Edge, Node } from "@xyflow/react";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getConnectionRules = (sourceType: string) => {
  switch (sourceType) {
    case "department":
    case "owner":
      // Department and Owner connect BELOW the process (come from above)
      return {
        preferredHandle: "top",
        reasoning: `${sourceType} connects at the top of the process`,
      };

    case "document":
    case "tool":
      // Document e Tool connect ABOVE the process (come from below)
      return {
        preferredHandle: "bottom",
        reasoning: `${sourceType} connects below the process`,
      };

    case "process":
      // Processes connect to each other laterally
      return {
        preferredHandle: "left",
        reasoning: "Process flow (process connects from the side)",
      };

    default:
      return {
        preferredHandle: "left",
        reasoning: "Standard connection",
      };
  }
};

export const getBestProcessHandle = (
  sourceNode: Node,
  targetNode: Node,
  existingEdges: Edge[]
) => {
  if (targetNode.type !== "process") return undefined;

  const connectionRule = getConnectionRules(sourceNode.data.type as string);

  console.log(
    `🔗 Connecting ${sourceNode.data.type} -> ${targetNode.data.type}: ${connectionRule.reasoning}`
  );

  const handleConnections = {
    left: 0,
    top: 0,
    bottom: 0,
  };

  existingEdges.forEach((edge) => {
    if (edge.target === targetNode.id) {
      const handleId = edge.targetHandle || "left";
      if (handleId in handleConnections) {
        handleConnections[handleId as keyof typeof handleConnections]++;
      }
    }
  });

  const preferredHandle = connectionRule.preferredHandle;
  const maxConnectionsPerHandle = 100;

  if (
    handleConnections[preferredHandle as keyof typeof handleConnections] <
    maxConnectionsPerHandle
  ) {
    return preferredHandle;
  }

  let bestHandle = preferredHandle;
  let minConnections =
    handleConnections[preferredHandle as keyof typeof handleConnections];

  // For department/owner, only consider the top.
  // For document/tool, only consider the bottom.
  // For process, only consider the left.
  const allowedHandles =
    sourceNode.data.type === "department" || sourceNode.data.type === "owner"
      ? ["top"]
      : sourceNode.data.type === "document" || sourceNode.data.type === "tool"
      ? ["bottom"]
      : ["left"];

  allowedHandles.forEach((handle) => {
    const count = handleConnections[handle as keyof typeof handleConnections];
    if (count < minConnections) {
      minConnections = count;
      bestHandle = handle;
    }
  });

  console.log(
    `📍 Handle chosen: ${bestHandle} (${
      handleConnections[bestHandle as keyof typeof handleConnections]
    } connections)`
  );
  return bestHandle;
};
