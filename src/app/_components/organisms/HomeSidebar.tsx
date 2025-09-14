"use client";

import { LucideIcon, Plus, Workflow } from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "../ui/sidebar";

import { SidebarTrigger } from "../ui/sidebar";
import Loading from "../atoms/Loading";
import FlowItemDropDown from "../molecules/FlowItemDropDown";

import { useFlowModal } from "@/app/context/FlowModalContext";
import { useConfirmationModal } from "@/app/context/ConfirmationModalContext";
import { useFlowsData } from "@/app/context/FlowsDataContext";

import { deleteFlow } from "@/app/services/flows";

interface Item {
  title: string;
  icon: LucideIcon;
  actionButton: React.ReactElement;
}

function handleSelectFlow(id: string) {
  console.log(`Selected flow: ${id}`);
}

export function HomeSidebar() {
  const { openModal } = useFlowModal();
  const { openConfirmation } = useConfirmationModal();
  const { flows, isLoading: flowIsLoading, remove } = useFlowsData();

  const handleCreateFlow = () => {
    openModal("create");
  };

  const handleEditFlow = (id: string) => {
    const flowToEdit = flows.find((flow) => flow.id === id);
    if (flowToEdit) {
      openModal("edit", flowToEdit);
    }
  };

  const handleDeleteFlow = (id: string) => {
    const flowToDelete = flows.find((flow) => flow.id === id);
    const flowName = flowToDelete?.title || "this flow";

    openConfirmation({
      title: "Delete Flow",
      description: `Are you sure you want to delete the flow "${flowName}"? This action cannot be undone.`,
      confirmText: "Delete",
      cancelText: "Cancel",
      variant: "destructive",
      onConfirm: async () => {
        await deleteFlow(id);
        remove(id);
      },
    });
  };

  const itemsMenu: Item[] = [
    {
      title: "Flows",
      icon: Workflow,
      actionButton: (
        <Plus className="cursor-pointer size-4" onClick={handleCreateFlow} />
      ),
    },
  ];

  const handleFlowClick = (flowId: string, event: React.MouseEvent) => {
    const target = event.target as HTMLElement;
    if (target.closest(".flow-item-dropdown")) {
      return;
    }
    handleSelectFlow(flowId);
  };

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <SidebarTrigger />
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Menu</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {itemsMenu.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <div className="flex items-center gap-2">
                      <item.icon className="size-5" />
                      <span>{item.title}</span>
                    </div>
                  </SidebarMenuButton>

                  <SidebarMenuAction>{item.actionButton}</SidebarMenuAction>

                  {flowIsLoading ? (
                    <Loading />
                  ) : (
                    <SidebarMenuSub>
                      {flows.map((flow) => (
                        <SidebarMenuSubItem key={flow.id}>
                          <SidebarMenuSubButton
                            className="cursor-pointer items-center"
                            asChild
                          >
                            <div
                              onClick={(e) => handleFlowClick(flow.id, e)}
                              className="flex items-center w-full"
                            >
                              <span className="truncate max-w-44">
                                {flow.title}
                              </span>
                              <span className="flow-item-dropdown">
                                <FlowItemDropDown
                                  id={flow.id}
                                  handleEditFlow={handleEditFlow}
                                  handleDeleteFlow={handleDeleteFlow}
                                />
                              </span>
                            </div>
                          </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                      ))}
                    </SidebarMenuSub>
                  )}
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
