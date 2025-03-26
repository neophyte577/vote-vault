import { useEffect, useState } from 'react';

export const useScrollSpy = (sectionIds, offset = 0) => {
  const [activeId, setActiveId] = useState('');

  useEffect(() => {
    const validIds = sectionIds.filter(Boolean); 
    let observer;

    const observeSections = () => {
      const elements = validIds
        .map((id) => document.getElementById(id))
        .filter(Boolean);

      console.log("🎯 Observing sections:", elements.map(e => e.id));

      observer = new IntersectionObserver(
        (entries) => {
          const visible = entries
            .filter((entry) => entry.isIntersecting)
            .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);

          if (visible.length > 0) {
            const topId = visible[0].target.id;
            console.log("🟢 Entering:", topId);
            setActiveId(topId);
          }
        },
        {
          rootMargin: `-${offset}px 0px -70% 0px`,
          threshold: 0.1, 
        }
      );

      elements.forEach((el) => observer.observe(el));
    };

    const timeout = setTimeout(observeSections, 100);

    return () => {
      clearTimeout(timeout);
      if (observer) observer.disconnect();
    };
  }, [sectionIds, offset]);

  return activeId;
};
