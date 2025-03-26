import React from "react";
import { ArrowRight } from "lucide-react";
import clsx from "clsx"; 

export const InteractiveHoverButton = React.forwardRef(
  ({ children, className, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={clsx(
          "group relative w-fit cursor-pointer overflow-hidden rounded-full border bg-background px-6 py-3 font-semibold transition-all duration-300",
          className
        )}
        {...props}
      >
        {/* Content wrapper that determines button size */}
        <div className="relative flex items-center justify-center gap-2 min-w-[75px] h-[21px]">
          {/* Default view: dot + text */}
          <div className="absolute inset-0 flex items-center justify-center gap-2 transition-opacity duration-300 group-hover:opacity-0">
            <div className="h-2 w-2 rounded-full bg-black transition-transform duration-500 group-hover:scale-[100.8]" />
            <span>{children}</span>
          </div>

          {/* Hover view: text + arrow */}
          <div className="absolute inset-0 flex items-center justify-center gap-2 opacity-0 transition-opacity duration-300 delay-100 group-hover:opacity-100">
            <span>{children}</span>
            <text className="text-paleHoney text-sm">➤</text>
          </div>
        </div>
      </button>
    );
  }
);

InteractiveHoverButton.displayName = "InteractiveHoverButton";
