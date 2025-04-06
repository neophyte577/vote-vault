import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';
import MobileMenu from '../components/MobileMenu';
import { ContentLoadContext } from '../contexts/ContentLoadContext'; 

const MainLayout = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isContentLoaded, setIsContentLoaded] = useState(false); 

  return (
    <>
      <Navbar menuOpen={menuOpen} setMenuOpen={setMenuOpen} isContentLoaded={isContentLoaded} />
      <MobileMenu menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
      <ContentLoadContext.Provider value={setIsContentLoaded}>
        <Outlet />
      </ContentLoadContext.Provider>
    </>
  );
};

export default MainLayout;
