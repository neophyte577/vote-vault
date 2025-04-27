import React, { useEffect, useRef, useState } from "react";

export const FlickeringDotPattern = ({
  width = 18,
  height = 18,
  dotRadius = 1.5,
  baseColor = "#FCE5B1", 
  flickerInterval = 250,
  flickerFraction = 0.05,
  fadeSpeed = 0.05,
  className = "",
}) => {
  const containerRef = useRef(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [dots, setDots] = useState([]);

  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        const { width, height } = containerRef.current.getBoundingClientRect();
        setDimensions({ width, height });
      }
    };

    updateDimensions();
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  useEffect(() => {
    if (!dimensions.width || !dimensions.height) return;

    const cols = Math.ceil(dimensions.width / width);
    const rows = Math.ceil(dimensions.height / height);
    const totalDots = cols * rows;

    setDots(() =>
      Array.from({ length: totalDots }, () => {
        const rand = Math.random();
        let color = baseColor;
        if (rand < 0.05) color = "rgba(59, 130, 246, 0.3)"; 
        else if (rand < 0.1) color = "rgba(239, 68, 68, 0.3)"; 
        return {
          opacity: Math.random(),
          targetOpacity: Math.random(),
          color, 
        };
      })
    );
  }, [dimensions, width, height, baseColor]);

  useEffect(() => {
    const interval = setInterval(() => {
      setDots((dots) => {
        const newDots = [...dots];
        const numToFlicker = Math.floor(newDots.length * flickerFraction);

        for (let i = 0; i < numToFlicker; i++) {
          const randomIndex = Math.floor(Math.random() * newDots.length);
          newDots[randomIndex].targetOpacity = Math.random();
        }
        return newDots;
      });
    }, flickerInterval);

    return () => clearInterval(interval);
  }, [flickerInterval, flickerFraction]);

  useEffect(() => {
    const raf = requestAnimationFrame(function animate() {
      setDots((dots) =>
        dots.map((dot) => {
          const diff = dot.targetOpacity - dot.opacity;
          if (Math.abs(diff) < fadeSpeed) {
            return { ...dot, opacity: dot.targetOpacity };
          }
          return {
            ...dot,
            opacity: dot.opacity + fadeSpeed * Math.sign(diff),
          };
        })
      );
      requestAnimationFrame(animate);
    });

    return () => cancelAnimationFrame(raf);
  }, [fadeSpeed]);

  return (
    <div ref={containerRef} className={`absolute inset-0 ${className}`}>
      <svg width="100%" height="100%">
        {dots.length > 0 && dimensions.width > 0 && dimensions.height > 0 && (
          dots.map((dot, idx) => {
            const cols = Math.ceil(dimensions.width / width);
            if (cols === 0) return null;
            const col = idx % cols;
            const row = Math.floor(idx / cols);

            return (
              <circle
                key={idx}
                cx={col * width}
                cy={row * height}
                r={dotRadius}
                fill={dot.color}
                fillOpacity={dot.opacity}
              />
            );
          })
        )}
      </svg>
    </div>
  );
};
