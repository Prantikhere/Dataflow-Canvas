'use client';
import { useState } from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { generateEtlJobConfig } from '@/ai/flows/generate-etl-job-config';
import { EtlJob } from '@/lib/types';
import { useToast } from '@/hooks/use-toast';
import { Wand2 } from 'lucide-react';

interface NlFormProps {
  setJob: React.Dispatch<React.SetStateAction<EtlJob>>;
}

export function NlForm({ setJob }: NlFormProps) {
  const [prompt, setPrompt] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt) return;
    setIsLoading(true);
    try {
      const result = await generateEtlJobConfig({ description: prompt });
      const newConfig = JSON.parse(result.jobConfig);
      
      setJob(prev => ({
        ...prev,
        name: newConfig.name || 'Generated Job',
        description: newConfig.description || 'Job generated from natural language prompt.',
        steps: newConfig.steps || [],
        history: [
            ...prev.history,
            {
                id: `hist-${Date.now()}`,
                version: prev.history.length + 1,
                timestamp: new Date().toISOString(),
                status: 'Success',
                author: 'AI Assistant',
                changes: `Generated new configuration from prompt: "${prompt}"`,
            }
        ]
      }));
      toast({
        title: "Workflow Generated",
        description: "The ETL workflow has been updated based on your instructions.",
      });

    } catch (error) {
      console.error("Failed to generate ETL config:", error);
      toast({
        variant: "destructive",
        title: "Generation Failed",
        description: "Could not parse AI response. Please try a different prompt.",
      });
    } finally {
      setIsLoading(false);
      setPrompt('');
    }
  };

  return (
    <Card className="mb-4 shadow-sm border">
      <CardHeader>
        <CardTitle>Describe Your Data Pipeline</CardTitle>
        <CardDescription>
          Use plain English to define the steps of your ETL job. The AI will generate the workflow for you.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <div className="grid w-full gap-4">
            <Textarea 
              placeholder="e.g., 'Extract from the customer table, filter for customers in New York, and save the results to a new `ny_customers` table.'"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              rows={3}
              disabled={isLoading}
            />
            <Button type="submit" disabled={isLoading || !prompt} className="w-full sm:w-auto sm:ml-auto">
              <Wand2 className="mr-2 h-4 w-4" />
              {isLoading ? 'Generating...' : 'Generate Workflow'}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
