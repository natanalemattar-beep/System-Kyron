
'use server';

export type AutomatedDataEntryInput = {
    imageUrl: string;
    targetModule: string;
};

export type AutomatedDataEntryOutput = {
    extractedData: any;
    confidence: number;
    warnings: string[];
};

export async function processDocumentAction(input: AutomatedDataEntryInput): Promise<AutomatedDataEntryOutput | { error: string }> {
  try {
    // MIGRACIÓN A SISTEMA DETERMINISTA: SE REQUIERE INTERVENCIÓN HUMANA
    return {
        extractedData: {
            mensaje: "SISTEMA EN AUDITORÍA DETERMINISTA",
            instruccion: "Por favor, ingrese los datos manualmente mientras se completa la migración del motor de reconocimiento óptico a la arquitectura Kyron Core v3.2."
        },
        confidence: 1,
        warnings: ["Validación manual requerida"]
    };
  } catch (error) {
    console.error("Error processing document:", error);
    return { error: "Hubo un error al procesar la imagen. Por favor intenta de nuevo." };
  }
}
