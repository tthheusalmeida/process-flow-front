"use client";

import { useEffect, useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

import { useNodeModal } from "@/app/context/NodesModalContext";
import { useNode } from "@/app/context/NodesContext";
import { Trash } from "lucide-react";
import { toolsService } from "@/app/services/tools";

interface ToolItem {
  title: string;
  description: string;
}

export function ToolEditModal() {
  const { isOpenTool, setIsOpenTool, nodeModalId } = useNodeModal();
  const { nodes, updatePartialNodeData } = useNode();

  const index = nodes.findIndex((d) => d.id === nodeModalId);
  const tool = nodes[index];

  const [title, setTitle] = useState<string>(
    () => (tool?.data.title as string) ?? ""
  );
  const [tools, setTools] = useState<ToolItem[]>(
    () => (tool?.data.tools as ToolItem[]) ?? []
  );

  useEffect(() => {
    if (isOpenTool && tool) {
      setTitle((tool.data.title as string) ?? "");
      setTools((tool.data.tools as ToolItem[]) ?? []);
    }
  }, [isOpenTool, tool]);

  const handleToolChange = (
    index: number,
    field: keyof ToolItem,
    value: string
  ) => {
    setTools((prev) =>
      prev.map((item, i) => (i === index ? { ...item, [field]: value } : item))
    );
  };

  const addTool = () => {
    setTools((prev) => [...prev, { title: "", description: "" }]);
  };

  const removeTool = (index: number) => {
    setTools((prev) => prev.filter((_, i) => i !== index));
  };
  const closeModal = () => {
    setIsOpenTool(false);
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    const filteredTools = tools.filter((t) => t.title && t.description);

    updatePartialNodeData(tool.id, { title, tools: filteredTools });
    await toolsService.updateData(tool.id, {
      data: { ...tool.data, title, tools: filteredTools },
    });
    setIsOpenTool(false);
  };
  return (
    <Dialog open={isOpenTool} onOpenChange={closeModal}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Tool</DialogTitle>
          <DialogDescription>Edit your Tool information</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleFormSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              placeholder="Enter flow title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />

            <div className="space-y-2 max-h-64 overflow-y-auto pr-2">
              <Label>Tools</Label>
              {tools.map((item, index) => (
                <div key={index} className="flex gap-2">
                  <Input
                    placeholder="Tool Title"
                    value={item.title}
                    onChange={(e) =>
                      handleToolChange(index, "title", e.target.value)
                    }
                    required
                  />
                  <Input
                    placeholder="Tool Description"
                    value={item.description}
                    onChange={(e) =>
                      handleToolChange(index, "description", e.target.value)
                    }
                    required
                  />
                  <Button
                    type="button"
                    variant="destructive"
                    onClick={() => removeTool(index)}
                  >
                    <Trash size={16} />
                  </Button>
                </div>
              ))}
              <Button type="button" onClick={addTool}>
                Add Tool
              </Button>
            </div>
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => closeModal()}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={!title.trim()}>
              Save
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
