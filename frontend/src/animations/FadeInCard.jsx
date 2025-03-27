import { useEffect, useState } from "react";

export function FadeInCard({
  children,
  className = "",
  triggerOnce = false,
  ...props
}) {
  const [hasFadedIn, setHasFadedIn] = useState(false);

  useEffect(() => {
    if (triggerOnce && !hasFadedIn) {
      setHasFadedIn(true);
    }
  }, [triggerOnce, hasFadedIn]);

  return (
    <div
      className={`transition-all duration-700 ease-out ${
        hasFadedIn ? "fade-in" : "fade-hidden"
      } ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}
