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
import FlowItemDropDown from "../molecules/FlowItemDropDown";
import { useFlowModal } from "../../context/FlowModalContext";
import { useConfirmationModal } from "../../context/ConfirmationModalContext";

interface IFlowProps {
  id: string;
  title: string;
}

interface Item {
  title: string;
  icon: LucideIcon;
  actionButton: React.ReactElement;
  flows: IFlowProps[];
}

function handleSelectFlow(id: string) {
  console.log(`Selected flow: ${id}`);
}

export function HomeSidebar() {
  const { openModal } = useFlowModal();
  const { openConfirmation } = useConfirmationModal();

  const handleCreateFlow = () => {
    openModal("create");
  };

  const handleEditFlow = (id: string) => {
    const flowToEdit = itemsMenu[0].flows.find((flow) => flow.id === id);
    if (flowToEdit) {
      openModal("edit", flowToEdit);
    }
  };

  const handleDeleteFlow = (id: string) => {
    const flowToDelete = itemsMenu[0].flows.find((flow) => flow.id === id);
    const flowName = flowToDelete?.title || "this flow";

    openConfirmation({
      title: "Delete Flow",
      description: `Are you sure you want to delete the flow "${flowName}"? This action cannot be undone.`,
      confirmText: "Delete",
      cancelText: "Cancel",
      variant: "destructive",
      onConfirm: () => {
        console.log(`Delete flow: ${id}`);
        // TODO: Implement delete logic
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
      flows: [
        {
          id: "1",
          title: "Flow 1",
        },
        {
          id: "2",
          title: "Flow 2",
        },
      ],
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

                  <SidebarMenuSub>
                    {item.flows.map((flow) => (
                      <SidebarMenuSubItem key={flow.id}>
                        <SidebarMenuSubButton
                          className="cursor-pointer items-center"
                          asChild
                        >
                          <div onClick={(e) => handleFlowClick(flow.id, e)}>
                            <span>{flow.title}</span>
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
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
