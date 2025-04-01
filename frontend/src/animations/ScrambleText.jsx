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
  animationTime = 1600,
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
  const step = useRef(0);
  const elementRef = useRef(null);

  const startUnscramble = () => {
    step.current = 0;
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
      startUnscramble();
    }
  }, [triggerOnce, hasStarted, children, characterSet]);

  useEffect(() => {
    if (!isAnimating) return;

    const tick = animationTime / (children.length * 10);
    const target = children.length;

    const interval = setInterval(() => {
      if (step.current < target) {
        setDisplayText((current) =>
          current.map((char, index) =>
            char === " "
              ? char
              : index <= step.current
              ? children[index]
              : characterSet[getRandomInt(characterSet.length)]
          )
        );
        step.current += 0.2;
      } else {
        setIsAnimating(false);
        clearInterval(interval);
        if (onComplete) onComplete();
      }
    }, tick);

    return () => clearInterval(interval);
  }, [children, animationTime, isAnimating, characterSet, onComplete]);

  const MotionComponent = motion.create(Component);

  return (
    <MotionComponent
      ref={elementRef}
      className={`overflow-hidden py-2 text-4xl font-bold ${className}`}
      onMouseEnter={handleAnimationTrigger}
      {...props}
    >
      <AnimatePresence>
        {displayText.map((char, index) => (
          <motion.span key={index} className={char === " " ? "w-3" : ""}>
            {char.toUpperCase()}
          </motion.span>
        ))}
      </AnimatePresence>
    </MotionComponent>
  );
}
