import React, { useEffect, useRef } from 'react';
import { X } from 'lucide-react';
import Table from './Table';

export default function DescriptionModal({ open, onClose, title, subtitle, description, data }) {
  const titleId = 'modal-title';
  const descId = 'modal-description';
  const modalRef = useRef(null);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (open) {
      document.addEventListener('keydown', handleKeyDown);
      if (modalRef.current) modalRef.current.focus();
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-x-0 bottom-0 top-[4rem] z-50 overflow-y-auto touch-manipulation"
      onClick={onClose}
    >
      <div className="relative w-full h-full flex items-start justify-center px-4 md:px-12 py-8">
        <div
          className="glass bg-mutedBlack/70 text-paleHoney border border-paleHoney rounded-2xl shadow-xl w-full h-full overflow-hidden flex flex-col"
          onClick={(e) => e.stopPropagation()}
          role="dialog"
          aria-modal="true"
          aria-labelledby={titleId}
          aria-describedby={descId}
          tabIndex={-1}
          ref={modalRef}
        >
          <div className="flex items-start justify-between border-b border-paleHoney/20 px-6 py-4">
            <div>
              <h2 id={titleId} className="text-xl font-semibold">{title}</h2>
            </div>
            <button className="text-paleHoney/60 hover:text-paleHoney transition" onClick={onClose} aria-label="Close modal">
              <X size={30} />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto overflow-x-hidden px-6 py-6">
            {description && (
              <div
                id={descId}
                className="space-y-4 min-w-full [&>ul]:list-disc [&>ul]:pl-6 [&>li]:mt-1 [&>code]:bg-paleHoney/10 [&>code]:px-1 [&>code]:py-0.5 [&>code]:rounded"
                dangerouslySetInnerHTML={{ __html: description }}
              />
            )}
            {subtitle && (
              <h3 className="text-lg font-semibold mt-8 mb-4">{subtitle}</h3>
            )}
            <div className="overflow-x-auto">
              <Table data={data} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}