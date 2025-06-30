// src/ai/flows/generate-etl-job-config.ts
'use server';
/**
 * @fileOverview This file defines a Genkit flow for generating ETL job configurations from natural language descriptions.
 *
 * - generateEtlJobConfig - A function that takes a natural language description of ETL requirements and returns a job configuration.
 * - GenerateEtlJobConfigInput - The input type for the generateEtlJobConfig function.
 * - GenerateEtlJobConfigOutput - The return type for the generateEtlJobConfig function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateEtlJobConfigInputSchema = z.object({
  description: z
    .string()
    .describe('A natural language description of the ETL requirements.'),
});

export type GenerateEtlJobConfigInput = z.infer<
  typeof GenerateEtlJobConfigInputSchema
>;

const GenerateEtlJobConfigOutputSchema = z.object({
  jobConfig: z
    .string()
    .describe(
      'The generated ETL job configuration in JSON format, including source and target table names, transformation rules, and column mappings.'
    ),
});

export type GenerateEtlJobConfigOutput = z.infer<
  typeof GenerateEtlJobConfigOutputSchema
>;

export async function generateEtlJobConfig(
  input: GenerateEtlJobConfigInput
): Promise<GenerateEtlJobConfigOutput> {
  return generateEtlJobConfigFlow(input);
}

const generateEtlJobConfigPrompt = ai.definePrompt({
  name: 'generateEtlJobConfigPrompt',
  input: {schema: GenerateEtlJobConfigInputSchema},
  output: {schema: GenerateEtlJobConfigOutputSchema},
  prompt: `You are an expert data engineer specializing in ETL (Extract, Transform, Load) processes.

You will receive a natural language description of ETL requirements and generate a JSON configuration for the job.

The JSON configuration should include source and target table names, transformation rules, and column mappings.

Description: {{{description}}}

Ensure the generated JSON is valid and well-structured.

Your response should ONLY contain valid JSON. Do not include any other text. No intro, no explanation, no comments, nothing but valid JSON.
`,
});

const generateEtlJobConfigFlow = ai.defineFlow(
  {
    name: 'generateEtlJobConfigFlow',
    inputSchema: GenerateEtlJobConfigInputSchema,
    outputSchema: GenerateEtlJobConfigOutputSchema,
  },
  async input => {
    const {output} = await generateEtlJobConfigPrompt(input);
    return output!;
  }
);
