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
} from "../ui/sidebar";

import { SidebarTrigger } from "../ui/sidebar";

interface Item {
  title: string;
  onClick: () => void;
  icon: LucideIcon;
  buttonIcon: LucideIcon;
}

const itemsMenu: Item[] = [
  {
    title: "Process",
    onClick: () => {
      console.log("Should Open a modal to create a process");
    },
    icon: Workflow,
    buttonIcon: Plus,
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

                  <SidebarMenuAction>
                    <item.buttonIcon
                      className="cursor-pointer size-4"
                      onClick={item.onClick}
                    />
                  </SidebarMenuAction>

                  <SidebarMenuSub>
                    <SidebarMenuItem>
                      <SidebarMenuSubButton>1</SidebarMenuSubButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                      <SidebarMenuSubButton>1</SidebarMenuSubButton>
                    </SidebarMenuItem>
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
