import React from 'react';
import { bulkDataSections } from '../assets/bulkDataConfig';
import Accordion from '../components/Accordion';
import { FlickeringGrid } from '../animations/FlickeringGrid';

export default function BulkDataMirror() {
  return (
    <div className="relative min-h-screen overflow-hidden">
      <FlickeringGrid className="absolute inset-0 w-full h-full pointer-events-none" />
      <div className="mt-15 md:mt-18 md:mb-4 text-paleHoney min-h-screen px-4 py-8 bg-background text-foreground">
        <h1 className="text-4xl font-bold mb-8 text-center">Download Bulk Data</h1>
        <div className="max-w-4xl mx-auto md:w-[810px] space-y-4">
          {bulkDataSections.map((section, index) => (
            <Accordion key={index} section={section} />
          ))}
        </div>
      </div>
    </div>
  );
}
