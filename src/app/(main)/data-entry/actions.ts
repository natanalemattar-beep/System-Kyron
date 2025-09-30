"use server";

import {
  automatedDataEntry,
  AutomatedDataEntryInput,
  AutomatedDataEntryOutput,
} from "@/ai/flows/automated-data-entry-from-image";

export async function processDocumentAction(
  input: AutomatedDataEntryInput
): Promise<AutomatedDataEntryOutput | { error: string }> {
  try {
    const result = await automatedDataEntry(input);
    return result;
  } catch (e: any) {
    console.error(e);
    return { error: e.message || "An unknown error occurred." };
  }
}
