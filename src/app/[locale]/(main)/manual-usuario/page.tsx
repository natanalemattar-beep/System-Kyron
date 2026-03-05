
import { redirect } from '@/navigation';

export default function ManualUsuarioRedirect() {
  // Protocolo de seguridad: Evitar colisión de rutas paralelas en Next.js
  redirect('/manual-usuario');
  return null;
}
