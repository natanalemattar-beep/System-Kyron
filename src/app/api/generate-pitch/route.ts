import { NextRequest, NextResponse } from 'next/server';
import { generatePitchDeck, TemplateStyle, PitchLength } from '@/app/actions/generate-pitch-deck';

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { template = "startup", length = "medium", data = {} } = body;

        if (!template || !length) {
            return NextResponse.json(
                { error: "Faltan parámetros: template y length son requeridos" },
                { status: 400 }
            );
        }

        const buffer = await generatePitchDeck(
            template as TemplateStyle,
            length as PitchLength,
            data
        );

        return new NextResponse(buffer as unknown as BodyInit, {
            headers: {
                'Content-Type': 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
                'Content-Disposition': `attachment; filename="System_Kyron_${template}_${length}.pptx"`,
            },
        });
    } catch (error) {
        console.error("PPTX Generation Error:", error);
        return NextResponse.json(
            { error: "Error al generar el PowerPoint" },
            { status: 500 }
        );
    }
}