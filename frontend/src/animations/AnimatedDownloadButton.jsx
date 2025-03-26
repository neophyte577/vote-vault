import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import clsx from "clsx";

export const AnimatedDownloadButton = React.forwardRef(
  ({ subscribeStatus = false, onClick, className, children, resetTime = 3000, ...props }, ref) => {
    const [isSubscribed, setIsSubscribed] = useState(subscribeStatus);

    if (
      React.Children.count(children) !== 2 ||
      !React.Children.toArray(children).every(
        (child) => React.isValidElement(child) && child.type === "span"
      )
    ) {
      throw new Error(
        "AnimatedDownloadButton expects exactly two children, both of which must be <span> elements."
      );
    }

    const childrenArray = React.Children.toArray(children);
    const initialChild = childrenArray[0]; 
    const changeChild = childrenArray[1]; 

    const handleClick = (e) => {
      setIsSubscribed(true);
      onClick?.(e);

      setTimeout(() => {
        setIsSubscribed(false);
      }, resetTime);
    };

    return (
      <AnimatePresence mode="wait">
        {isSubscribed ? (
          <motion.button
            ref={ref}
            className={clsx(
              "relative flex h-10 w-fit items-center justify-center overflow-hidden rounded-lg bg-primary px-6 text-primary-foreground",
              className
            )}
            onClick={(e) => {
              setIsSubscribed(false);
              onClick?.(e);
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            {...props}
          >
            <motion.span
              key="subscribed"
              className="relative flex h-full w-full items-center justify-center font-semibold"
              initial={{ y: -50 }}
              animate={{ y: 0 }}
            >
              {changeChild} 
            </motion.span>
          </motion.button>
        ) : (
          <motion.button
            ref={ref}
            className={clsx(
              "relative flex h-10 w-fit cursor-pointer items-center justify-center rounded-lg border-none bg-primary px-6 text-primary-foreground",
              className
            )}
            onClick={handleClick}  
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            {...props}
          >
            <motion.span
              key="unsubscribed"
              className="relative flex items-center justify-center font-semibold"
              initial={{ x: 0 }}
              exit={{ x: 50, transition: { duration: 0.1 } }}
            >
              {initialChild}
            </motion.span>
          </motion.button>
        )}
      </AnimatePresence>
    );
  }
);

AnimatedDownloadButton.displayName = "AnimatedDownloadButton";
