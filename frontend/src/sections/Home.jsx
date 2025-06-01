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
  const [showSubtitleAndButtons, setShowSubtitleAndButtons] = useState(false);

  const interpulseDelay = 7000;
  const pulseDuration = 3000;

  useEffect(() => {
    const delay = 800;

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
        setShowSubtitleAndButtons(true);
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
        <div className="text-center font-oxanium translate-y-[225px] md:translate-y-[-5px] lg:translate-y-[-25px] z-10 px-4">
          <div className="md:mb-5 min-h-[5rem] relative">
            <div className={`absolute inset-0 transition-opacity duration-700 ${fadeOutIcon ? "opacity-0" : "opacity-100"}`}>
              <VoteVaultIcon className="w-[6rem] h-[6rem] md:w-[10rem] md:h-[10rem] text-paleHoney mx-auto translate-y-[-10px] md:translate-y-[-18px] lg:translate-y-[-18px]" />
            </div>
            <h1 className={`transition-opacity duration-700 ${fadeInTitle ? "opacity-100" : "opacity-0"} tracking-tight text-7xl md:text-[100px] lg:text-[120px] font-bold text-paleHoney bg-clip-text leading-right`}>
              {renderTitle()}
            </h1>
          </div>

          <div className={`transition-all duration-1000 transform ${showSubtitleAndButtons ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
            <p className="mt-2 text-md md:text-2xl font-orbitron font-semibold mb-5 max-w-lg mx-auto text-paleHoney translate-y-[-4px]">
              Open Data for an Open Democracy
            </p>

            <div className="flex justify-center space-x-4">
              <NavLink
                to="/form-download"
                className="bg-paleHoney text-black py-2 px-4 md:py-3 md:px-6 rounded transition relative overflow-hidden hover:-translate-y-0.5 hover:shadow-black hover:bg-mutedAmber"
              >
                Explore Data
              </NavLink>

              <HashLink
                to="#contact"
                className="bg-mutedBlack/65 border border-cream/50 text-paleHoney py-2 px-4 md:py-3 md:px-6 rounded transition-all duration-200 hover:-translate-y-0.5 hover:shadow-black hover:bg-cream/10"
              >
                Get In Touch
              </HashLink>
            </div>
          </div>
        </div>
      </RevealOnScroll>
    </section>
  );
};