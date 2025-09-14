"use client";

import {
  LucideIcon,
  Plus,
  Trash,
  Workflow,
  Pencil,
  MoreHorizontal,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "../ui/dropdown-menu";

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

function handleCreateFlow() {
  console.log("Should Open a modal to create a flow");
}

function handleEditFlow(id: string) {
  console.log(`Edit flow: ${id}`);
}

function handleDeleteFlow(id: string) {
  console.log(`Delete flow: ${id}`);
}

const itemsMenu: Item[] = [
  {
    title: "Flows",
    icon: Workflow,
    actionButton: (
      <Plus
        className="cursor-pointer size-4"
        onClick={() => handleCreateFlow()}
      />
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

export function AppSidebar() {
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
                          <div onClick={() => handleSelectFlow(flow.id)}>
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
