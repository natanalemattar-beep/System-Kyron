
import { redirect } from 'next/navigation';
export default function PartidaNacimientoNeutralizer() {
  // Redirección obligatoria al segmento de localización para evitar 404
  redirect('/es/partidas-nacimiento');
  return null;
}
