import { MoreHorizontal, Pencil, Trash } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "../ui/dropdown-menu";
import { SidebarMenuAction } from "../ui/sidebar";
import { cn } from "@/lib/utils";

interface FlowItemDropDownProps {
  id: string;
  handleEditFlow: (id: string) => void;
  handleDeleteFlow: (id: string) => void;
}

export default function FlowItemDropDown({
  id,
  handleEditFlow,
  handleDeleteFlow,
}: FlowItemDropDownProps) {
  const items = [
    {
      label: "Edit",
      icon: Pencil,
      action: () => handleEditFlow(id),
    },
    {
      label: "Delete",
      icon: Trash,
      action: () => handleDeleteFlow(id),
      className: "hover:bg-red-600/10 focus:bg-red-600/10",
      iconClassName: "text-red-400 transition-colors duration-300 mb-0.5",
      labelClassName: "text-red-400",
    },
  ];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className="cursor-pointer">
        <SidebarMenuAction
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <MoreHorizontal />
        </SidebarMenuAction>
      </DropdownMenuTrigger>

      <DropdownMenuContent side="right" align="start">
        {items.map((item) => (
          <DropdownMenuItem
            key={item.label}
            className={cn("cursor-pointer", item.className)}
            onClick={(e) => {
              e.stopPropagation();
              item.action();
            }}
          >
            <item.icon className={item.iconClassName} />
            <span className={item.labelClassName}>{item.label}</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
