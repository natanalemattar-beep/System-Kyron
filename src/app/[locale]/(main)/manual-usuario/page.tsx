import { redirect } from '@/navigation';

export default function ManualUsuarioRedirect() {
  // ARCHIVO NEUTRALIZADO PARA EVITAR COLISIÓN DE RUTAS EN NEXT.JS 15
  redirect('/manual-usuario');
  return null;
}
