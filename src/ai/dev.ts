'use client';
import { config } from 'dotenv';
config();

import '@/ai/flows/automated-data-entry-from-image.ts';
import '@/ai/flows/transaction-auto-categorization.ts';
import '@/ai/flows/sentiment-analysis.ts';
import '@/ai/flows/chat.ts';
