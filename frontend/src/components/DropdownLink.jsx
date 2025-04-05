import React, { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { HashLink } from "react-router-hash-link";
import { AnimatePresence, motion } from "framer-motion";
import ResourcesSubmenu from "./ResourcesSubmenu";
import { ShinyText } from "../animations/ShinyText";

const DropdownLink = ({
  to = "/#resources",
  label = "Resources",
  shiny = false,
  type = "hash",
  active,
}) => {
  const location = useLocation();
  const [selected, setSelected] = useState(false);

  const routeMatch = location.pathname + location.hash === to;
  const hasExplicitActive = typeof active === "boolean";
  const isActive = hasExplicitActive ? active : routeMatch;

  const baseClass =
    "font-orbitron font-semibold text-[15.5px] text-paleHoney";
  const activeClass =
    "bg-white/10 px-3 text-[16px] py-1 rounded-full border border-paleHoney/15";
  const combinedClass = `${baseClass} ${isActive ? activeClass : ""}`;
  const LinkComponent = type === "route" ? NavLink : HashLink;

  return (
    <div
      onMouseEnter={() => setSelected(true)}
      onMouseLeave={() => setSelected(false)}
      className="relative"
    >
      <motion.div
        animate={{
          y: selected ? 2 : 0, // slight downward motion
          filter: selected
            ? "drop-shadow(0 0 8px rgba(255, 255, 255, 0.6))"
            : "drop-shadow(0 0 0 rgba(0,0,0,0))",
        }}
        transition={{ duration: 0.25, ease: "easeOut" }}
      >
        <LinkComponent
          to={to}
          onClick={() => setSelected(false)}
          className={combinedClass}
          {...(type !== "route" && { smooth: true })}
        >
          {shiny ? (
            <ShinyText shimmerWidth={100} className="inline-block">
              {label}
            </ShinyText>
          ) : (
            label
          )}
        </LinkComponent>
      </motion.div>

      <AnimatePresence>
        {selected && (
          <motion.div
          id="overlay-content"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 8 }}
          className="absolute left-1/2 top-[calc(100%_+_26px)] min-w-[280px] max-w-fit -translate-x-1/2 rounded-lg border border-paleHoney bg-mutedBlack/85 p-4 z-50" 
          >
            <div className="absolute -top-[2px] left-1/2 w-[18px] h-[12px] -translate-x-1/2 bg-mutedBlack z-50 pointer-events-none" />

            <div className="absolute -top-[24px] left-0 right-0 h-[24px] border-mutedAmber" />
            <motion.span
              style={{
                clipPath: "polygon(0 0, 100% 0, 50% 50%, 0% 100%)",
              }}
              animate={{ left: "50%" }}
              transition={{ duration: 0.25, ease: "easeInOut" }}
              className="absolute left-1/2 z-[9999] top-0 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rotate-45 rounded-tl border border-paleHoney bg-mutedBlack/95"
            />
            <ResourcesSubmenu onLinkClick={() => setSelected(false)} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default DropdownLink;
