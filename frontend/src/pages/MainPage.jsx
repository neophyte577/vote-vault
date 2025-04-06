import { useEffect, useState } from "react";
import { useContentLoaded } from "../contexts/ContentLoadContext";
import { LoadingScreen } from "../components/LoadingScreen";
import { Home } from "../sections/Home";
import { Resources } from "../sections/Resources";
import { Contact } from "../sections/Contact";
import { About } from "../sections/About";
import { ResourcesMobile } from "../sections/ResourcesMobile";

function MainPage() {
  const [showLoader, setShowLoader] = useState(false);
  const [exiting, setExiting] = useState(false);
  const [showMainContent, setShowMainContent] = useState(false);
  const [initialized, setInitialized] = useState(false);
  const setIsLoaded = useContentLoaded();

  useEffect(() => {
    const hasVisited = localStorage.getItem("hasVisited");

    if (!hasVisited) {
      setShowLoader(true);
    } else {
      setIsLoaded(true);
      setShowMainContent(true);
    }

    setInitialized(true);
  }, [setIsLoaded]);

  const handleLoaderComplete = () => {
    localStorage.setItem("hasVisited", "true");
    setExiting(true);
    setTimeout(() => {
      setShowLoader(false);
      setShowMainContent(true);  
      setIsLoaded(true);
    }, 700);
  };

  if (!initialized) return null;

  return (
    <>
      {showLoader && (
        <LoadingScreen
          onComplete={handleLoaderComplete}
          exiting={exiting}
        />
      )}

      {showMainContent && (
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

export default MainPage;
