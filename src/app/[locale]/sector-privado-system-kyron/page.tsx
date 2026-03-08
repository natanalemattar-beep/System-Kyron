
import { redirect } from "@/navigation";

export default function ConflictRedirect() {
  // Redirección para resolver el conflicto de rutas paralelas
  // La página real reside en src/app/[locale]/(main)/sector-privado-system-kyron/page.tsx
  redirect("/dossier-corporativo");
  return null;
}
