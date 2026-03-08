import { redirect } from "@/navigation";

export default function ConflictRedirect() {
  // Redirección forzada para eliminar el conflicto de rutas paralelas
  redirect("/sector-privado-system-kyron");
  return null;
}