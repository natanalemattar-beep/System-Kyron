
import { redirect } from "@/navigation";

/**
 * @fileOverview Redirección de seguridad.
 * Esta página ha sido movida al grupo (natural) para heredar el layout correcto del Portal Personal.
 */
export default function CertificadosIngresoRedirect() {
  redirect("/cuenta-personal/certificados-ingreso");
  return null;
}
