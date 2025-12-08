

import LandingPage from "./[locale]/page";

// This component is now just a wrapper.
// The actual landing page logic is in /src/app/[locale]/page.tsx
export default function Home() {
    return <LandingPage />;
}
