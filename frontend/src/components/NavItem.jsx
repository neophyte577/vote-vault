import { NavLink, useLocation } from "react-router-dom";
import { HashLink } from "react-router-hash-link";
import { ShinyText } from "../animations/ShinyText"; 

const NavItem = ({ to, label, type = "hash", active, shiny = false }) => {
  const location = useLocation();

  const routeMatch = location.pathname + location.hash === to;
  const hasExplicitActive = typeof active === "boolean";
  const isActive = hasExplicitActive ? active : routeMatch;

  const baseClass =
    "transition-all duration-200 font-orbitron font-semibold text-[15.5px] text-paleHoney hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.6)]";
  const activeClass =
    "bg-white/10 px-3 text-[16px] py-1 rounded-full border border-paleHoney/15";

  const combinedClass = `${baseClass} ${isActive ? activeClass : ""}`;
  const LinkComponent = type === "route" ? NavLink : HashLink;

  return (
    <LinkComponent smooth to={to} className={combinedClass}>
      {shiny ? (
        <ShinyText shimmerWidth={100} className="inline-block">
          {label}
        </ShinyText>
      ) : (
        label
      )}
    </LinkComponent>
  );
};

export default NavItem;
