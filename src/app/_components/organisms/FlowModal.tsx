"use client";

import { useEffect, useState } from "react";
import { useFlowModal } from "../../context/FlowModalContext";
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

export function FlowModal() {
  const { isOpen, modalType, flowData, closeModal, handleSubmit } =
    useFlowModal();
  const [title, setTitle] = useState("");

  useEffect(() => {
    if (isOpen) {
      setTitle(flowData?.title || "");
    } else {
      setTitle("");
    }
  }, [isOpen, flowData]);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim()) {
      return;
    }

    handleSubmit({
      id: flowData?.id,
      title: title.trim(),
    });
  };

  const modalTitle = modalType === "create" ? "Create new Flow" : "Edit Flow";
  const modalDescription =
    modalType === "create"
      ? "Create a new flow to organize your work"
      : "Edit your flow information";

  const submitButtonText = modalType === "create" ? "Create" : "Save";

  return (
    <Dialog open={isOpen} onOpenChange={closeModal}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{modalTitle}</DialogTitle>
          <DialogDescription>{modalDescription}</DialogDescription>
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
              {submitButtonText}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
