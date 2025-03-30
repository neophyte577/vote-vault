import React, { useEffect } from 'react';
import { bulkDataSections } from '../assets/bulkDataConfig';
import Accordion from '../components/Accordion';
import { FlickeringGrid } from '../animations/FlickeringGrid';

export default function BulkDataMirror() {

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []); // patch for weird page focus glitch (possibly due to Accordion.jsx?)

  return (
    <div className="relative min-h-screen overflow-hidden">
      <FlickeringGrid className="z-10 absolute inset-0 w-full h-full pointer-events-none" />

      <div className="relative z-40 mt-15 md:mt-16 md:mb-4 text-paleHoney px-4 py-8">
        <div className="absolute inset-0 bg-background z-[-1]" /> 

        <h1 className="text-4xl text-foreground font-bold mb-8 text-center">
          Raw FEC Bulk Data
        </h1>

        <div className="max-w-4xl mx-auto md:w-[810px] space-y-4">
          {bulkDataSections.map((section, index) => (
            <Accordion key={index} section={section} />
          ))}
        </div>
      </div>
    </div>
  );
}
