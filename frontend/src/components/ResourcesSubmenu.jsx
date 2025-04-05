import React from "react";
import { NavLink } from "react-router-dom";
import { Download, PieChart, Server, Plug } from "lucide-react";

const ResourcesSubmenu = ({ onLinkClick }) => {
  return (
    <div className="grid grid-cols-[1fr_auto_1fr] items-start relative">
      <div className="flex flex-col items-center justify-center gap-4 -mr-2">
        <NavLink
          to="/form-download"
          onClick={onLinkClick}
          className="flex flex-col items-center text-neutral-400 hover:text-cream transition-colors"
        >
          <Download className="mb-2.5 mt-3 w-8 h-8 text-paleHoney" />
          <span className="font-oxanium text-[15px] mb-2">Downloads</span>
        </NavLink>

        <NavLink
          to="#"
          onClick={onLinkClick}
          className="flex flex-col items-center text-neutral-400 hover:text-cream transition-colors"
        >
          <PieChart className="mb-2.5 mt-3 w-8 h-8 text-paleHoney" />
          <span className="font-oxanium text-[15px] mb-2">Dashboard</span>
        </NavLink>

      </div>

      {/* t-separator */}
      <div className="relative flex items-center justify-center h-full">
        <div className="absolute h-30 w-[1px] bg-transparent" />
        <div className="absolute top-[50%] left-1/2 -translate-x-1/2 -translate-y-full w-10 h-[1px] bg-transparent" />
      </div>

      <div className="flex flex-col items-center justify-center gap-4 -ml-2">
        <NavLink
          to="#"
          onClick={onLinkClick}
          className="flex flex-col items-center text-neutral-400 hover:text-cream transition-colors"
        >
          <Plug className="mb-2.5 mt-3 w-8 h-8 text-paleHoney" />
          <span className="font-oxanium text-[15px] mb-2">Public API</span>
        </NavLink>

        <NavLink
          to="/fec-mirror"
          onClick={onLinkClick}
          className="flex flex-col items-center text-neutral-400 hover:text-cream transition-colors"
        >
          <Server className="mb-2.5 mt-3 w-8 h-8 text-paleHoney" />
          <span className="font-oxanium text-[15px] mb-2">FEC Mirror</span>
        </NavLink>
      </div>
    </div>
  );
};

export default ResourcesSubmenu;
