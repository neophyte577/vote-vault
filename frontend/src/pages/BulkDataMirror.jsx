import React, { useEffect } from 'react';
import { bulkDataSections } from '../assets/bulkDataConfig';
import Accordion from '../components/Accordion';
import { FlickeringGrid } from '../animations/FlickeringGrid';

export default function BulkDataMirror() {
  useEffect(() => {
    window.scrollTo(0, 0); // patch for weird page focus glitch (possibly due to Accordion.jsx?)
  }, []);

  return (
    <div className="relative min-h-screen overflow-hidden bg-mutedBlack">
      <div className="absolute inset-0 bg-mutedBlack will-change-transform z-0" />
      <FlickeringGrid className="absolute inset-0 z-10 pointer-events-none" />

      <div className="relative z-20 mt-16 text-paleHoney px-4 py-8">
        <h1 className="text-4xl text-foreground font-bold mb-8 text-center">
          FEC Bulk Data Mirror
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
