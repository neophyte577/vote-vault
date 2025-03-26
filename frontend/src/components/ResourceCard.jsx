import React from 'react'
import { NavLink } from 'react-router-dom';

export const ResourceCard = ({
    title,
    description,
    link,
    color = "blue",
    linkText = "Let's Gooo",
    variant = "default",
    children,
  }) => {
    const linkColorMap = {
      blue: "text-blue-400 hover:text-blue-300",
      red: "text-red-400 hover:text-red-300",
      green: "text-green-400 hover:text-green-300",
    };
  
    const linkClasses = linkColorMap[color] || linkColorMap.blue;
  
    if (variant === "mobile") {
      return (
        <div
          className={`
            glass p-6 px-4 rounded-xl border border-white/10 w-full transition-all
            hover:-translate-y-1
            ${
              color === "blue"
                ? "hover:border-blue-500/30 hover:shadow-[0_0_10px_rgba(59,130,246,0.5)]"
                : ""
            }
            ${
              color === "red"
                ? "hover:border-red-500/30 hover:shadow-[0_0_10px_rgba(239,68,68,0.4)]"
                : ""
            }
          `}
        >
          <h3 className="text-xl font-orbitron font-bold mb-3 text-paleHoney">{title}</h3>
          <p className="text-gray-400 mb-2 break-words whitespace-normal">{description}</p>
  
          {children}
  
          {link && (
            <div className="flex justify-between items-center mt-2">
              <NavLink to={link} className={`${linkClasses} transition-colors mt-1`}>
                {linkText} →
              </NavLink>
            </div>
          )}
        </div>
      );
    }
  
    // default (desktop)
    return (
      <div
        className={`
          glass p-12 rounded-2xl border border-white/10 transition-all
          hover:-translate-y-1
          min-w-[440px] max-w-[480px] min-h-[360px] text-cream
          flex flex-col justify-between
          ${
            color === "blue"
              ? "hover:border-blue-500/30 hover:shadow-[0_0_12px_rgba(59,130,246,0.5)]"
              : ""
          }
          ${
            color === "red"
              ? "hover:border-red-500/30 hover:shadow-[0_0_12px_rgba(239,68,68,0.4)]"
              : ""
          }
        `}
      >
        <div>
          <h3 className="text-2xl font-orbitron font-bold mb-4 text-paleHoney">{title}</h3>
          <p className="text-cream mb-6 text-lg break-words whitespace-normal">{description}</p>
          {children}
        </div>

        {link && (
          <div className="mt-auto pt-4">
            <NavLink
              to={link}
              className={`${linkClasses} text-lg transition-colors font-medium`}
            >
              {linkText} →
            </NavLink>
          </div>
        )}
      </div>
    );
  };
  