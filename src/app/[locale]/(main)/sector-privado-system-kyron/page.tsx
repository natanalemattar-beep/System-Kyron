import { redirect } from "@/navigation";

/**
 * @fileOverview Redirección obligatoria para evitar conflicto de rutas paralelas en Next.js 15.
 * Se eliminó la página duplicada y se redirige a la ruta raíz limpia.
 */
export default function ConflictRedirect() {
  redirect("/sector-privado-system-kyron");
  return null;
}