import { RevealOnScroll } from "../animations/RevealOnScroll";
import Marquee from "../animations/Marquee";
import { ResourceCard } from "../components/ResourceCard";
import { ResourceData } from "../components/ResourceData";
import NetAnimation from "../animations/NetAnimation"; 

export const Resources = () => {
  const getResource = (id) => ResourceData.find((r) => r.id === id);

  return (
    <div className="fade-out-top-bottom">
      <NetAnimation>
        <section
          id="resources"
          className="relative min-h-screen flex items-center justify-center py-20 overflow-visible"
        >
          <RevealOnScroll>
            <div className="max-w-400 mt-18 mx-auto px-4 text-softVanilla">
              <h2 className="text-6xl text-paleHoney font-orbitron font-bold mb-22 bg-gradient-to-r text-center">
                Resources
              </h2>

              <Marquee speed="20s">
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
      </NetAnimation>
    </div>
  );
};
