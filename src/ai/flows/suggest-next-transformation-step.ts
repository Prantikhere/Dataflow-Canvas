// src/ai/flows/suggest-next-transformation-step.ts
'use server';
/**
 * @fileOverview This file defines a Genkit flow for suggesting the next transformation step in an ETL workflow.
 *
 * - suggestNextTransformationStep - A function that suggests the next transformation step.
 * - SuggestNextTransformationStepInput - The input type for the suggestNextTransformationStep function.
 * - SuggestNextTransformationStepOutput - The return type for the suggestNextTransformationStep function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SuggestNextTransformationStepInputSchema = z.object({
  currentWorkflow: z
    .string()
    .describe('The current ETL workflow represented as a string.'),
  availableMetadata: z
    .string()
    .describe(
      'Available metadata about the data, including table names, column mappings, and transformation rules.'
    ),
});
export type SuggestNextTransformationStepInput = z.infer<
  typeof SuggestNextTransformationStepInputSchema
>;

const SuggestNextTransformationStepOutputSchema = z.object({
  suggestedStep: z
    .string()
    .describe('The next logical transformation step to take.'),
  rationale: z
    .string()
    .describe(
      'The rationale for suggesting this particular transformation step.'
    ),
});
export type SuggestNextTransformationStepOutput = z.infer<
  typeof SuggestNextTransformationStepOutputSchema
>;

export async function suggestNextTransformationStep(
  input: SuggestNextTransformationStepInput
): Promise<SuggestNextTransformationStepOutput> {
  return suggestNextTransformationStepFlow(input);
}

const prompt = ai.definePrompt({
  name: 'suggestNextTransformationStepPrompt',
  input: {schema: SuggestNextTransformationStepInputSchema},
  output: {schema: SuggestNextTransformationStepOutputSchema},
  prompt: `You are an expert data engineer. Given the current ETL workflow and available metadata, suggest the next logical transformation step and explain your reasoning.\n\nCurrent Workflow:\n{{currentWorkflow}}\n\nAvailable Metadata:\n{{availableMetadata}}\n\nSuggest the next transformation step and provide a rationale for your suggestion. Return the result as a JSON object with 'suggestedStep' and 'rationale' fields.`,
});

const suggestNextTransformationStepFlow = ai.defineFlow(
  {
    name: 'suggestNextTransformationStepFlow',
    inputSchema: SuggestNextTransformationStepInputSchema,
    outputSchema: SuggestNextTransformationStepOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
