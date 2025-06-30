export interface TransformationStep {
  id: string;
  name: string;
  type: 'source' | 'transform' | 'sink';
  description: string;
  details: Record<string, string>;
}

export interface JobHistoryEntry {
  id: string;
  version: number;
  timestamp: string;
  status: 'Success' | 'Failed' | 'In Progress';
  author: string;
  changes: string;
}

export interface EtlJob {
  id: string;
  name: string;
  description: string;
  steps: TransformationStep[];
  history: JobHistoryEntry[];
}

export interface Metadata {
  sources: { name: string; icon: React.ElementType; description: string }[];
  transformations: { name: string; icon: React.ElementType; description: string }[];
  sinks: { name: string; icon: React.ElementType; description: string }[];
}
