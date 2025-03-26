import { useEffect } from "react";
import { NavLink, useLocation } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';
import NavItem from './NavItem';
import { VoteVaultIcon } from "./VoteVaultIcon";
import { ScrollProgress } from "../animations/ScrollProgress";
import { useScrollSpy } from '../hooks/useScrollSpy';

const Navbar = ({ menuOpen, setMenuOpen }) => {
  const location = useLocation();

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
  }, [menuOpen]);

  const linkClass = (to) => {
    const isActive = location.pathname + location.hash === to;
    return isActive ? "text-lg text-paleHoney hover:text-cream transition-colors" : "text-paleHoney hover:text-cream transition-colors";
  };

  const isMainPage =
    location.pathname === "/" &&
    (!location.hash || location.hash.startsWith("#"));


  const sectionIds = ['home', 'about', 'resources', 'contact', 'donate'];
  const rawActiveSection = useScrollSpy(sectionIds, 100);
  const activeSection = isMainPage ? rawActiveSection : '';

  return (
    <nav className="fixed top-0 w-full z-40 bg-[rgba(10, 10, 10, 0.7)] backdrop-blur-sm border-b border-white/10 shadow-lg">
      <div className="max-w-5xl mx-auto px-7">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-2">
            <span className="translate-y-[4px] translate-x-[4px]">
              <VoteVaultIcon className="w-7 h-7 md:w-8 md:h-8 text-paleHoney" />
            </span>
            <NavLink to="/" className="font-mono text-xl md:text-[22px] font-bold text-cream">
              <span className="text-paleHoney">vault.</span>
              <span className="text-blue-500">v</span>
              <span className="text-red-500">o</span>
              <span className="text-blue-500">t</span>
              <span className="text-red-500">e</span>
            </NavLink>
          </div>

          {!menuOpen && (
            <div
              className="relative cursor-pointer z-40 md:hidden text-paleHoney text-3xl"
              onClick={() => setMenuOpen((prev) => !prev)}
            >
              ☰
            </div>
          )}

          <div className="hidden md:flex items-center space-x-7">
            <NavItem to="/#home" label="Home" active={activeSection === 'home'} />
            <NavItem to="/#about" label="About" active={activeSection === 'about'} />
            <NavItem to="/#resources" label="Resources" active={activeSection === 'resources'} />
            <NavItem to="/#contact" label="Contact" active={activeSection === 'contact'} />
            <NavItem to="/#donate" label="Donate" active={activeSection === 'donate'} />
            <NavItem to="/form-download" label="Get Data" type="route" shiny />
          </div>
        </div>
      </div>

      {isMainPage && <ScrollProgress />}
    </nav>
  );
};

export default Navbar;
