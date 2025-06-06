import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import clsx from "clsx";

export function AnimatedGrid({
  width = 40,
  height = 40,
  x = -1,
  y = -1,
  strokeDasharray = 0,
  numSquares = 50,
  className,
  maxOpacity = 0.5,
  duration = 4,
  repeatDelay = 0.5,
  colorChangeInterval = 5000,
  ...props
}) {
  const id = `pattern-${Math.random().toString(36).substr(2, 9)}`;
  const containerRef = useRef(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [squareCount, setSquareCount] = useState(numSquares);
  const [squares, setSquares] = useState(() => generateSquares(numSquares));

  function getPos() {
    return [
      Math.floor((Math.random() * dimensions.width) / width),
      Math.floor((Math.random() * dimensions.height) / height),
    ];
  }

  function generateSquares(count) {
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      pos: getPos(),
      color: getRandomColor(),
    }));
  }

  function getRandomColor() {
    const roll = Math.random();
    if (roll < 0.06) return "red";
    if (roll < 0.12) return "blue";
    return "gray";
  }

  const updateSquarePosition = (id) => {
    setSquares((currentSquares) =>
      currentSquares.map((sq) =>
        sq.id === id
          ? {
              ...sq,
              pos: getPos(),
            }
          : sq
      )
    );
  };

  useEffect(() => {
    const checkScreenSize = () => {
      const isMobile = window.innerWidth < 768;
      setSquareCount(isMobile ? Math.floor(numSquares * 0.5) : numSquares);
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);

    return () => window.removeEventListener("resize", checkScreenSize);
  }, [numSquares]);

  useEffect(() => {
    if (dimensions.width && dimensions.height) {
      setSquares(generateSquares(squareCount));
    }
  }, [dimensions, squareCount]);

  useEffect(() => {
    const resizeObserver = new ResizeObserver((entries) => {
      for (let entry of entries) {
        setDimensions({
          width: entry.contentRect.width,
          height: entry.contentRect.height,
        });
      }
    });

    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    return () => {
      if (containerRef.current) {
        resizeObserver.unobserve(containerRef.current);
      }
    };
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setSquares((prevSquares) =>
        prevSquares.map((sq) => ({
          ...sq,
          color: getRandomColor(),
        }))
      );
    }, colorChangeInterval);

    return () => clearInterval(interval);
  }, []);

  return (
    <svg
      ref={containerRef}
      aria-hidden="true"
      className={clsx(
        "pointer-events-none absolute inset-0 h-full w-full fill-gray-400/30 stroke-gray-400/30",
        className
      )}
      {...props}
    >
      <defs>
        <pattern
          id={id}
          width={width}
          height={height}
          patternUnits="userSpaceOnUse"
          x={x}
          y={y}
        >
          <path d={`M.5 ${height}V.5H${width}`} fill="none" strokeDasharray={strokeDasharray} />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${id})`} />
      <svg x={x} y={y} className="overflow-visible">
        {squares.map(({ pos: [x, y], id, color }, index) => (
          <motion.rect
            initial={{ opacity: 0 }}
            animate={{ opacity: maxOpacity }}
            transition={{
              duration,
              repeat: 1,
              delay: index * 0.1,
              repeatType: "reverse",
            }}
            onAnimationComplete={() => updateSquarePosition(id)}
            key={`${x}-${y}-${index}`}
            width={width - 1}
            height={height - 1}
            x={x * width + 1}
            y={y * height + 1}
            fill={color === "red" ? "#ff4d4d" : color === "blue" ? "#4d79ff" : "gray"}
            strokeWidth="0"
          />
        ))}
      </svg>
    </svg>
  );
}
