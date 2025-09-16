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
import { ownerService } from "@/app/services/owners";

export function OwnerEditModal() {
  const { isOpenOwner, setIsOpenOwner, nodeModalId } = useNodeModal();
  const { nodes, updatePartialNodeData } = useNode();

  const index = nodes.findIndex((d) => d.id === nodeModalId);
  const owner = nodes[index];

  const [title, setTitle] = useState(() => (owner?.data.title as string) ?? "");
  const [ownersText, setOwnersText] = useState(() =>
    ((owner?.data.owners as string[]) ?? []).join(",")
  );

  useEffect(() => {
    if (isOpenOwner && owner) {
      setTitle((owner.data.title as string) ?? "");
      setOwnersText(((owner.data.owners as string[]) ?? []).join(","));
    }
  }, [isOpenOwner, owner]);

  const closeModal = () => {
    setIsOpenOwner(false);
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim()) return;

    const ownersArray = ownersText
      .split(",")
      .map((o) => o.trim())
      .filter(Boolean);

    updatePartialNodeData(owner.id, { title, owners: ownersArray });
    await ownerService.updateData(owner.id, {
      data: { ...owner.data, title, owners: ownersArray },
    });
    setIsOpenOwner(false);
  };

  return (
    <Dialog open={isOpenOwner} onOpenChange={closeModal}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Owner</DialogTitle>
          <DialogDescription>Edit your Owner information</DialogDescription>
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

            <Label htmlFor="owners">Owners</Label>
            <Input
              id="owners"
              placeholder="Enter owners. (TIP: use ',' for multiple owners)"
              value={ownersText}
              onChange={(e) => setOwnersText(e.target.value)}
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
