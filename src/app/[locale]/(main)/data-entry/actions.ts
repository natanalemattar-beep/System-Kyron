
'use server';

import { automatedDataEntry, type AutomatedDataEntryInput, type AutomatedDataEntryOutput } from "@/ai/flows/automated-data-entry-from-image";

export async function processDocumentAction(input: AutomatedDataEntryInput): Promise<AutomatedDataEntryOutput | { error: string }> {
  try {
    const result = await automatedDataEntry(input);
    return result;
  } catch (error) {
    console.error("Error processing document:", error);
    return { error: "Hubo un error al procesar la imagen. Por favor intenta de nuevo." };
  }
}
