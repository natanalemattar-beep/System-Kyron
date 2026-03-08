
import { redirect } from "@/navigation";

export default function RedirectPage() {
  // Redirección al nuevo nombre normalizado para evitar colisiones
  redirect("/resumen-negocio");
  return null;
}
