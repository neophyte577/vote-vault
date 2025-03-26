import React, {
    useEffect,
    useRef,
    useState,
  } from "react";
import clsx from "clsx";
  
  function getMousePosition() {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
    useEffect(() => {
      const handleMouseMove = (event) => {
        setMousePosition({ x: event.clientX, y: event.clientY });
      };
      window.addEventListener("mousemove", handleMouseMove);
      return () => window.removeEventListener("mousemove", handleMouseMove);
    }, []);
  
    return mousePosition;
  }
  
  function hexToRgb(hex) {
    hex = hex.replace("#", "");
    if (hex.length === 3) {
      hex = hex.split("").map((c) => c + c).join("");
    }
    const int = parseInt(hex, 16);
    return [(int >> 16) & 255, (int >> 8) & 255, int & 255];
  }
  
  export const Particles = ({
    className = "",
    quantity = 100,
    staticity = 50,
    ease = 50,
    size = 0.4,
    refresh = false,
    color = "#ffffff",
    vx = 0,
    vy = 0,
    ...props
  }) => {
    const canvasRef = useRef(null);
    const containerRef = useRef(null);
    const context = useRef(null);
    const circles = useRef([]);
    const mousePosition = getMousePosition();
    const mouse = useRef({ x: 0, y: 0 });
    const canvasSize = useRef({ w: 0, h: 0 });
    const dpr = window.devicePixelRatio || 1;
    const rafID = useRef(null);
  
    useEffect(() => {
      if (canvasRef.current) context.current = canvasRef.current.getContext("2d");
      initCanvas();
      animate();
  
      const resizeHandler = () => {
        clearTimeout(resizeHandler._timeout);
        resizeHandler._timeout = setTimeout(initCanvas, 200);
      };
  
      window.addEventListener("resize", resizeHandler);
      return () => {
        cancelAnimationFrame(rafID.current);
        window.removeEventListener("resize", resizeHandler);
      };
    }, [color]);
  
    useEffect(() => updateMouse(), [mousePosition.x, mousePosition.y]);
    useEffect(() => initCanvas(), [refresh]);
  
    const updateMouse = () => {
      if (canvasRef.current) {
        const rect = canvasRef.current.getBoundingClientRect();
        const { w, h } = canvasSize.current;
        const x = mousePosition.x - rect.left - w / 2;
        const y = mousePosition.y - rect.top - h / 2;
        if (x < w / 2 && x > -w / 2 && y < h / 2 && y > -h / 2) {
          mouse.current = { x, y };
        }
      }
    };
  
    const initCanvas = () => {
      if (!containerRef.current || !canvasRef.current || !context.current) return;
      const w = containerRef.current.offsetWidth;
      const h = containerRef.current.offsetHeight;
      canvasSize.current = { w, h };
  
      const canvas = canvasRef.current;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      context.current.scale(dpr, dpr);
  
      circles.current = [];
      for (let i = 0; i < quantity; i++) drawCircle(createCircle());
    };
  
    const createCircle = () => {
      const w = canvasSize.current.w;
      const h = canvasSize.current.h;
      const pSize = Math.random() * 2 + size;
      return {
        x: Math.random() * w,
        y: Math.random() * h,
        translateX: 0,
        translateY: 0,
        size: pSize,
        alpha: 0,
        targetAlpha: Math.random() * 0.6 + 0.1,
        dx: (Math.random() - 0.5) * 0.1,
        dy: (Math.random() - 0.5) * 0.1,
        magnetism: 0.1 + Math.random() * 4,
      };
    };
  
    const drawCircle = (c, update = false) => {
      if (!context.current) return;
      const rgb = hexToRgb(color);
      context.current.translate(c.translateX, c.translateY);
      context.current.beginPath();
      context.current.arc(c.x, c.y, c.size, 0, Math.PI * 2);
      context.current.fillStyle = `rgba(${rgb.join(",")}, ${c.alpha})`;
      context.current.fill();
      context.current.setTransform(dpr, 0, 0, dpr, 0, 0);
      if (!update) circles.current.push(c);
    };
  
    const animate = () => {
      if (!context.current) return;
      context.current.clearRect(0, 0, canvasSize.current.w, canvasSize.current.h);
  
      circles.current.forEach((c, i) => {
        c.alpha += 0.02;
        if (c.alpha > c.targetAlpha) c.alpha = c.targetAlpha;
        c.x += c.dx + vx;
        c.y += c.dy + vy;
        c.translateX += (mouse.current.x / (staticity / c.magnetism) - c.translateX) / ease;
        c.translateY += (mouse.current.y / (staticity / c.magnetism) - c.translateY) / ease;
  
        drawCircle(c, true);
  
        if (
          c.x < -c.size ||
          c.x > canvasSize.current.w + c.size ||
          c.y < -c.size ||
          c.y > canvasSize.current.h + c.size
        ) {
          circles.current.splice(i, 1);
          drawCircle(createCircle());
        }
      });
      rafID.current = requestAnimationFrame(animate);
    };
  
    return (
      <div
        className={clsx("pointer-events-none", className)}
        ref={containerRef}
        aria-hidden="true"
        {...props}
      >
        <canvas ref={canvasRef} className="size-full" />
      </div>
    );
  };
  