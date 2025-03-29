import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Download } from 'lucide-react';

export default function Accordion({ section }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border rounded-2xl shadow p-4 bg-card">
      <button
        className="w-full flex items-center justify-between text-left text-xl font-semibold"
        onClick={() => setOpen(!open)}
      >
        <span className="flex-1">{section.title}</span>
        {open ? (
          <ChevronUp className="w-6 h-6 shrink-0 ml-2" />
        ) : (
          <ChevronDown className="w-6 h-6 shrink-0 ml-2" />
        )}
      </button>

      {open && (
        <div className="mt-4 space-y-4">
          {section.links && (
            <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-x-6 gap-y-2">
              {section.links.map((link, i) => (
                <li key={i} className="whitespace-nowrap">
                  <a
                    href={link.url}
                    className="flex items-center gap-2 text-primary hover:underline"
                    download
                  >
                    <Download className="w-4 h-4 translate-x-[3px]" />
                    {link.year}
                  </a>
                </li>
              ))}
            </ul>
          )}

          {section.dataDescription && (
            <p className="pt-2">
              <a
                href={section.dataDescription}
                className="text-mutedAmber hover:underline"
                target="_blank"
              >
                Data description for this file →
              </a>
            </p>
          )}

          {section.headerFile && (
            <p>
              <a
                href={section.headerFile}
                className="text-mutedAmber hover:underline"
                download
              >
                Header file
              </a>
            </p>
          )}

          <p className="text-base text-muted-foreground">{section.description}</p>
        </div>
      )}
    </div>
  );
}
