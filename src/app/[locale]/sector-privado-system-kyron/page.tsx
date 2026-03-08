
import { redirect } from "@/navigation";

/**
 * @fileOverview Redirección obligatoria a la ruta raíz para unificar el Expediente Maestro.
 */
export default function RedirectPage() {
  redirect("/sector-privado-system-kyron");
  return null;
}
