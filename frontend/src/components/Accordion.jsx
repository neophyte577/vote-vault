import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Download } from 'lucide-react';
import DescriptionModal from './DescriptionModal';
import bulkData from '../assets/bulkDataDictionaries.json';

export default function Accordion({ section }) {
  const [open, setOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  const handleDownload = async (urlPath) => {
    try {
      const response = await fetch(`/raw?url=${encodeURIComponent(urlPath)}`);
      const data = await response.json();

      if (data.download_url) {
        window.open(data.download_url, "_blank");
      } else {
        console.error("No download URL returned.");
      }
    } catch (err) {
      console.error("Error fetching signed URL:", err);
    }
  };

  const handleOpenModal = () => setModalOpen(true);
  const handleCloseModal = () => setModalOpen(false);

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
                  <button
                    onClick={() => handleDownload(link.url)}
                    className="flex items-center gap-2 text-primary hover:underline cursor-pointer"
                  >
                    <Download className="w-4 h-4 translate-x-[3px]" />
                    {link.year}
                  </button>
                </li>
              ))}
            </ul>
          )}

          {section.dataDescriptionKey && (
            <p className="pt-2">
              <button
                onClick={handleOpenModal}
                className="text-mutedAmber hover:underline"
              >
                Data description for this file →
              </button>
            </p>
          )}

          {section.headerFile && (
            <p>
              <button
                onClick={() => handleDownload(section.headerFile)}
                className="text-mutedAmber hover:underline cursor-pointer flex items-center gap-2"
              >
                Header file
              </button>
            </p>
          )}

          <p className="text-base text-muted-foreground">{section.description}</p>

          {section.dataDescriptionKey && (
            <DescriptionModal
              open={modalOpen}
              onClose={handleCloseModal}
              title={bulkData[section.dataDescriptionKey].title}
              subtitle={bulkData[section.dataDescriptionKey].tableTitle}
              description={bulkData[section.dataDescriptionKey].blurb}
              data={bulkData[section.dataDescriptionKey].columns}
            />
          )}
        </div>
      )}
    </div>
  );
}
