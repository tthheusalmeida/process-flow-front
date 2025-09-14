import { MoreHorizontal, Pencil, Trash } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "../ui/dropdown-menu";
import { SidebarMenuAction } from "../ui/sidebar";

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
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <SidebarMenuAction
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <MoreHorizontal />
        </SidebarMenuAction>
      </DropdownMenuTrigger>

      <DropdownMenuContent side="right" align="start">
        <DropdownMenuItem
          onClick={(e) => {
            e.stopPropagation();
            handleEditFlow(id);
          }}
        >
          <Pencil />
          <span>Edit</span>
        </DropdownMenuItem>

        <DropdownMenuItem
          className="hover:bg-red-600/10 focus:bg-red-600/10"
          onClick={(e) => {
            e.stopPropagation();
            handleDeleteFlow(id);
          }}
        >
          <Trash className="text-red-400 transition-colors duration-300 mb-0.5" />
          <span className="text-red-400">Delete</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
