import { RevealOnScroll } from "../animations/RevealOnScroll";
import { Particles } from "../animations/Particles";
import Marquee from "../animations/Marquee";
import { ResourceCard } from "../components/ResourceCard";
import { ResourceData } from "../components/ResourceData";
// import { Lottie } from "lottie-react";
// import specialAnimation from "../assets/animations/special.json";

export const Resources = () => {
  const getResource = (id) => ResourceData.find((r) => r.id === id);

  return (
    <section
      id="resources"
      className="relative min-h-screen flex items-center justify-center py-20 overflow-hidden"
    >
      {/* <Particles className="absolute inset-0 z-0" quantity={250} color="#FFE8A1" /> */}

      <RevealOnScroll>
        <div className="max-w-7xl mx-auto px-4 text-softVanilla">
          <h2 className="text-6xl font-orbitron font-bold mb-18 bg-gradient-to-r from-paleHoney to-butterCream bg-clip-text text-transparent text-center">
            Resources
          </h2>

          <Marquee speed="30s">
            <div className="py-4 flex gap-10 text-paleHoney">

              <ResourceCard {...getResource("form-download")} />

              <ResourceCard {...getResource("fec-mirror")} />

              <ResourceCard {...getResource("query-builder")} />

              <ResourceCard {...getResource("api")}>
               
              </ResourceCard>

            </div>
          </Marquee>
        </div>
      </RevealOnScroll>
    </section>
  );
};
