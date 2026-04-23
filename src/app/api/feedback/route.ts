import { NextRequest, NextResponse } from 'next/server';
import { sendEmail, buildKyronEmailTemplate } from '@/lib/email-service';

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { answers } = body;

        if (!answers) {
            return NextResponse.json({ success: false, error: 'Datos de encuesta faltantes' }, { status: 400 });
        }

        // Formatear las respuestas para el correo
        const questionLabels: Record<string, string> = {
            useful_module: "¿Qué módulo te parece más útil?",
            missing_info: "¿Qué información no encontró?",
            improve: "¿Qué mejoraría en diseño/experiencia?",
            recommend: "¿Lo recomendaría? (Rating 1-5)",
            price: "¿Precio dispuesto a pagar?"
        };

        let answersHtml = '<div style="background:#0F172A; border-radius:15px; padding:20px; border:1px solid #1E293B;">';
        for (const [id, value] of Object.entries(answers)) {
            const label = questionLabels[id] || id;
            answersHtml += `
                <div style="margin-bottom:15px; border-bottom:1px solid #1E293B; pb-10px;">
                    <p style="color:#0EA5E9; font-size:11px; font-weight:800; text-transform:uppercase; margin:0 0 5px 0;">${label}</p>
                    <p style="color:#F1F5F9; font-size:14px; font-weight:500; margin:0;">${value}</p>
                </div>
            `;
        }
        answersHtml += '</div>';

        // Construir el correo
        const emailContent = buildKyronEmailTemplate({
            title: "Nueva Encuesta de Satisfacción",
            body: `Se ha recibido una nueva respuesta desde el folleto corporativo (Sector Privado). A continuación los detalles:`,
            footer: answersHtml,
            type: 'general'
        });

        // Enviar a infosystemkyron@gmail.com
        await sendEmail({
            to: 'infosystemkyron@gmail.com',
            subject: '📊 Nueva Respuesta de Encuesta — System Kyron',
            html: emailContent,
            module: 'feedback'
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('[API_FEEDBACK] Error:', error);
        return NextResponse.json({ success: false, error: 'Falla interna al procesar feedback' }, { status: 500 });
    }
}
