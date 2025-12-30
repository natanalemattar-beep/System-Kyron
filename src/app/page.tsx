import { redirect } from 'next/navigation';

// This is the root page. It will automatically redirect to the default locale.
// The default locale is configured in the middleware.
export default function RootPage() {
  redirect('/es');
}
