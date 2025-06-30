'use client';

import { useState } from 'react';
import type { EtlJob, TransformationStep } from '@/lib/types';
import { MOCK_JOB } from '@/lib/mock-data';
import { Header } from '@/components/layout/header';
import { MetadataPanel } from '@/components/panels/metadata-panel';
import { JobDetailsPanel } from '@/components/panels/job-details-panel';
import { WorkflowCanvas } from '@/components/workflow/workflow-canvas';
import { NlForm } from '@/components/nl-form';

export default function Home() {
    const [job, setJob] = useState<EtlJob>(MOCK_JOB);
    const [selectedStep, setSelectedStep] = useState<TransformationStep | null>(null);

    return (
        <div className="flex flex-col h-screen bg-background text-foreground font-body">
            <Header />
            <div className="flex flex-1 overflow-hidden">
                <MetadataPanel />
                <main className="flex-1 flex flex-col p-4 lg:p-6 overflow-y-auto">
                    <NlForm setJob={setJob} />
                    <WorkflowCanvas 
                      job={job} 
                      setSelectedStep={setSelectedStep} 
                      selectedStep={selectedStep} 
                    />
                </main>
                <JobDetailsPanel 
                  selectedStep={selectedStep} 
                  jobHistory={job.history} 
                  setSelectedStep={setSelectedStep}
                />
            </div>
        </div>
    );
}
