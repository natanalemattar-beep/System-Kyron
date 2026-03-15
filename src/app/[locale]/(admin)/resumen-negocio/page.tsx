import { redirect } from "@/navigation";

/**
 * @fileOverview Redirección de seguridad para centralizar el flujo en el Dashboard Empresa.
 */
export default function ResumenNegocioRedirect() {
  redirect("/dashboard-empresa");
  return null;
}
