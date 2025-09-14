"use client";

import { LucideIcon, Plus, Trash, Workflow } from "lucide-react";

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
} from "../ui/sidebar";

import { SidebarTrigger } from "../ui/sidebar";

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
  console.log(`Select process step: ${id}`);
}

function handleCreateFlow() {
  console.log("Should Open a modal to create a flow");
}

function handleDeleteFlow(id: string) {
  console.log(`Delete process step: ${id}`);
}

const itemsMenu: Item[] = [
  {
    title: "Flows",
    icon: Workflow,
    actionButton: (
      <Plus
        className="cursor-pointer size-4 hover:text-green-400 transition-colors duration-300"
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
                      <SidebarMenuItem key={flow.id}>
                        <SidebarMenuSubButton
                          className="cursor-pointer items-center"
                          asChild
                        >
                          <div
                            className="flex items-center gap-4"
                            onClick={() => handleSelectFlow(flow.id)}
                          >
                            {flow.title}

                            <SidebarMenuAction>
                              <Trash
                                className="cursor-pointer size-4 hover:text-red-400 transition-colors duration-300 mb-0.5"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleDeleteFlow(flow.id);
                                }}
                              />
                            </SidebarMenuAction>
                          </div>
                        </SidebarMenuSubButton>
                      </SidebarMenuItem>
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
