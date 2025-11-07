
"use client";
import { IntelligentPortfolioManager } from "@/components/cobranza/intelligent-portfolio-manager";
import { AutomatedCollectionSystem } from "@/components/cobranza/automated-collection-system";
import { PaymentReconciliation } from "@/components/cobranza/payment-reconciliation";

export default function CobranzaPage() {
  return (
    <div className="space-y-8">
       <header className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight">Sistema Moderno de Cobranza</h1>
          <p className="text-muted-foreground mt-2">
            Gestión inteligente, automatización omnicanal y conciliación en tiempo real.
          </p>
        </header>

      <IntelligentPortfolioManager />
      <AutomatedCollectionSystem />
      <PaymentReconciliation />
    </div>
  );
}
