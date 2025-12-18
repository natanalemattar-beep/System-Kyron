'use server';

import {
  automatedDataEntry,
  type AutomatedDataEntryInput,
  type AutomatedDataEntryOutput,
} from '@/ai/flows/automated-data-entry-from-image';

export async function processDocumentAction(
  input: AutomatedDataEntryInput
): Promise<AutomatedDataEntryOutput | { error: string }> {
  try {
    const result = await automatedDataEntry(input);
    return result;
  } catch (e: any) {
    console.error(e);
    // Ensure a consistent error object is returned
    const errorMessage = e.message || 'An unknown error occurred while processing the document.';
    return { error: errorMessage };
  }
}
