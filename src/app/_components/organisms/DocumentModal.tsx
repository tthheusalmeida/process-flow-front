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

interface LinkItem {
  label: string;
  link: string;
}

export function DocumentEditModal() {
  const { isOpenDocument, setIsOpenDocument, nodeModalId } = useNodeModal();
  const { nodes, updatePartialNodeData } = useNode();

  const index = nodes.findIndex((d) => d.id === nodeModalId);
  const document = nodes[index];

  const [title, setTitle] = useState<string>(
    () => (document?.data.title as string) ?? ""
  );
  const [links, setLinks] = useState<LinkItem[]>(
    () => (document?.data.links as LinkItem[]) ?? []
  );

  useEffect(() => {
    if (isOpenDocument && document) {
      setTitle((document.data.title as string) ?? "");
      setLinks((document.data.links as LinkItem[]) ?? []);
    }
  }, [isOpenDocument, document]);

  const handleLinkChange = (
    index: number,
    field: keyof LinkItem,
    value: string
  ) => {
    setLinks((prev) =>
      prev.map((item, i) => (i === index ? { ...item, [field]: value } : item))
    );
  };

  const addLink = () => {
    setLinks((prev) => [...prev, { label: "", link: "" }]);
  };

  const removeLink = (index: number) => {
    setLinks((prev) => prev.filter((_, i) => i !== index));
  };

  const closeModal = () => {
    setIsOpenDocument(false);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    // opcional: remover links incompletos
    const filteredLinks = links.filter((l) => l.label && l.link);

    updatePartialNodeData(document.id, { title, links: filteredLinks });
    setIsOpenDocument(false);
  };

  return (
    <Dialog open={isOpenDocument} onOpenChange={closeModal}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Document</DialogTitle>
          <DialogDescription>Edit your Document information</DialogDescription>
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
              <Label>Links</Label>
              {links.map((item, index) => (
                <div key={index} className="flex gap-2">
                  <Input
                    placeholder="Label"
                    value={item.label}
                    onChange={(e) =>
                      handleLinkChange(index, "label", e.target.value)
                    }
                    required
                  />
                  <Input
                    placeholder="Link"
                    value={item.link}
                    onChange={(e) =>
                      handleLinkChange(index, "link", e.target.value)
                    }
                    required
                  />
                  <Button
                    type="button"
                    variant="destructive"
                    onClick={() => removeLink(index)}
                  >
                    <Trash size={16} />
                  </Button>
                </div>
              ))}
              <Button type="button" onClick={addLink}>
                Add Link
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
