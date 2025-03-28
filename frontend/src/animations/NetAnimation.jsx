import React, { useEffect, useRef } from 'react';

export default function NetAnimation({ children }) {
  const vantaRef = useRef(null);
  const effectRef = useRef(null);

  useEffect(() => {
    if (window.VANTA && !effectRef.current) {
      effectRef.current = window.VANTA.NET({
        el: vantaRef.current,
        mouseControls: true,
        touchControls: true,
        gyroControls: false,
        touchControls: true,
        minHeight: 200.0,
        minWidth: 200.0,
        scale: 1.0,
        scaleMobile: 1.0,
        color: 0xE1C16E,
        backgroundColor: 0x0a0a0a,
        spacing: 15.0,
        maxDistance: 25.0
      });
    }

    return () => {
      if (effectRef.current) {
        effectRef.current.destroy();
        effectRef.current = null;
      }
    };
  }, []);

  return (
    <div className="relative w-full h-300 overflow-hidden">
      <div ref={vantaRef} className="absolute inset-0 z-0" />
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}
