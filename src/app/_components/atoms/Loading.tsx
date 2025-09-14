import { cn } from "@/lib/utils";
import { Loader } from "lucide-react";

export default function Loading({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-center justify-center", className)}>
      <Loader className="animate-spin" />
    </div>
  );
}
