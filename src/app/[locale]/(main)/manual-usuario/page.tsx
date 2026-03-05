
import { redirect } from '@/navigation';

export default function ManualUsuarioRedirect() {
  // Protocolo de seguridad: Evitar colisión de rutas paralelas y mantener integridad de nodos
  redirect('/manual-usuario');
  return null;
}
