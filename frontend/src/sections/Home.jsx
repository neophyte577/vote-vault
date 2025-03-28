import { useState, useEffect } from "react";
import { RevealOnScroll } from "../animations/RevealOnScroll";
import { AnimatedGrid } from "../animations/AnimatedGrid";
import { VoteVaultIcon } from "../components/VoteVaultIcon";
import { NavLink } from "react-router-dom";
import { HashLink } from "react-router-hash-link";

export const Home = () => {
  const textStages = [
    ...Array(15).fill("[]"),
    "[VV]", "[VV]", "[VoVa]", "[VoVa]", "[VotVaul]", "[VoteVault]"
  ];

  const [textIndex, setTextIndex] = useState(0);
  const [pulseState, setPulseState] = useState(false);
  const [isPulsing, setIsPulsing] = useState(false);

  const [fadeOutIcon, setFadeOutIcon] = useState(false);
  const [fadeInTitle, setFadeInTitle] = useState(false);

  const interpulseDelay = 8500;
  const pulseDuration = 3000;

  useEffect(() => {
    const delay = 800; 
    const fadeDuration = 600;

    const fadeOutTimer = setTimeout(() => {
      setFadeOutIcon(true);
      setFadeInTitle(true); 
    }, delay);

    return () => clearTimeout(fadeOutTimer);
  }, []);

  useEffect(() => {
    if (!fadeInTitle) return;

    let index = 0;
    const interval = setInterval(() => {
      index++;
      if (index < textStages.length) {
        setTextIndex(index);
      } else {
        clearInterval(interval);
        setTimeout(() => startPulsingCycle(), 2000);
      }
    }, 50);

    return () => clearInterval(interval);
  }, [fadeInTitle]);

  useEffect(() => {
    const pulseInterval = setInterval(() => {
      setIsPulsing(true);
      setPulseState(prev => !prev);

      setTimeout(() => {
        setIsPulsing(false);
      }, pulseDuration);
    }, interpulseDelay + pulseDuration);

    return () => clearInterval(pulseInterval);
  }, []);

  const renderTitle = () => {
    const finalText = textStages[textIndex];
    let vCount = 0;

    return (
      <>
        {finalText.split("").map((char, i) => {
          if (char === "V") {
            const colorClass =
              !isPulsing
                ? "text-paleHoney"
                : vCount === 0
                ? pulseState
                  ? "text-red-500"
                  : "text-blue-500"
                : pulseState
                ? "text-blue-500"
                : "text-red-500";

            vCount++;
            return (
              <span key={i} className={`${colorClass} v-transition`}>
                {char}
              </span>
            );
          }
          return char;
        })}
      </>
    );
  };

  return (
    <section id="home" className="min-h-screen flex md:items-center justify-center relative">
      <AnimatedGrid className="absolute inset-0 w-full h-full text-gray-700 fade-out-bottom" />

      <RevealOnScroll>
        <div className="text-center translate-y-[225px] md:translate-y-[0px] z-10 px-4">
        <div className="mb-2 md:mb-6 min-h-[5rem] relative">
            <div className={`absolute inset-0 transition-opacity duration-700 ${fadeOutIcon ? "opacity-0" : "opacity-100"}`}>
              <VoteVaultIcon className="w-[5rem] h-[5rem] md:w-[9rem] md:h-[9rem] text-paleHoney mx-auto translate-y-[-4px] md:translate-y-[-8px]" />
            </div>
            <h1 className={`transition-opacity duration-700 ${fadeInTitle ? "opacity-100" : "opacity-0"} text-6xl md:text-[110px] font-bold text-paleHoney bg-clip-text leading-right pb-4`}>
              {renderTitle()}
            </h1>
          </div>

          <p className="text-md md:text-2xl font-orbitron font-semibold mb-7 max-w-lg mx-auto text-paleHoney">
          Open Data for an Open Democracy
          </p>

          <div className="flex justify-center space-x-4">
            <NavLink
              to="/form-download"
              className="bg-paleHoney text-black py-2 px-4 md:py-3 md:px-6 rounded font-medium transition relative overflow-hidden hover:-translate-y-0.5 hover:shadow-black hover:bg-mutedAmber"
            >
              Explore Data
            </NavLink>

            <HashLink
              to="#contact"
              className="border border-cream/50 text-paleHoney py-2 px-4 md:py-3 md:px-6 rounded font-medium transition-all duration-200 hover:-translate-y-0.5 hover:shadow-black hover:bg-cream/10"
            >
              Get In Touch
            </HashLink>

          </div>
        </div>
      </RevealOnScroll>
    </section>
  );
};
