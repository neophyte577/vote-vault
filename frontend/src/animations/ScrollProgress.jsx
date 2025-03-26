import React from "react";
import { motion, useScroll } from "framer-motion"; 
import clsx from "clsx"; 

export const ScrollProgress = React.forwardRef(({ className, ...props }, ref) => {
  const { scrollYProgress } = useScroll();

  return (
    <motion.div
      ref={ref}
      className={clsx(
        "fixed inset-x-0 bottom-0 z-50 h-px origin-left bg-gradient-to-r from-cream via-paleHoney to-mutedAmber",
        className
      )}
      style={{
        scaleX: scrollYProgress,
      }}
      {...props}
    />
  );
});

ScrollProgress.displayName = "ScrollProgress";
