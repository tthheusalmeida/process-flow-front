"use client";

import { useCallback } from "react";
import {
  ReactFlow,
  addEdge,
  Node,
  Edge,
  Connection,
  Background,
  Controls,
  ConnectionMode,
  useEdgesState,
  useNodesState,
  NodeChange,
  EdgeChange,
} from "@xyflow/react";

import "@xyflow/react/dist/style.css";

import colors from "tailwindcss/colors";

import { CustomEdge } from "../molecules/CustomEdge";
import NodeProcess from "../molecules/NodeProcess";
import NodeOwner from "../molecules/NodeOwner";
import NodeDepartment from "../molecules/NodeDepartment";
import NodeTool from "../molecules/NodeTools";
import NodeDocument from "../molecules/NodeDocument";

import { getBestProcessHandle } from "@/lib/utils";

const { neutral } = colors;

const initialNodes: Node[] = [
  // Department no topo
  {
    id: "department-1",
    type: "department",
    position: { x: 200, y: 0 },
    data: { title: "RH", type: "department" },
  },
  // Owner ao lado do department
  {
    id: "owner-1",
    type: "owner",
    position: { x: 350, y: 0 },
    data: { title: "CEO", type: "owner" },
  },
  // Process no meio
  {
    id: "process-1",
    type: "process",
    position: { x: 200, y: 120 },
    data: { title: "Recrutamento", type: "process" },
  },
  // Outro process para testar conexões processo->processo
  {
    id: "process-2",
    type: "process",
    position: { x: 400, y: 120 },
    data: { title: "Aprovação", type: "process" },
  },
  // Document e Tool embaixo
  {
    id: "document-1",
    type: "document",
    position: { x: 150, y: 240 },
    data: { title: "Manual", type: "document" },
  },
  {
    id: "tool-1",
    type: "tool",
    position: { x: 300, y: 240 },
    data: { title: "Slack", type: "tool" },
  },
];

const initialEdges: Edge[] = [
  {
    type: "default",
    source: "department-1",
    target: "process-1",
    targetHandle: "top",
    id: "process-1-department-1",
    selected: false,
  },
  {
    type: "default",
    source: "document-1",
    target: "process-1",
    targetHandle: "bottom",
    id: "process-1-document-1",
    selected: false,
  },
];

const NODE_TYPES = {
  owner: NodeOwner,
  process: NodeProcess,
  department: NodeDepartment,
  tool: NodeTool,
  document: NodeDocument,
};

const EDGE_TYPES = {
  default: CustomEdge,
};

export default function CustomReactFlow() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect = useCallback(
    (params: Connection) => {
      // Validation: only allow connections TO process nodes
      const targetNode = nodes.find((node) => node.id === params.target);
      if (targetNode?.type !== "process") {
        console.log("❌ Connections are only allowed to process nodes");
        return;
      }

      const sourceNode = nodes.find((node) => node.id === params.source);
      if (!sourceNode) return;

      const bestHandle = getBestProcessHandle(sourceNode, targetNode, edges);

      const connectionParams = {
        ...params,
        targetHandle: bestHandle,
      };

      setEdges((edgesSnapshot) => {
        const connectionWithHandle: Edge = {
          ...params,
          id: `${targetNode.id}-${sourceNode.id}`,
          targetHandle: bestHandle ?? null,
        };

        const newEdges = addEdge(connectionWithHandle, edgesSnapshot);
        // TODO: save new connection to database
        console.log("✅ New connection created:", connectionWithHandle);
        return newEdges;
      });
    },
    [nodes, edges, setEdges]
  );

  const handleNodesChange = useCallback(
    (changes: NodeChange[]) => {
      onNodesChange(changes);
      // TODO: save node position changes to database
      const positionChanges = changes.filter(
        (change) => change.type === "position"
      );
      if (positionChanges.length > 0) {
        console.log("📍 Node positions updated:", positionChanges);
      }
    },
    [onNodesChange]
  );

  const handleEdgesChange = useCallback(
    (changes: EdgeChange[]) => {
      onEdgesChange(changes);
      // TODO: save edge changes to database
      const removedEdges = changes.filter((change) => change.type === "remove");
      if (removedEdges.length > 0) {
        console.log("🗑️ Edges removed:", removedEdges);
      }
    },
    [onEdgesChange]
  );

  console.log("Edge: ", edges);

  return (
    <div className="w-full h-screen bg-zinc-800">
      <ReactFlow
        colorMode="dark"
        nodeTypes={NODE_TYPES}
        edgeTypes={EDGE_TYPES}
        nodes={nodes}
        edges={edges}
        proOptions={{ hideAttribution: true }}
        onNodesChange={handleNodesChange}
        onEdgesChange={handleEdgesChange}
        onConnect={onConnect}
        connectionMode={ConnectionMode.Loose}
        defaultEdgeOptions={{ type: "default" }}
        fitView
        className="bg-zinc-800"
      >
        <Background
          gap={12}
          size={1}
          color={neutral[700]}
          bgColor={neutral[800]}
        />
        <Controls className="fill-white" />
      </ReactFlow>
    </div>
  );
}
