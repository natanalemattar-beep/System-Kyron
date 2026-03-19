
import { redirect } from 'next/navigation';

export default function LocalePage({ params }: { params: Promise<{ locale: string }> }) {
  redirect('/es/dashboard-empresa');
}
