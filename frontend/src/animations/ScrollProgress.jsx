import React, { useEffect, useState } from "react";
import clsx from "clsx";

export const ScrollProgress = React.forwardRef(({ className, ...props }, ref) => {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const updateProgress = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = scrollHeight > 0 ? scrollTop / scrollHeight : 0;
      setScrollProgress(progress);
    };

    updateProgress();
    window.addEventListener("scroll", updateProgress);
    window.addEventListener("resize", updateProgress);

    return () => {
      window.removeEventListener("scroll", updateProgress);
      window.removeEventListener("resize", updateProgress);
    };
  }, []);

  return (
    <div
      ref={ref}
      className={clsx(
        "fixed inset-x-0 bottom-0 z-40 h-px origin-left bg-gradient-to-r from-softVanilla via-paleHoney to-[#E1C16E]",
        className
      )}
      style={{
        transform: `scaleX(${scrollProgress})`,
        transformOrigin: "left",
        transition: "transform 0.1s linear",
      }}
      {...props}
    />
  );
});

ScrollProgress.displayName = "ScrollProgress";
