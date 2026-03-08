
import { redirect } from "@/navigation";

/**
 * @fileOverview Redirección para resolver conflicto de rutas paralelas.
 * La página real reside en src/app/[locale]/(main)/sector-privado-system-kyron/page.tsx
 */
export default function ConflictRedirect() {
  redirect("/sector-privado-system-kyron");
  return null;
}
