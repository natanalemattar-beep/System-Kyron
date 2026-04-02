
import { cn } from "@/lib/utils";
import Image from "next/image";

export function Logo({ className, id }: { className?: string; id?: string }) {
  return (
    <div
      id={id}
      className={cn(
        "relative flex items-center justify-center shrink-0 logo-relief",
        className
      )}
    >
      <div className="absolute inset-[-15%] rounded-full bg-gradient-to-br from-emerald-400/25 via-cyan-500/20 to-teal-400/10 blur-lg logo-glow-layer pointer-events-none" />
      <div className="absolute inset-[-8%] rounded-full bg-gradient-to-t from-emerald-500/10 via-transparent to-cyan-400/10 blur-md pointer-events-none" />
      <Image
        src="/images/logo-transparent.png"
        alt="System Kyron"
        width={512}
        height={512}
        className="w-full h-full object-contain relative z-10 logo-image"
        priority
      />
    </div>
  );
}
