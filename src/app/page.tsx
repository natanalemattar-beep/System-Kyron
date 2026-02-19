
import { redirect } from 'next/navigation';

export default function RootPage() {
  // Redirige automáticamente a la versión en español de la landing page
  redirect('/es');
}
