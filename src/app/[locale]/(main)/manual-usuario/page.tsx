
import { redirect } from '@/navigation';

export default function ManualUsuarioRedirect() {
  // Protocolo de seguridad: Evitar colisión de rutas paralelas y mantener integridad de nodos
  // Redirigir a la ruta maestra fuera del grupo para evitar errores de Next.js
  redirect('/manual-usuario');
  return null;
}
