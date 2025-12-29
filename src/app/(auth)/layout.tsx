
import { ReactNode } from "react";

// This layout is minimal and just centers the authentication forms.
// It should not contain any complex logic or headers that might conflict.
export default function AuthLayout({ children }: { children: ReactNode }) {
    return (
        <main className="flex min-h-screen flex-col items-center justify-center p-4 md:p-8">
            {children}
        </main>
    );
}
