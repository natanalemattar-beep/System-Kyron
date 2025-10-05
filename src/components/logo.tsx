import { cn } from "@/lib/utils";
import { Sparkles } from "lucide-react";

export function Logo({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "bg-primary text-primary-foreground rounded-lg p-2 w-9 h-9 flex items-center justify-center",
        className
      )}
    >
      <Sparkles className="h-5 w-5" />
    </div>
  );
}
