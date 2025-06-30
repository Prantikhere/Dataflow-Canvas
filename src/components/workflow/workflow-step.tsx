import type { TransformationStep } from "@/lib/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Archive, Cog, Database } from "lucide-react";

interface WorkflowStepProps {
  step: TransformationStep;
  onClick: () => void;
  isSelected: boolean;
}

const ICONS: Record<TransformationStep['type'], React.ElementType> = {
  source: Database,
  transform: Cog,
  sink: Archive,
};

export function WorkflowStepComponent({ step, onClick, isSelected }: WorkflowStepProps) {
  const Icon = ICONS[step.type];

  return (
    <Card 
      className={cn(
        "w-64 shrink-0 cursor-pointer transition-all duration-200 hover:shadow-xl hover:-translate-y-1",
        isSelected ? "ring-2 ring-accent shadow-xl bg-secondary" : "bg-card"
      )}
      onClick={onClick}
    >
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-base font-semibold">{step.name}</CardTitle>
        <Icon className="h-5 w-5 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground line-clamp-2">{step.description}</p>
      </CardContent>
    </Card>
  );
}
