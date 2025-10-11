import { cn } from "@/lib/utils";
import { Sparkles } from "lucide-react";

export function Logo({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "bg-gradient-to-br from-blue-500 to-cyan-400 text-white rounded-lg p-2 w-10 h-10 flex items-center justify-center shadow-lg",
        className
      )}
    >
      <Sparkles className="h-6 w-6" />
    </div>
  );
}
