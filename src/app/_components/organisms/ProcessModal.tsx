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
import { Textarea } from "../ui/textarea";

export function ProcessEditModal() {
  const { isOpenProcess, setIsOpenProcess, nodeModalId } = useNodeModal();
  const { nodes, updatePartialNodeData } = useNode();

  const index = nodes.findIndex((d) => d.id === nodeModalId);
  const process = nodes[index];

  const [title, setTitle] = useState(
    () => (process?.data.title as string) ?? ""
  );
  const [description, setDescription] = useState(
    () => (process?.data.description as string) ?? ""
  );

  useEffect(() => {
    if (isOpenProcess && process) {
      setTitle((process.data.title as string) ?? "");
      setDescription((process.data.description as string) ?? "");
    }
  }, [isOpenProcess, process]);

  const closeModal = () => {
    setIsOpenProcess(false);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim()) return;

    updatePartialNodeData(process.id, { title, description });
    setIsOpenProcess(false);
  };

  return (
    <Dialog open={isOpenProcess} onOpenChange={closeModal}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Process</DialogTitle>
          <DialogDescription>Edit your Process information</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleFormSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              placeholder="Enter process title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />

            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              placeholder="Enter process description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
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
