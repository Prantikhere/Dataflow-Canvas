'use client'
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { JobHistoryEntry, TransformationStep } from "@/lib/types";
import { Button } from "../ui/button";
import { summarizeJobHistory } from "@/ai/flows/summarize-job-history";
import { ScrollArea } from '../ui/scroll-area';
import { Badge } from '../ui/badge';
import { Bot, X } from 'lucide-react';
import { Skeleton } from '../ui/skeleton';

interface JobDetailsPanelProps {
  selectedStep: TransformationStep | null;
  setSelectedStep: (step: TransformationStep | null) => void;
  jobHistory: JobHistoryEntry[];
}

export function JobDetailsPanel({ selectedStep, jobHistory, setSelectedStep }: JobDetailsPanelProps) {
  const [historySummary, setHistorySummary] = useState('');
  const [isSummarizing, setIsSummarizing] = useState(false);

  const handleSummarize = async () => {
    setIsSummarizing(true);
    setHistorySummary('');
    try {
        const fullHistory = jobHistory.map(h => `Version ${h.version} (${h.timestamp}) by ${h.author}: ${h.changes} - Status: ${h.status}`).join('\n');
        const result = await summarizeJobHistory({ jobHistory: fullHistory });
        setHistorySummary(result.summary);
    } catch(e) {
        console.error("Failed to summarize history", e);
        setHistorySummary("Could not generate summary.");
    } finally {
        setIsSummarizing(false);
    }
  }

  if (!selectedStep) {
    return (
      <aside className="hidden lg:flex flex-col w-96 bg-card border-l items-center justify-center text-center p-8">
        <div className="flex flex-col items-center justify-center h-full text-center p-8">
            <h3 className="text-lg font-semibold">Select a step</h3>
            <p className="text-muted-foreground">Click on a step in the workflow to see its details and configuration.</p>
        </div>
      </aside>
    );
  }

  return (
    <aside className="hidden lg:flex flex-col w-96 bg-card border-l">
      <div className="p-4 border-b flex justify-between items-center">
        <h2 className="text-xl font-semibold">Details</h2>
        <Button variant="ghost" size="icon" onClick={() => setSelectedStep(null)}>
            <X className="h-5 w-5" />
        </Button>
      </div>
      <ScrollArea className="flex-1">
        <div className="p-4">
            <Tabs defaultValue="config" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="config">Configuration</TabsTrigger>
                <TabsTrigger value="history">History</TabsTrigger>
            </TabsList>
            <TabsContent value="config" className="mt-4">
                <Card>
                <CardHeader>
                    <CardTitle>{selectedStep.name}</CardTitle>
                    <CardDescription>{selectedStep.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <h4 className="font-semibold">Details</h4>
                    <div className="text-sm space-y-2 rounded-md border p-3">
                    {Object.entries(selectedStep.details).map(([key, value]) => (
                        <div key={key} className="flex justify-between items-center">
                            <span className="text-muted-foreground capitalize">{key.replace(/_/g, ' ')}</span>
                            <span className="font-mono text-xs bg-secondary px-2 py-1 rounded-md">{value}</span>
                        </div>
                    ))}
                    </div>
                </CardContent>
                </Card>
            </TabsContent>
            <TabsContent value="history" className="mt-4">
                <Card>
                <CardHeader>
                    <CardTitle>Job History</CardTitle>
                    <CardDescription>Review past changes and executions.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <Button onClick={handleSummarize} disabled={isSummarizing} className="w-full">
                        <Bot className="mr-2 h-4 w-4" />
                        {isSummarizing ? 'Summarizing...' : 'Summarize with AI'}
                    </Button>
                    {isSummarizing && (
                         <div className="p-3 rounded-md bg-secondary space-y-2">
                            <Skeleton className="h-4 w-1/4" />
                            <Skeleton className="h-4 w-full" />
                            <Skeleton className="h-4 w-3/4" />
                         </div>
                    )}
                    {historySummary && !isSummarizing && (
                        <div className="p-3 rounded-md bg-secondary text-sm space-y-2">
                            <h4 className="font-semibold">AI Summary</h4>
                            <p className="text-secondary-foreground leading-relaxed">{historySummary}</p>
                        </div>
                    )}
                    <ul className="space-y-4">
                    {jobHistory.slice().reverse().map(entry => (
                        <li key={entry.id} className="text-sm border-l-2 pl-3 -ml-4" style={{borderColor: entry.status === 'Success' ? 'hsl(var(--success))' : 'hsl(var(--destructive))'}}>
                            <div className="flex justify-between items-center">
                                <p className="font-medium">Version {entry.version}</p>
                                <Badge variant={entry.status === 'Success' ? 'success' : entry.status === 'Failed' ? 'destructive' : 'secondary'}>{entry.status}</Badge>
                            </div>
                            <p className="text-muted-foreground text-xs">{new Date(entry.timestamp).toLocaleString()}</p>
                            <p className="mt-1">{entry.changes}</p>
                        </li>
                    ))}
                    </ul>
                </CardContent>
                </Card>
            </TabsContent>
            </Tabs>
        </div>
      </ScrollArea>
    </aside>
  );
}
