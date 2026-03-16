
import { redirect } from "@/navigation";

/**
 * @fileOverview Redirección de seguridad.
 * Esta página ahora reside en el grupo (natural) para mantener la coherencia del portal.
 */
export default function PerfilRedirect() {
  redirect("/perfil");
  return null;
}
