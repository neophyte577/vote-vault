import { useEffect } from "react";
import { NavLink } from "react-router-dom";
import { HashLink } from "react-router-hash-link";

const MobileMenu = ({ menuOpen, setMenuOpen }) => {

  return (
    <div
      className={`fixed left-0 w-full bg-[rgba(10,10,10,0.8)] z-69 flex flex-col items-center justify-center
                  transition-all duration-300 ease-in-out
                  ${menuOpen ? "top-0 opacity-100 pointer-events-auto" : "top-[-100vh] opacity-0 pointer-events-none"}
                `}
      style={{ height: "100vh" }} 
    >
      <button
        onClick={() => setMenuOpen(false)}
        className="absolute top-6 right-6 text-paleHoney text-3xl focus:outline-none cursor-pointer"
        aria-label="Close Menu"
      >
        ✖
      </button>

      <HashLink
        to="/#home"
        onClick={() => setMenuOpen(false)}
        className="text-3xl font-orbitron font-semibold text-paleHoney my-4 transition-opacity duration-300"
      >
        Home
      </HashLink>
      <HashLink
        to="/#about"
        onClick={() => setMenuOpen(false)}
        className="text-3xl font-orbitron font-semibold text-paleHoney my-4 transition-opacity duration-300"
      >
        About
      </HashLink>
      <HashLink
        to="/#resources-mobile"
        onClick={() => setMenuOpen(false)}
        className="text-3xl font-orbitron font-semibold text-paleHoney my-4 transition-opacity duration-300"
      >
        Resources
      </HashLink>
      <HashLink
        to="/#contact"
        onClick={() => setMenuOpen(false)}
        className="text-3xl font-orbitron font-semibold text-paleHoney my-4 transition-opacity duration-300"
      >
        Contact
      </HashLink>
      <HashLink
        to="/#donate"
        onClick={() => setMenuOpen(false)}
        className="text-3xl font-orbitron font-semibold text-paleHoney my-4 transition-opacity duration-300"
      >
        Donate
      </HashLink>
      <NavLink
        to="/form-download"
        onClick={() => setMenuOpen(false)}
        className="text-3xl font-orbitron font-semibold text-paleHoney my-4 transition-opacity duration-300"
      >
        Get Data
      </NavLink>
    </div>
  );
};

export default MobileMenu;
