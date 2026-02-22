
import Image from "next/image";
import { cn } from "@/lib/utils";

/**
 * Componente Logo de System Kyron.
 * Utiliza la imagen PNG proporcionada por el usuario ubicada en la carpeta pública.
 */
export function Logo({ className }: { className?: string }) {
  return (
    <div className={cn("relative flex items-center justify-center", className)}>
      <Image
        src="/logo.png"
        alt="System Kyron Logo"
        width={40}
        height={40}
        className="w-auto h-auto object-contain"
        priority
      />
    </div>
  );
}
