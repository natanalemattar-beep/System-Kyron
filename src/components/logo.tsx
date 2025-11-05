import { cn } from "@/lib/utils";
import { Sparkles } from "lucide-react";

export function Logo({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "bg-primary text-primary-foreground rounded-lg p-2 w-10 h-10 flex items-center justify-center shadow-lg",
        className
      )}
    >
      <Sparkles className="h-6 w-6" />
    </div>
  );
}
