import { cn } from "@/lib/utils";

export function Logo({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "bg-primary text-primary-foreground rounded-lg p-2 w-9 h-9 flex items-center justify-center",
        className
      )}
    >
      <span className="font-bold text-lg tracking-tighter">CMS</span>
    </div>
  );
}
