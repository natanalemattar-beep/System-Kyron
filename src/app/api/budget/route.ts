import { NextRequest, NextResponse } from 'next/server';

const MODULE_PRICING: Record<string, { name: string; plans: { name: string; price: number }[] }> = {
    mi_linea_personal: {
        name: 'Mi Línea Personal',
        plans: [
            { name: 'Básico 2GB', price: 3 },
            { name: 'Conecta 5GB', price: 5 },
            { name: 'Plus 10GB', price: 8 },
            { name: 'Global 25GB', price: 14 },
            { name: 'Ultra 50GB', price: 22 },
            { name: 'Infinite', price: 35 },
        ],
    },
    mi_linea_juridica: {
        name: 'Mi Línea Jurídica',
        plans: [
            { name: 'Emprendedor', price: 15 },
            { name: 'PyME', price: 30 },
            { name: 'Corporativo', price: 55 },
            { name: 'Enterprise', price: 120 },
        ],
    },
    asesoria_contable: {
        name: 'Asesoría Contable',
        plans: [
            { name: 'Esencial', price: 8 },
            { name: 'Profesional', price: 18 },
            { name: 'Avanzado', price: 35 },
            { name: 'MAX', price: 60 },
        ],
    },
    asesoria_legal: {
        name: 'Asesoría Legal',
        plans: [
            { name: 'Documentos', price: 5 },
            { name: 'Profesional', price: 15 },
            { name: 'Escritorio Jurídico', price: 30 },
            { name: 'MAX', price: 50 },
        ],
    },
    facturacion: {
        name: 'Facturación',
        plans: [
            { name: 'Inicio', price: 6 },
            { name: 'Comercial', price: 15 },
            { name: 'Enterprise', price: 30 },
            { name: 'MAX', price: 50 },
        ],
    },
    socios_directivos: {
        name: 'Socios y Directivos',
        plans: [
            { name: 'Básico', price: 10 },
            { name: 'Profesional', price: 25 },
            { name: 'Enterprise', price: 45 },
        ],
    },
};

const COMBO_PLANS = [
    { name: 'Personal', monthlyPrice: 0, annualPrice: 0 },
    { name: 'Profesional', monthlyPrice: 29, annualPrice: 23 },
    { name: 'Empresarial', monthlyPrice: 59, annualPrice: 47 },
    { name: 'Kyron MAX', monthlyPrice: 149, annualPrice: 119 },
];

interface BudgetRequest {
    employees: number;
    modules: Record<string, boolean>;
    needsAccounting: boolean;
    needsLegal: boolean;
    needsInvoicing: boolean;
    needsTelecom: boolean;
    needsPartners: boolean;
    budget: 'low' | 'medium' | 'high';
    locale: string;
}

function generateBudget(data: BudgetRequest) {
    const { employees, modules, budget, locale } = data;
    const isEs = locale === 'es';

    const selectedModules = Object.entries(modules).filter(([, v]) => v).map(([k]) => k);

    const recommendations: { module: string; plan: string; price: number; reason: string }[] = [];

    for (const modKey of selectedModules) {
        const mod = MODULE_PRICING[modKey];
        if (!mod) continue;

        const plans = mod.plans;
        let selectedPlan;

        if (budget === 'low') {
            selectedPlan = plans[0];
        } else if (budget === 'high') {
            selectedPlan = plans[plans.length - 1];
        } else {
            selectedPlan = plans[Math.min(1, plans.length - 1)];
        }

        if (modKey === 'mi_linea_personal' && employees > 10) {
            selectedPlan = plans[Math.min(3, plans.length - 1)];
        }
        if (modKey === 'mi_linea_juridica' && employees > 20) {
            selectedPlan = plans[Math.min(2, plans.length - 1)];
        }
        if (modKey === 'asesoria_contable' && employees > 15) {
            selectedPlan = plans[Math.min(2, plans.length - 1)];
        }
        if (modKey === 'facturacion' && employees > 25) {
            selectedPlan = plans[Math.min(2, plans.length - 1)];
        }

        let reason = '';
        if (isEs) {
            if (budget === 'low') reason = `Opción más económica para ${mod.name}`;
            else if (budget === 'high') reason = `Máxima capacidad para ${mod.name}`;
            else reason = `Mejor relación precio-funcionalidad para ${mod.name}`;
            if (employees > 10) reason += ` · Ajustado para ${employees} empleados`;
        } else {
            if (budget === 'low') reason = `Most affordable option for ${mod.name}`;
            else if (budget === 'high') reason = `Maximum capacity for ${mod.name}`;
            else reason = `Best value for ${mod.name}`;
            if (employees > 10) reason += ` · Adjusted for ${employees} employees`;
        }

        recommendations.push({
            module: mod.name,
            plan: selectedPlan.name,
            price: selectedPlan.price,
            reason,
        });
    }

    const individualTotal = recommendations.reduce((sum, r) => sum + r.price, 0);

    let comboRecommendation: { name: string; price: number; savings: number } | null = null;
    if (selectedModules.length >= 3) {
        let comboPlan;
        if (budget === 'low') comboPlan = COMBO_PLANS[1];
        else if (budget === 'high') comboPlan = COMBO_PLANS[3];
        else comboPlan = COMBO_PLANS[2];

        if (employees > 20 && budget !== 'high') {
            comboPlan = COMBO_PLANS[3];
        }

        const comboPrice = comboPlan.annualPrice;
        const savings = individualTotal - comboPrice;

        if (savings > 0) {
            comboRecommendation = {
                name: comboPlan.name,
                price: comboPrice,
                savings,
            };
        }
    }

    const summary = isEs
        ? selectedModules.length >= 3 && comboRecommendation
            ? `Para tu empresa de ${employees} empleados, recomendamos el plan ${comboRecommendation.name} (combo). Ahorras $${comboRecommendation.savings}/mes vs. módulos individuales. Incluye todos los módulos seleccionados con funcionalidades optimizadas para tu tamaño de empresa.`
            : `Para tu empresa de ${employees} empleados, la mejor opción son módulos individuales. Total estimado: $${individualTotal}/mes. Cada módulo se adapta exactamente a lo que necesitas sin pagar de más.`
        : selectedModules.length >= 3 && comboRecommendation
            ? `For your ${employees}-employee company, we recommend the ${comboRecommendation.name} plan (combo). You save $${comboRecommendation.savings}/mo vs. individual modules. Includes all selected modules optimized for your company size.`
            : `For your ${employees}-employee company, individual modules are the best option. Estimated total: $${individualTotal}/mo. Each module fits exactly what you need without overpaying.`;

    return {
        recommendations,
        individualTotal,
        comboRecommendation,
        summary,
        selectedCount: selectedModules.length,
    };
}

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const result = generateBudget(body);
        return NextResponse.json(result);
    } catch {
        return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
    }
}
