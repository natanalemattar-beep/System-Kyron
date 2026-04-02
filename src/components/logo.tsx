
import { cn } from "@/lib/utils";
import Image from "next/image";

export function Logo({ className, id }: { className?: string; id?: string }) {
  return (
    <div id={id} className={cn("relative flex items-center justify-center shrink-0", className)}>
      <Image
        src="/images/logo-transparent.png"
        alt="System Kyron"
        width={512}
        height={512}
        className="w-full h-full object-contain"
        priority
      />
    </div>
  );
}
