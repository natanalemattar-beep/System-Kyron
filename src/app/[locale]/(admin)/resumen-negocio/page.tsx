
import { redirect } from "@/navigation";

/**
 * @fileOverview Redirección obligatoria al nuevo Dashboard Empresa.
 * Se eliminó la ruta redundante para centralizar el mando.
 */
export default function ResumenNegocioRedirect() {
  redirect("/dashboard-empresa");
  return null;
}
