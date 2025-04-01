import { useState } from "react";
import { RevealOnScroll } from "../animations/RevealOnScroll";
import { VoteVaultIcon } from "../components/VoteVaultIcon";
import { HyperText } from "../animations/ScrambleText";
import { FadeInCard } from "../animations/FadeInCard";

export const About = () => {
  const [revealWhatText, setRevealWhatText] = useState(false);
  const [revealWhatCard, setRevealWhatCard] = useState(false);

  const [revealHowText, setRevealHowText] = useState(false);
  const [revealHowCard, setRevealHowCard] = useState(false);

  const [revealWhyText, setRevealWhyText] = useState(false);
  const [revealWhyCard, setRevealWhyCard] = useState(false);

  return (    
    <section
      id="about"
      className="min-h-screen flex items-center justify-center py-20"
    >
      <div className="max-w-5xl mx-auto px-4">
        <RevealOnScroll>
          <div className="flex justify-center mt-18 md:mt-20 mb-8 md:mb-16">
            <VoteVaultIcon className="w-[8rem] h-[8rem] md:w-[11.5rem] md:h-[11.5rem] text-paleHoney mx-auto md:translate-y-[6px]" />
          </div>
        </RevealOnScroll>

        <div className="space-y-3 md:space-y-14">

          {/* WHAT */}
          <RevealOnScroll onReveal={() => {
            setRevealWhatText(true);
            setRevealWhatCard(true);
          }}>
            <div className="flex flex-col md:flex-row md:items-center md:gap-12">
              <HyperText
                triggerOnce={revealWhatText}
                className="text-[30px] md:text-5xl font-orbitron font-bold text-paleHoney text-center md:text-center md:w-1/3 mb-2 md:mb-0"
                animationTime={1500}
                animateOnHover={true}
              >
                WHAT
              </HyperText>
              <FadeInCard
                triggerOnce={revealWhatCard}
                className="text-lg md:text-xl text-cream md:w-2/3 border-white/10 border rounded-xl p-6"
              >
                <strong className="text-butterCream font-orbitron">VoteVault</strong> is a public data platform designed to make campaign finance and election data transparent, explorable, and actionable. We gather, clean, and serve high-quality datasets through a user-friendly web interface and public API.
              </FadeInCard>
            </div>
          </RevealOnScroll>

          {/* HOW */}
          <RevealOnScroll onReveal={() => {
            setRevealHowText(true);
            setRevealHowCard(true);
          }}>
            <div className="flex flex-col md:flex-row-reverse md:items-center md:gap-12">
              <HyperText
                triggerOnce={revealHowText}
                className="text-[30px] md:text-5xl font-orbitron font-bold text-paleHoney text-center md:text-center md:w-1/3 mb-2 md:mb-0"
                animationTime={1500}
                animateOnHover={true}
              >
                HOW
              </HyperText>
              <FadeInCard
                triggerOnce={revealHowCard}
                className="text-lg md:text-xl text-cream md:w-2/3 border-white/10 border rounded-xl p-6"
              >
                In a data ecosystem of overwhelming volume and underwhelming accessibility, VoteVault bridges the gap between raw election data and the people who need it. Whether you’re visualizing trends, tracking contributions, or analyzing election results{" "}
                <a
                  href="#resources"
                  className="text-paleHoney underline hover:text-butterCream transition-colors"
                >
                  our tools
                </a>{" "}
                aim to make the process seamless and accessible.
              </FadeInCard>
            </div>
          </RevealOnScroll>

          {/* WHY */}
          <RevealOnScroll onReveal={() => {
            setRevealWhyText(true);
            setRevealWhyCard(true);
          }}>
            <div className="flex flex-col md:flex-row md:items-center md:gap-12">
              <HyperText
                triggerOnce={revealWhyText}
                className="text-[30px] md:text-5xl font-orbitron font-bold text-paleHoney text-center md:text-center md:w-1/3 mb-2 md:mb-0"
                animationTime={1500}
                animateOnHover={true}
              >
                WHY
              </HyperText>
              <FadeInCard
                triggerOnce={revealWhyCard}
                className="text-lg md:text-xl text-cream md:w-2/3 border-white/10 border rounded-xl p-6"
              >
                Our mission is simple: empower transparency of our electoral system through data. We’re starting small and clean, but we’re building toward a one-stop shop for trustworthy, up-to-date political data. Want something added or improved?{" "}
                <a
                  href="#contact"
                  className="text-paleHoney underline hover:text-butterCream transition-colors"
                >
                  Let us know.
                </a>
              </FadeInCard>
            </div>
          </RevealOnScroll>

        </div>
      </div>
    </section>
  );
};
