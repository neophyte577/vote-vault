import { useState } from "react";
import "../App.css";
import "../index.css";
import { LoadingScreen } from "../components/LoadingScreen";
import { Home } from "../sections/Home";
import { Resources } from "../sections/Resources";
import { Contact } from "../sections/Contact";
import { About } from "../sections/About";
import { ResourcesMobile } from "../sections/ResourcesMobile"

function Main() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      {/* {!isLoaded && <LoadingScreen onComplete={() => setIsLoaded(true)} />}
      <div
        className={`min-h-screen transition-opacity duration-700 ${
          isLoaded ? "opacity-100" : "opacity-0"
        } bg-black text-gray-100`}
      > */}
      <Home />
      <About />
      <div className="hidden md:block">
        <Resources />
      </div>
      <div className="block md:hidden">
        <ResourcesMobile />
      </div>
      <Contact />
    </>
  );
}

export default Main;
