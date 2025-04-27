import React, { useEffect, useRef } from 'react';
import { NavLink } from 'react-router-dom';

export const ResourceCard = ({
    id,
    title,
    description,
    link,
    color = "blue",
    linkText = "Let's Gooo",
    variant = "default",
    children,
    glowId,
    setGlowId,
  }) => {
    const linkColorMap = {
      blue: "md:text-lg text-blue-400 md:text-blue-600 font-semibold md:font-semibold hover:text-blue-300 md:hover:text-blue-500 md:hover:font-bold",
      red: "md:text-lg text-red-400 md:text-red-600 font-semibold md:font-semibold hover:text-red-300 md:hover:text-red-500 md:hover:font-bold",
      green: "text-green-400 hover:text-green-300",
    };

    const linkClasses = linkColorMap[color] || linkColorMap.blue;
    const ref = useRef(null);

    useEffect(() => {
      if (variant !== "mobile") return;
      if (typeof window !== 'undefined' && window.innerWidth > 768) return;

      const handleScroll = () => {
        if (!ref.current) return;
        const rect = ref.current.getBoundingClientRect();
        const viewportHeight = window.innerHeight;
        const cardCenter = rect.top + rect.height / 2;
        const viewportCenter = viewportHeight / 2;

        const distanceFromCenter = Math.abs(cardCenter - viewportCenter);
        if (distanceFromCenter < 145) {
          setGlowId?.(id);
        }
      };

      window.addEventListener("scroll", handleScroll, { passive: true });
      handleScroll(); // run on mount
      return () => window.removeEventListener("scroll", handleScroll);
    }, [id, setGlowId, variant]);

    const isGlowing = glowId === id;

    if (variant === "mobile") {
      return (
        <div
          ref={ref}
          className={`bg-mutedBlack p-6 px-4 rounded-xl border border-white/10 w-full transition-all duration-600 ease-in-out
            hover:-translate-y-1
            ${color === "blue" ? "hover:border-blue-500/30 hover:shadow-[0_0_10px_rgba(59,130,246,0.5)]" : ""}
            ${color === "red" ? "hover:border-red-500/30 hover:shadow-[0_0_10px_rgba(239,68,68,0.4)]" : ""}
            ${isGlowing && color === "blue" ? "shadow-[0_0_12px_3px_rgba(59,130,246,0.5)] border-blue-500/30" : ""}
            ${isGlowing && color === "red" ? "shadow-[0_0_12px_3px_rgba(239,68,68,0.4)] border-red-500/30" : ""}
          `}
        >
          <h3 className="text-xl font-orbitron font-bold mb-3 text-paleHoney">{title}</h3>
          <p className="text-gray-400 mb-2 break-words whitespace-normal">{description}</p>

          {children}

          {link && (
            <div className="flex justify-between items-center mt-2">
              <NavLink to={link} className={`${linkClasses} transition-colors mt-1`}>
                {linkText} →
              </NavLink>
            </div>
          )}
        </div>
      );
    }

    // default (desktop)
    return (
      <div
        className={`glass p-12 rounded-2xl border border-white/10 transition-all
          hover:-translate-y-1
          min-w-[440px] max-w-[480px] min-h-[360px] text-cream
          flex flex-col justify-between
          ${
            color === "blue"
              ? "hover:border-blue-500/30 hover:shadow-[0_0_10px_4px_rgba(59,130,246,0.6)]"
              : ""
          }
          ${
            color === "red"
              ? "hover:border-red-500/30 hover:shadow-[0_0_10px_4px_rgba(239,68,68,0.6)]"
              : ""
          }
        `}
      >
        <div>
          <h3 className="text-2xl font-orbitron font-bold mb-4 text-paleHoney">{title}</h3>
          <p className="text-cream mb-6 text-lg break-words whitespace-normal">{description}</p>
          {children}
        </div>

        {link && (
          <div className="mt-auto pt-4">
            <NavLink
              to={link}
              className={`${linkClasses} font-orbitron text-lg transition-colors font-medium`}
            >
              {linkText} →
            </NavLink>
          </div>
        )}
      </div>
    );
  };
