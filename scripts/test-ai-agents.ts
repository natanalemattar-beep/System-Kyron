import "dotenv/config";
import { customerServiceAgent } from "./src/lib/ai/agents/customer-service";
import { dashboardAgent } from "./src/lib/ai/agents/dashboard";
import { documentGeneratorAgent } from "./src/lib/ai/agents/document-generator";
import { documentAnalyzerAgent } from "./src/lib/ai/agents/document-analyzer";
import { marketingAgent } from "./src/lib/ai/agents/marketing";
import { analysisAgent } from "./src/lib/ai/agents/analysis";
import { getKeyStatus } from "./src/lib/ai/key-manager";

const GREEN = "\x1b[32m";
const RED = "\x1b[31m";
const YELLOW = "\x1b[33m";
const BLUE = "\x1b[34m";
const RESET = "\x1b[0m";
const BOLD = "\x1b[1m";

let passCount = 0;
let failCount = 0;

function log(section: string, msg: string, color = RESET) {
  console.log(`\n${BOLD}${color}═══ ${section} ══${RESET}`);
  console.log(`${color}${msg}${RESET}`);
}

function pass(test: string) {
  passCount++;
  console.log(`  ${GREEN}✓${RESET} ${test}`);
}

function fail(test: string, err: string) {
  failCount++;
  console.log(`  ${RED}✗${RESET} ${test}`);
  if (err) console.log(`    ${RED}Error: ${err.substring(0, 200)}${RESET}`);
}

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function testCustomerService() {
  log("AGENTE 1: ATENCIÓN AL CLIENTE", "Escenario: Cliente empresarial con facturas vencidas", BLUE);

  try {
    const actions = await customerServiceAgent.analyzeCustomer({
      customerId: "EMP-2024-0847",
      customerName: "Distribuidora El Progreso C.A.",
      accountStatus: "active",
      pendingInvoices: 3,
      overdueInvoices: 2,
      pendingDocuments: 1,
      lastActivity: "2026-05-10",
      plan: "enterprise",
      advisorId: "ADV-042",
    });

    if (Array.isArray(actions) && actions.length > 0) {
      pass(`Generó ${actions.length} acciones proactivas`);
      actions.forEach((a) => {
        console.log(`    ${YELLOW}[${a.priority.toUpperCase()}]${RESET} ${a.type}: ${a.reason || a.content?.substring(0, 60)}`);
      });
    } else {
      fail("Respuesta vacía", "No generó acciones");
    }
  } catch (e: any) {
    fail("Test completo", e.message);
  }

  try {
    const email = await customerServiceAgent.generateEmail(
      {
        customerId: "EMP-2024-0847",
        customerName: "Distribuidora El Progreso C.A.",
        accountStatus: "active",
        pendingInvoices: 2,
        overdueInvoices: 2,
        pendingDocuments: 0,
        lastActivity: "2026-05-10",
        plan: "enterprise",
      },
      "Recordatorio de facturas vencidas por 15 días"
    );
    if (email && email.length > 50) {
      pass("Email generado correctamente");
      console.log(`    ${YELLOW}Preview:${RESET} ${email.substring(0, 120)}...`);
    } else {
      fail("Email", "Respuesta muy corta o vacía");
    }
  } catch (e: any) {
    fail("Email test", e.message);
  }
}

async function testDashboard() {
  log("AGENTE 2: DASHBOARD AI", "Escenario: Métricas mensuales con anomalías", BLUE);

  const metrics = [
    { name: "Ingresos", value: 45000, previousValue: 38000, unit: "USD", period: "Mayo 2026" },
    { name: "Gastos operativos", value: 32000, previousValue: 28000, unit: "USD", period: "Mayo 2026" },
    { name: "Margen neto", value: 18.5, previousValue: 22.1, unit: "%", period: "Mayo 2026" },
    { name: "Clientes activos", value: 234, previousValue: 198, unit: "count", period: "Mayo 2026" },
    { name: "Tasa de churn", value: 8.2, previousValue: 4.1, unit: "%", period: "Mayo 2026" },
    { name: "Ticket promedio", value: 1520, previousValue: 1480, unit: "USD", period: "Mayo 2026" },
  ];

  try {
    const insights = await dashboardAgent.generateInsights(metrics);
    if (Array.isArray(insights) && insights.length >= 4) {
      pass(`Generó ${insights.length} insights`);
      insights.forEach((i) => {
        console.log(`    ${i.trend === "up" ? GREEN : i.trend === "down" ? RED : YELLOW}${i.trend}${RESET} ${i.metric}: ${i.insight?.substring(0, 80)}`);
      });
    } else {
      fail("Insights", `Solo generó ${insights?.length || 0} insights`);
    }
  } catch (e: any) {
    fail("Insights test", e.message);
  }

  try {
    const summary = await dashboardAgent.generateSummary(metrics);
    if (summary && summary.length > 30) {
      pass("Resumen ejecutivo generado");
      console.log(`    ${YELLOW}${summary}${RESET}`);
    } else {
      fail("Resumen", "Muy corto o vacío");
    }
  } catch (e: any) {
    fail("Summary test", e.message);
  }

  try {
    const anomalies = await dashboardAgent.detectAnomalies(metrics);
    if (Array.isArray(anomalies)) {
      pass(`Detectó ${anomalies.length} anomalías`);
      anomalies.forEach((a) => console.log(`    ${RED}⚠${RESET} ${a}`));
    }
  } catch (e: any) {
    fail("Anomalies test", e.message);
  }
}

async function testDocumentGenerator() {
  log("AGENTE 3: GENERADOR DE DOCUMENTOS", "Escenario: Factura y contrato empresarial", BLUE);

  try {
    const invoice = await documentGeneratorAgent.generateInvoice({
      clientName: "Inversiones del Caribe S.A.",
      clientTaxId: "J-40123456-7",
      items: [
        { description: "Consultoría financiera Q2 2026", quantity: 1, unitPrice: 5000 },
        { description: "Auditoría de estados financieros", quantity: 1, unitPrice: 3500 },
        { description: "Asesoría tributaria mensual", quantity: 3, unitPrice: 800 },
      ],
      dueDate: "2026-06-15",
      currency: "USD",
    });

    const content = invoice.content || Object.values(invoice).find((v) => typeof v === "string" && v.length > 100) as string;
    if (content && content.length > 50) {
      pass("Factura generada correctamente");
      console.log(`    ${YELLOW}Tipo:${RESET} ${invoice.documentType}`);
      console.log(`    ${YELLOW}Preview:${RESET} ${content.substring(0, 150)}...`);
    } else {
      fail("Factura", "Contenido insuficiente");
    }
  } catch (e: any) {
    fail("Invoice test", e.message);
  }

  try {
    const contract = await documentGeneratorAgent.generateContract({
      partyA: "System Kyron C.A.",
      partyB: "TechSolutions 2026 LLC",
      serviceType: "Desarrollo de plataforma SaaS con integración de IA",
      duration: "12 meses renovables",
      amount: "120,000",
      currency: "USD",
    });

    const content = contract.content || Object.values(contract).find((v) => typeof v === "string" && v.length > 200) as string;
    if (content && content.length > 200) {
      pass("Contrato generado correctamente");
      console.log(`    ${YELLOW}Longitud:${RESET} ${content.length} caracteres`);
    } else {
      fail("Contrato", "Contenido insuficiente");
    }
  } catch (e: any) {
    fail("Contract test", e.message);
  }
}

async function testDocumentAnalyzer() {
  log("AGENTE 4: ANALIZADOR DE DOCUMENTOS", "Escenario: Factura con datos sospechosos", BLUE);

  const suspiciousInvoice = `
FACTURA N° FAC-2026-00847
Fecha: 15/05/2026
Proveedor: Servicios Técnicos ABC, RIF: J-12345678-9
Cliente: Distribuidora El Progreso C.A., RIF: J-40123456-7

CONCEPTO:
- Reparación de equipos industriales: $45,000.00
- Repuestos varios: $12,500.00
- Mano de obra especializada: $8,200.00

SUBTOTAL: $65,700.00
IVA (16%): $10,512.00
TOTAL: $76,212.00

CONDICIONES: Pago inmediato. Sin garantía escrita.
OBSERVACIONES: Precio negociado directamente con gerente.
  `;

  try {
    const analysis = await documentAnalyzerAgent.analyzeDocument(suspiciousInvoice, "factura");
    if (analysis && (analysis.extractedData || analysis.documentType || analysis.summary)) {
      pass("Análisis completado");
      console.log(`    ${YELLOW}Tipo:${RESET} ${analysis.documentType}`);
      console.log(`    ${YELLOW}Confianza:${RESET} ${(analysis.confidence * 100).toFixed(0)}%`);
      console.log(`    ${YELLOW}Cumplimiento:${RESET} ${analysis.compliance}`);
      if (analysis.anomalies && analysis.anomalies.length > 0) {
        console.log(`    ${RED}Anomalías:${RESET}`);
        analysis.anomalies.forEach((a) => console.log(`      - ${a}`));
      }
      if (analysis.summary) {
        console.log(`    ${YELLOW}Resumen:${RESET} ${analysis.summary.substring(0, 100)}...`);
      }
    } else {
      fail("Análisis", "Sin resultados");
    }
  } catch (e: any) {
    fail("Document analysis test", e.message);
  }

  try {
    const extracted = await documentAnalyzerAgent.extractKeyData(suspiciousInvoice);
    if (extracted && Object.keys(extracted).length > 3) {
      pass(`Extrajo ${Object.keys(extracted).length} campos`);
      Object.entries(extracted).slice(0, 5).forEach(([k, v]) => {
        const display = typeof v === "object" ? JSON.stringify(v).substring(0, 60) : String(v).substring(0, 60);
        console.log(`    ${YELLOW}${k}:${RESET} ${display}`);
      });
    } else {
      fail("Extracción", "Pocos campos extraídos");
    }
  } catch (e: any) {
    fail("Extract test", e.message);
  }
}

async function testMarketing() {
  log("AGENTE 5: MARKETING AI", "Escenario: Lanzamiento de producto SaaS B2B", BLUE);

  const request = {
    product: "System Kyron - Plataforma de gestión empresarial con IA",
    targetAudience: "Dueños de PYMES y gerentes financieros en Latinoamérica",
    goal: "Generar leads calificados para demo gratuita",
    tone: "professional" as const,
    language: "es",
    platform: "linkedin" as const,
  };

  try {
    const content = await marketingAgent.generateContent(request);
    if (content && (content.content || content.variants?.length > 0)) {
      pass("Contenido generado");
      console.log(`    ${YELLOW}CTA:${RESET} ${content.cta}`);
      console.log(`    ${YELLOW}Keywords:${RESET} ${content.keywords?.join(", ")}`);
      console.log(`    ${YELLOW}Variants:${RESET} ${content.variants?.length || 0} generadas`);
    } else {
      fail("Contenido", "Respuesta incompleta");
    }
  } catch (e: any) {
    fail("Content test", e.message);
  }

  try {
    const posts = await marketingAgent.generateSocialPosts(request, 3);
    if (Array.isArray(posts) && posts.length === 3) {
      pass("3 posts para redes generados");
      posts.forEach((p, i) => console.log(`    ${YELLOW}Post ${i + 1}:${RESET} ${p.substring(0, 80)}...`));
    } else {
      fail("Posts", `Solo generó ${posts?.length || 0}`);
    }
  } catch (e: any) {
    fail("Social posts test", e.message);
  }

  try {
    const email = await marketingAgent.generateEmailCampaign(request, "sales");
    if (email && email.subject && email.body) {
      pass("Email campaign generado");
      console.log(`    ${YELLOW}Subject:${RESET} ${email.subject}`);
      console.log(`    ${YELLOW}Preview:${RESET} ${email.preview}`);
    } else {
      fail("Email campaign", "Faltan campos");
    }
  } catch (e: any) {
    fail("Email campaign test", e.message);
  }
}

async function testAnalysis() {
  log("AGENTE 6: ANÁLISIS AI", "Escenario: Análisis financiero de empresa en crisis", BLUE);

  const financialData = `
Empresa: Manufacturas del Centro C.A.
Período: Enero - Mayo 2026

INGRESOS:
Enero: $120,000 | Febrero: $95,000 | Marzo: $78,000 | Abril: $62,000 | Mayo: $45,000

GASTOS OPERATIVOS:
Enero: $85,000 | Febrero: $88,000 | Marzo: $92,000 | Abril: $95,000 | Mayo: $98,000

DEUDAS:
Préstamo bancario: $450,000 (tasa 12% anual)
Proveedores pendientes: $180,000
Nómina atrasada: 2 meses ($65,000)

ACTIVOS:
Inventario: $200,000 (30% obsoleto)
Maquinaria: $350,000 (valor depreciado)
Cuentas por cobrar: $120,000 (40% > 90 días)

EMPLEADOS: 45 (reducción de 60 en 12 meses)
  `;

  try {
    const swot = await analysisAgent.swotAnalysis(financialData);
    if (swot && swot.strengths && swot.weaknesses) {
      pass("Análisis FODA completado");
      console.log(`    ${GREEN}Fortalezas (${swot.strengths.length}):${RESET} ${swot.strengths.slice(0, 2).join(", ")}`);
      console.log(`    ${RED}Debilidades (${swot.weaknesses.length}):${RESET} ${swot.weaknesses.slice(0, 2).join(", ")}`);
      console.log(`    ${BLUE}Oportunidades (${swot.opportunities?.length || 0}):${RESET} ${swot.opportunities?.slice(0, 2).join(", ")}`);
      console.log(`    ${YELLOW}Amenazas (${swot.threats?.length || 0}):${RESET} ${swot.threats?.slice(0, 2).join(", ")}`);
    } else {
      fail("FODA", "Estructura incompleta");
    }
  } catch (e: any) {
    fail("SWOT test", e.message);
  }

  try {
    const risk = await analysisAgent.riskAnalysis(financialData);
    if (risk && risk.findings) {
      pass("Análisis de riesgos completado");
      console.log(`    ${YELLOW}Score:${RESET} ${risk.score}/100`);
      const risksList = Array.isArray(risk.risks) ? risk.risks : Object.values(risk.risks || {}).flat();
      console.log(`    ${RED}Riesgos:${RESET}`);
      risksList.slice(0, 3).forEach((r: any) => console.log(`      - ${typeof r === "string" ? r.substring(0, 100) : JSON.stringify(r).substring(0, 100)}`));
    } else {
      fail("Risk analysis", "Sin resultados");
    }
  } catch (e: any) {
    fail("Risk test", e.message);
  }

  try {
    const financial = await analysisAgent.financialAnalysis(financialData);
    if (financial && financial.findings) {
      pass("Análisis financiero completado");
      console.log(`    ${YELLOW}Score:${RESET} ${financial.score}/100`);
      const steps = Array.isArray(financial.nextSteps) ? financial.nextSteps : Object.values(financial.nextSteps || {}).flat();
      console.log(`    ${YELLOW}Próximos pasos:${RESET}`);
      steps.slice(0, 3).forEach((s: any) => console.log(`      → ${typeof s === "string" ? s.substring(0, 100) : JSON.stringify(s).substring(0, 100)}`));
    } else {
      fail("Financial analysis", "Sin resultados");
    }
  } catch (e: any) {
    fail("Financial test", e.message);
  }
}

async function main() {
  console.log(`\n${BOLD}${BLUE}╔══════════════════════════════════════════════════════════╗${RESET}`);
  console.log(`${BOLD}${BLUE}║         TESTS DE AGENTES AI - SYSTEM KYRON                ║${RESET}`);
  console.log(`${BOLD}${BLUE}║         Escenarios empresariales reales - V2              ║${RESET}`);
  console.log(`${BOLD}${BLUE}╚══════════════════════════════════════════════════════════╝${RESET}\n`);

  const start = Date.now();

  await testCustomerService();
  await sleep(15000);
  await testDashboard();
  await sleep(15000);
  await testDocumentGenerator();
  await sleep(15000);
  await testDocumentAnalyzer();
  await sleep(15000);
  await testMarketing();
  await sleep(15000);
  await testAnalysis();

  const elapsed = ((Date.now() - start) / 1000).toFixed(1);
  const status = getKeyStatus();

  console.log(`\n${BOLD}${GREEN}══════════════════════════════════════════════════════════${RESET}`);
  console.log(`${BOLD}Tests completados en ${elapsed}s${RESET}`);
  console.log(`${BOLD}${GREEN}✓ Pasaron: ${passCount}${RESET} | ${BOLD}${RED} Fallaron: ${failCount}${RESET}`);
  console.log(`${BOLD}Keys status: ${status.map((k) => (k.cooldown ? "🔴" : "🟢")).join(" ")}${RESET}`);
  console.log(`${BOLD}${GREEN}══════════════════════════════════════════════════════════${RESET}\n`);
}

main().catch((e) => {
  console.error(`${RED}FATAL:${RESET} ${e.message}`);
  process.exit(1);
});
