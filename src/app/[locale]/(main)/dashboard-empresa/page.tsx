
import { redirect } from '@/navigation';

export default function DashboardEmpresaRedirect() {
  // Protocolo de seguridad: Evitar colisión de rutas paralelas en Next.js
  redirect('/dashboard-empresa');
  return null;
}
