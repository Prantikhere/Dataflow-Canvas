// Summarizes the history of ETL jobs and configurations to provide an overview of changes and aid in debugging.

'use server';

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SummarizeJobHistoryInputSchema = z.object({
  jobHistory: z
    .string()
    .describe('The complete history of ETL jobs, including configurations, execution times, and status logs.'),
});
export type SummarizeJobHistoryInput = z.infer<typeof SummarizeJobHistoryInputSchema>;

const SummarizeJobHistoryOutputSchema = z.object({
  summary: z
    .string()
    .describe('A concise summary of the ETL job history, highlighting key changes, successes, and failures.'),
});
export type SummarizeJobHistoryOutput = z.infer<typeof SummarizeJobHistoryOutputSchema>;

export async function summarizeJobHistory(input: SummarizeJobHistoryInput): Promise<SummarizeJobHistoryOutput> {
  return summarizeJobHistoryFlow(input);
}

const prompt = ai.definePrompt({
  name: 'summarizeJobHistoryPrompt',
  input: {schema: SummarizeJobHistoryInputSchema},
  output: {schema: SummarizeJobHistoryOutputSchema},
  prompt: `You are an expert data scientist tasked with summarizing ETL job history.

  Given the following ETL job history, provide a concise summary highlighting key changes, successes, and failures.

  Job History:
  {{jobHistory}}
  `,
});

const summarizeJobHistoryFlow = ai.defineFlow(
  {
    name: 'summarizeJobHistoryFlow',
    inputSchema: SummarizeJobHistoryInputSchema,
    outputSchema: SummarizeJobHistoryOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
