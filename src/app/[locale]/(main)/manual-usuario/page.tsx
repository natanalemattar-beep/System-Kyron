
/**
 * @fileOverview NODO PURGADO - REDIRECCIÓN DE SEGURIDAD
 * Este punto de entrada ha sido desactivado para resolver el conflicto de rutas paralelas.
 * La documentación oficial reside ahora en la ruta raíz: /manual-usuario
 */
import { redirect } from "@/navigation";

export default function ManualUsuarioRedirect() {
    redirect("/manual-usuario");
    return null;
}
