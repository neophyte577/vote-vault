import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const DEFAULT_CHARACTER_SET = Object.freeze("ABCDEFGHIJKLMNOPQRSTUVWXYZ".split(""));

const getRandomInt = (max) => Math.floor(Math.random() * max);

const scrambleText = (text, characterSet) =>
  text.split("").map((char) =>
    char === " " ? " " : characterSet[getRandomInt(characterSet.length)]
  );

export function HyperText({
  children,
  className = "",
  duration = 800,
  delay = 200,
  as: Component = "div",
  animateOnHover = true,
  characterSet = DEFAULT_CHARACTER_SET,
  triggerOnce = false,
  onComplete = null, 
  ...props
}) {
  const [displayText, setDisplayText] = useState(() =>
    scrambleText(children, characterSet)
  );
  const [isAnimating, setIsAnimating] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const iterationCount = useRef(0);
  const elementRef = useRef(null);

  const startUnscramble = () => {
    iterationCount.current = 0;
    setIsAnimating(true);
  };

  const handleAnimationTrigger = () => {
    if (animateOnHover && !isAnimating) {
      startUnscramble();
    }
  };

  useEffect(() => {
    if (triggerOnce && !hasStarted) {
      setHasStarted(true);

      setDisplayText(scrambleText(children, characterSet));

      setTimeout(() => {
        startUnscramble();
      }, 100);
    }
  }, [triggerOnce, hasStarted, children, characterSet]);

  useEffect(() => {
    if (!isAnimating) return;

    const intervalDuration = duration / (children.length * 10);
    const maxIterations = children.length;

    const interval = setInterval(() => {
      if (iterationCount.current < maxIterations) {
        setDisplayText((currentText) =>
          currentText.map((letter, index) =>
            letter === " "
              ? letter
              : index <= iterationCount.current
              ? children[index]
              : characterSet[getRandomInt(characterSet.length)]
          )
        );
        iterationCount.current += 0.1;
      } else {
        setIsAnimating(false);
        clearInterval(interval);

        if (onComplete) onComplete();
      }
    }, intervalDuration);

    return () => clearInterval(interval);
  }, [children, duration, isAnimating, characterSet, onComplete]);

  const MotionComponent = motion(Component);

  return (
    <MotionComponent
      ref={elementRef}
      className={`overflow-hidden py-2 text-4xl font-bold ${className}`}
      onMouseEnter={handleAnimationTrigger}
      {...props}
    >
      <AnimatePresence>
        {displayText.map((letter, index) => (
          <motion.span key={index} className={letter === " " ? "w-3" : ""}>
            {letter.toUpperCase()}
          </motion.span>
        ))}
      </AnimatePresence>
    </MotionComponent>
  );
}
