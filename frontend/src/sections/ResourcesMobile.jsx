import { RevealOnScroll } from "../animations/RevealOnScroll";
import { Particles } from "../animations/Particles";
import { ResourceData } from "../components/ResourceData";
import { ResourceCard } from "../components/ResourceCard";

export const ResourcesMobile = () => {
  const getResource = (id) => ResourceData.find((r) => r.id === id);

  return (
    <section
      id="resources-mobile"
      className="relative min-h-screen flex items-center justify-center py-20 overflow-hidden"
    >
      {/* <Particles className="absolute inset-0 z-0" quantity={250} color="#FFE8A1" /> */}

      <RevealOnScroll>
        
        <h2 className="text-[40px] font-orbitron md:text-6xl font-bold mb-12 bg-gradient-to-r from-paleHoney to-butterCream bg-clip-text text-transparent text-center">
           Resources
        </h2>
        <div className="max-w-5xl mx-auto px-4 text-softVanilla">
      
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <ResourceCard {...getResource("form-download")} variant="mobile" />
            <ResourceCard {...getResource("fec-mirror")} variant="mobile" />
            <ResourceCard {...getResource("query-builder")} variant="mobile" />
            <ResourceCard {...getResource("api")} variant="mobile" />
          </div>
        </div>
      </RevealOnScroll>
    </section>
  );
};
