import React, { useState } from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../components/Navbar'
import MobileMenu from '../components/MobileMenu'

const MainLayout = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <>
        <Navbar menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
        <MobileMenu menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
        <Outlet />
    </>
  );
};

export default MainLayout