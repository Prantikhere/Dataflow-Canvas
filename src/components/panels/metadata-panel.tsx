'use client';
import { useState } from "react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";
import { MOCK_METADATA } from "@/lib/mock-data";
import { Search } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

export function MetadataPanel() {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredMetadata = {
    sources: MOCK_METADATA.sources.filter(item => item.name.toLowerCase().includes(searchTerm.toLowerCase())),
    transformations: MOCK_METADATA.transformations.filter(item => item.name.toLowerCase().includes(searchTerm.toLowerCase())),
    sinks: MOCK_METADATA.sinks.filter(item => item.name.toLowerCase().includes(searchTerm.toLowerCase())),
  }

  return (
    <aside className="hidden md:flex flex-col w-80 bg-card border-r">
      <div className="p-4 border-b">
        <h2 className="text-xl font-semibold">Metadata</h2>
        <div className="relative mt-4">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input 
            type="search" 
            placeholder="Search components..." 
            className="pl-8" 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>
      <ScrollArea className="flex-1">
        <TooltipProvider>
          <Accordion type="multiple" defaultValue={['sources', 'transformations', 'sinks']} className="p-4">
            <AccordionItem value="sources">
              <AccordionTrigger>Sources</AccordionTrigger>
              <AccordionContent>
                <ul className="space-y-2 pt-2">
                  {filteredMetadata.sources.map((source) => (
                    <Tooltip key={source.name} delayDuration={100}>
                      <TooltipTrigger asChild>
                        <li className="flex items-center gap-3 p-2 rounded-md hover:bg-secondary cursor-pointer">
                          <source.icon className="w-5 h-5 text-primary" />
                          <span className="font-medium text-sm">{source.name}</span>
                        </li>
                      </TooltipTrigger>
                      <TooltipContent side="right">
                        <p>{source.description}</p>
                      </TooltipContent>
                    </Tooltip>
                  ))}
                </ul>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="transformations">
              <AccordionTrigger>Transformations</AccordionTrigger>
              <AccordionContent>
                <ul className="space-y-2 pt-2">
                  {filteredMetadata.transformations.map((tf) => (
                     <Tooltip key={tf.name} delayDuration={100}>
                        <TooltipTrigger asChild>
                          <li key={tf.name} className="flex items-center gap-3 p-2 rounded-md hover:bg-secondary cursor-pointer">
                            <tf.icon className="w-5 h-5 text-primary" />
                            <span className="font-medium text-sm">{tf.name}</span>
                          </li>
                        </TooltipTrigger>
                        <TooltipContent side="right">
                          <p>{tf.description}</p>
                        </TooltipContent>
                    </Tooltip>
                  ))}
                </ul>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="sinks">
              <AccordionTrigger>Sinks</AccordionTrigger>
              <AccordionContent>
                 <ul className="space-y-2 pt-2">
                  {filteredMetadata.sinks.map((sink) => (
                     <Tooltip key={sink.name} delayDuration={100}>
                      <TooltipTrigger asChild>
                        <li key={sink.name} className="flex items-center gap-3 p-2 rounded-md hover:bg-secondary cursor-pointer">
                          <sink.icon className="w-5 h-5 text-primary" />
                          <span className="font-medium text-sm">{sink.name}</span>
                        </li>
                      </TooltipTrigger>
                      <TooltipContent side="right">
                        <p>{sink.description}</p>
                      </TooltipContent>
                    </Tooltip>
                  ))}
                </ul>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </TooltipProvider>
      </ScrollArea>
    </aside>
  )
}
