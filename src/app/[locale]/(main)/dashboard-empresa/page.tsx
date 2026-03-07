
import { redirect } from '@/navigation';

export default function DashboardEmpresaRedirect() {
  // ARCHIVO NEUTRALIZADO PARA EVITAR COLISIÓN CON EL GRUPO (ADMIN)
  redirect('/dashboard-empresa');
  return null;
}
