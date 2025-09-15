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

export function DepartmentEditModal() {
  const { isOpenDepartment, setIsOpenDepartment, nodeModalId } = useNodeModal();
  const { nodes, updatePartialNodeData } = useNode();

  const index = nodes.findIndex((d) => d.id === nodeModalId);
  const department = nodes[index];

  console.log(department);

  const [title, setTitle] = useState<string>(
    () => (department?.data.title as string) ?? ""
  );

  useEffect(() => {
    if (isOpenDepartment && department) {
      setTitle((department.data.title as string) ?? "");
    }
  }, [isOpenDepartment, department]);

  const closeModal = () => {
    setIsOpenDepartment(false);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim()) {
      return;
    }

    updatePartialNodeData(department.id, { title });
    setIsOpenDepartment(false);
  };

  return (
    <Dialog open={isOpenDepartment} onOpenChange={closeModal}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Department</DialogTitle>
          <DialogDescription>
            Edit your Department information
          </DialogDescription>
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
