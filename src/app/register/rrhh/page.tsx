
"use client";

import { redirect } from 'next/navigation';

// This page is deprecated. Redirect to the unified personal registration page.
export default function RegisterRrhhPage() {
    redirect('/register/personal');
}

    