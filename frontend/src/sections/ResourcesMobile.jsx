import React, { useState } from "react";
import { RevealOnScroll } from "../animations/RevealOnScroll";
import { Particles } from "../animations/Particles";
import { ResourceData } from "../components/ResourceData";
import { ResourceCard } from "../components/ResourceCard";

export const ResourcesMobile = () => {
  const [glowId, setGlowId] = useState(null);
  const getResource = (id) => ResourceData.find((r) => r.id === id);

  return (
    <section
      id="resources-mobile"
      className="relative min-h-screen flex items-center justify-center py-20 overflow-hidden"
    >
      <Particles className="absolute inset-0 z-0" quantity={300} color="#FFE8A1" />

      <RevealOnScroll>
        <h2 className="text-[40px] font-orbitron text-6xl font-bold mt-5 mb-12 bg-gradient-to-r from-paleHoney to-butterCream bg-clip-text text-transparent text-center">
          Resources
        </h2>
        <div className="max-w-5xl mx-auto px-4 text-softVanilla">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {["form-download", "fec-mirror", "query-builder", "api"].map((id) => (
              <ResourceCard
                key={id}
                id={id}
                {...getResource(id)}
                variant="mobile"
                glowId={glowId}
                setGlowId={setGlowId}
              />
            ))}
          </div>
        </div>
      </RevealOnScroll>
    </section>
  );
};
