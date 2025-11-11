
"use client";

import { JuridicoDashboard } from "@/components/dashboard/juridico-dashboard";
import { redirect } from 'next/navigation';

export default function JuridicoDashboardPage() {
  redirect('/escritorio-juridico');
  // return <JuridicoDashboard />;
}
