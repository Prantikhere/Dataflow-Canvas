import type { EtlJob, TransformationStep } from "@/lib/types";
import { WorkflowStepComponent } from "./workflow-step";
import { ArrowRight, Wind } from "lucide-react";
import { ScrollArea, ScrollBar } from "../ui/scroll-area";

interface WorkflowCanvasProps {
  job: EtlJob;
  setSelectedStep: (step: TransformationStep | null) => void;
  selectedStep: TransformationStep | null;
}

export function WorkflowCanvas({ job, setSelectedStep, selectedStep }: WorkflowCanvasProps) {
  if (!job.steps || job.steps.length === 0) {
    return (
      <div className="flex-1 flex items-center justify-center rounded-lg border-2 border-dashed bg-card/50">
        <div className="text-center">
          <Wind className="mx-auto h-12 w-12 text-muted-foreground" />
          <h3 className="mt-4 text-lg font-semibold">Your workflow is empty</h3>
          <p className="text-muted-foreground">Use the input above to generate a workflow with AI.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col p-4 rounded-lg bg-card/50 border">
       <div className="mb-6">
        <h2 className="text-2xl font-bold tracking-tight">{job.name}</h2>
        <p className="text-muted-foreground">{job.description}</p>
       </div>
      <ScrollArea className="w-full whitespace-nowrap">
        <div className="flex items-center gap-4 pb-4">
          {job.steps.map((step, index) => (
            <div key={step.id} className="flex items-center gap-4">
              <WorkflowStepComponent 
                step={step} 
                onClick={() => setSelectedStep(step)}
                isSelected={selectedStep?.id === step.id}
              />
              {index < job.steps.length - 1 && (
                <ArrowRight className="h-8 w-8 text-muted-foreground shrink-0" />
              )}
            </div>
          ))}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
  );
}
