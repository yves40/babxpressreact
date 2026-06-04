/* eslint-disable no-unused-vars */
import { useContext, useState, useEffect, useRef, useLayoutEffect } from "react"
import { Link } from "react-router"
import NavbarTop from './NavbarTop';
import properties from "../services/properties";


export default function Navbar() {
  
  const modulename = 'Navbar.jsx # ';
  const logtracker = 'APP # ';
  const version = "Navbar.jsx Apr 02 2026, 1.44";

  // On component mount, check if user is logged
  useEffect(() => {    
  }, [])
  
  console.log(`Current page is : ${properties.getActivePage()}`);

  // Determine active breakpoint, based on tailwind standard definitions
  function getActiveBreakpoint() {
    if (window !== undefined) {
      if (window.matchMedia('(min-width: 1280px)').matches) {
          return 'xl';
      } else if (window.matchMedia('(min-width: 1024px)').matches) {
          return 'lg';
      } else if (window.matchMedia('(min-width: 768px)').matches) {
          return 'md';
      } else if (window.matchMedia('(min-width: 640px)').matches) {
          return 'sm';
      } else {
          return 'mobile';
      }
    }
  };
  // Handle window resize to get current size
  useLayoutEffect(() => {
    function updateSize() {
      const breakpoint = getActiveBreakpoint();
      properties.setMenuStatus(breakpoint !== 'mobile');
      properties.setActiveBreakpoint(breakpoint);
    }
    window.addEventListener('resize', updateSize);
    updateSize();
    return () => window.removeEventListener('resize', updateSize);
  }, []);
  
  
  
  return (
    // Look in globals.css for classes definitions
    <>
      <NavbarTop></NavbarTop>
      <nav className="nav">
        <div className="topmenu">
          <div className="nav-links">
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/BooksSearch">Search Books</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  )
}


