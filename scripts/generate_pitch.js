const pptxgen = require('pptxgenjs');
let pres = new pptxgen();

pres.layout = 'LAYOUT_16x9';

// Slide 1
let slide1 = pres.addSlide();
slide1.background = { color: "0F172A" }; // Slate 900
slide1.addText("SYSTEM KYRON", { x: 1, y: 2, w: '80%', fontSize: 60, color: "FFFFFF", bold: true });
slide1.addText("Innovación, seguridad y cumplimiento en un solo ecosistema.", { x: 1, y: 3.5, w: '80%', fontSize: 24, color: "3B82F6" });
slide1.addText("Presentado por Carlos Mattar | Reto InspiraVe 2026", { x: 1, y: 6, w: '80%', fontSize: 16, color: "94A3B8" });

// Slide 2
let slide2 = pres.addSlide();
slide2.background = { color: "0F172A" };
slide2.addText("El Reto de la Informalidad y la Inseguridad", { x: 0.5, y: 0.5, w: '90%', fontSize: 36, color: "FFFFFF", bold: true });
slide2.addText(
    "• Las Pymes y Startups en Venezuela enfrentan procesos manuales y complejos.\n\n" +
    "• Falta de plataformas seguras para proteger datos y propiedad intelectual.\n\n" +
    "• Consecuencia: Crecimiento estancado y vulnerabilidad digital.",
    { x: 0.5, y: 1.8, w: '90%', fontSize: 22, color: "CBD5E1", bullet: true }
);

// Slide 3
let slide3 = pres.addSlide();
slide3.background = { color: "0F172A" };
slide3.addText("System Kyron: La Solución Integral", { x: 0.5, y: 0.5, w: '90%', fontSize: 36, color: "FFFFFF", bold: true });
slide3.addText(
    "Plataforma web B2B que centraliza la operatividad diaria y facilita la formalización legal (SAPI/RNE).",
    { x: 0.5, y: 1.5, w: '90%', fontSize: 20, color: "3B82F6", bold: true }
);
slide3.addText(
    "• Operatividad: Gestión administrativa y encuestas de calidad.\n\n" +
    "• Formalización: Base tecnológica preparada para certificaciones.\n\n" +
    "• El Valor: Tranquilidad operativa y blindaje total de los datos.",
    { x: 0.5, y: 2.8, w: '90%', fontSize: 22, color: "CBD5E1", bullet: true }
);

// Slide 4
let slide4 = pres.addSlide();
slide4.background = { color: "0F172A" };
slide4.addText("Innovación Bajo el Capó", { x: 0.5, y: 0.5, w: '90%', fontSize: 36, color: "FFFFFF", bold: true });
slide4.addText(
    "• Autenticación criptográfica ('Blind Index').\n\n" +
    "• Arquitectura en la nube ultrarrápida (desplegada en Vercel).\n\n" +
    "• Sistema propietario 'PasswordGate' para control de accesos.",
    { x: 0.5, y: 1.8, w: '90%', fontSize: 22, color: "CBD5E1", bullet: true }
);

// Slide 5
let slide5 = pres.addSlide();
slide5.background = { color: "0F172A" };
slide5.addText("Viabilidad y Modelo de Negocio", { x: 0.5, y: 0.5, w: '90%', fontSize: 36, color: "FFFFFF", bold: true });
slide5.addText("Modelo SaaS B2B enfocado en ecosistemas de emprendimiento.", { x: 0.5, y: 1.5, w: '90%', fontSize: 20, color: "3B82F6", bold: true });
slide5.addText(
    "• Suscripciones (Tiers): Planes mensuales/anuales según capacidad.\n\n" +
    "• Setup Fee: Integración y onboarding personalizado.\n\n" +
    "• Escalabilidad: Infraestructura lista para soportar 10,000 Pymes.",
    { x: 0.5, y: 2.8, w: '90%', fontSize: 22, color: "CBD5E1", bullet: true }
);

// Slide 6
let slide6 = pres.addSlide();
slide6.background = { color: "0F172A" };
slide6.addText("Impacto Social", { x: 0.5, y: 0.5, w: '90%', fontSize: 36, color: "FFFFFF", bold: true });
slide6.addText(
    "• Reducimos drásticamente la informalidad empresarial en Venezuela.\n\n" +
    "• Educamos a los emprendedores en protección de datos legales.\n\n" +
    "• Creamos una economía digital transparente y segura.",
    { x: 0.5, y: 1.8, w: '90%', fontSize: 22, color: "CBD5E1", bullet: true }
);

// Slide 7
let slide7 = pres.addSlide();
slide7.background = { color: "0F172A" };
slide7.addText("Estado Actual y Hoja de Ruta", { x: 0.5, y: 0.5, w: '90%', fontSize: 36, color: "FFFFFF", bold: true });
slide7.addText("Hitos Logrados:", { x: 0.5, y: 1.5, w: '90%', fontSize: 22, color: "3B82F6", bold: true });
slide7.addText(
    "• Plataforma estable desplegada en producción.\n\n" +
    "• RIF corporativo formalizado (J-50832149-9).\n\n" +
    "• Exoneración y registro completado ante el SAPI.",
    { x: 0.5, y: 2.2, w: '90%', fontSize: 20, color: "CBD5E1", bullet: true }
);
slide7.addText("Próximos 6 meses:", { x: 0.5, y: 4.8, w: '90%', fontSize: 22, color: "10B981", bold: true });
slide7.addText(
    "• Adquirir e integrar nuestros primeros 10 clientes piloto.\n\n" +
    "• Consolidar alianzas estratégicas con 2 incubadoras clave.",
    { x: 0.5, y: 5.5, w: '90%', fontSize: 20, color: "CBD5E1", bullet: true }
);

pres.writeFile({ fileName: 'Presentacion_Final_System_Kyron.pptx' }).then(fileName => {
    console.log('EXITO: El archivo PowerPoint ha sido generado en: ' + fileName);
});
