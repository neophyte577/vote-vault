import { useEffect, useState } from "react";
import "../App.css";
import "../index.css";
import { LoadingScreen } from "../components/LoadingScreen";
import { Home } from "../sections/Home";
import { Resources } from "../sections/Resources";
import { Contact } from "../sections/Contact";
import { About } from "../sections/About";
import { ResourcesMobile } from "../sections/ResourcesMobile";

function Main() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [showLoader, setShowLoader] = useState(false);
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    const hasVisited = localStorage.getItem("hasVisited");
    if (!hasVisited) {
      setShowLoader(true);
    } else {
      setIsLoaded(true);
    }
  }, []);

  const handleLoaderComplete = () => {
    localStorage.setItem("hasVisited", "true");
    setExiting(true);
    setTimeout(() => {
      setShowLoader(false);
      setIsLoaded(true);
    }, 700); // match load screen slideout
  };

  return (
    <>
      {showLoader && (
        <LoadingScreen onComplete={handleLoaderComplete} exiting={exiting} />
      )}

      {isLoaded && (
        <div className="relative w-full min-h-screen overflow-x-hidden">
          <Home />
          <About />
          <div className="hidden md:block">
            <Resources />
          </div>
          <div className="block md:hidden">
            <ResourcesMobile />
          </div>
          <Contact />
        </div>
      )}
    </>
  );
}

export default Main;
