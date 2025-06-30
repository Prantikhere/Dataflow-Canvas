import { config } from 'dotenv';
config();

import '@/ai/flows/generate-etl-job-config.ts';
import '@/ai/flows/summarize-job-history.ts';
import '@/ai/flows/suggest-next-transformation-step.ts';