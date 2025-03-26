import { useEffect, useRef } from "react";

export const RevealOnScroll = ({ children, onReveal }) => {
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          ref.current.classList.add("visible");
          if (onReveal) onReveal();
        }
      },
      { threshold: 0.2, rootMargin: "0px 0px -50px 0px" }
    );

    if (ref.current) observer.observe(ref.current);

    return () => observer.disconnect();
  }, [onReveal]);

  return (
    <div ref={ref} className="reveal">
      {children}
    </div>
  );
};
