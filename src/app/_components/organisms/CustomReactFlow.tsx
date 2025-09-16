"use client";

import { useCallback } from "react";
import {
  ReactFlow,
  addEdge,
  Edge,
  Connection,
  Background,
  Controls,
  ConnectionMode,
  NodeChange,
  EdgeChange,
  OnNodeDrag,
} from "@xyflow/react";

import "@xyflow/react/dist/style.css";
import colors from "tailwindcss/colors";
import { getBestProcessHandle } from "@/lib/utils";

import { CustomEdge } from "../molecules/CustomEdge";
import NodeProcess from "../molecules/NodeProcess";
import NodeOwner from "../molecules/NodeOwner";
import NodeDepartment from "../molecules/NodeDepartment";
import NodeTool from "../molecules/NodeTool";
import NodeDocument from "../molecules/NodeDocument";

import { useNode } from "@/app/context/NodesContext";
import { useEdge } from "@/app/context/EdgesContext";
import { NodeModalProvider } from "@/app/context/NodesModalContext";
import { DepartmentEditModal } from "./DepartmentModal";
import { OwnerEditModal } from "./OwnerModal";
import { ProcessEditModal } from "./ProcessModal";
import { DocumentEditModal } from "./DocumentModal";
import { ToolEditModal } from "./ToolModal";
import { BottomToolbar } from "./BottomToolbar";

const { neutral } = colors;

import { NODE_TYPES } from "@/lib/consts";
import { getServiceByType } from "@/app/services";

const NODE_TYPES_MODAL = {
  [NODE_TYPES.DEPARTMENT]: NodeDepartment,
  [NODE_TYPES.DOCUMENT]: NodeDocument,
  [NODE_TYPES.OWNER]: NodeOwner,
  [NODE_TYPES.PROCESS]: NodeProcess,
  [NODE_TYPES.TOOL]: NodeTool,
};

const EDGE_TYPES = {
  default: CustomEdge,
};

export default function CustomReactFlow() {
  const { nodes, onNodesChange } = useNode();
  const { edges, setEdges, onEdgesChange } = useEdge();

  const onConnect = useCallback(
    (params: Connection) => {
      // Validation: only allow connections TO process nodes
      const targetNode = nodes.find((node) => node.id === params.target);
      if (targetNode?.type !== NODE_TYPES.PROCESS) {
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
    },
    [onNodesChange]
  );

  const handleNodeDragStop: OnNodeDrag = async (_, node) => {
    const service = getServiceByType(node.type as string);
    await service.updateData(node.id, { position: node.position });
  };

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

  return (
    <div className="w-full h-screen bg-zinc-800 relative">
      <NodeModalProvider>
        <ReactFlow
          colorMode="dark"
          nodeTypes={NODE_TYPES_MODAL}
          edgeTypes={EDGE_TYPES}
          nodes={nodes}
          edges={edges}
          proOptions={{ hideAttribution: true }}
          onNodesChange={handleNodesChange}
          onEdgesChange={handleEdgesChange}
          onNodeDragStop={handleNodeDragStop}
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

        <DepartmentEditModal />
        <DocumentEditModal />
        <OwnerEditModal />
        <ProcessEditModal />
        <ToolEditModal />
      </NodeModalProvider>

      <BottomToolbar />
    </div>
  );
}
