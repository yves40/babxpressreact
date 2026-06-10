/* eslint-disable no-unused-vars */
import { useContext, useState, useEffect, useRef, useLayoutEffect } from "react"
import { useSelector, useDispatch } from "react-redux";
import { setMenuState, setScreenstate } from "../redux/menustate";
import { Link } from "react-router"
import NavbarTop from './NavbarTop';
import properties from "../services/properties";


export default function Navbar() {
  
  const modulename = 'Navbar.jsx # ';
  const version = "Navbar.jsx Jun 06 2026, 1.48 ";
  const thenav = useRef(null);    // Manage main menu
  const dispatch = useDispatch();
  // Get some UI state from redux store, and set local state for menu visibility
  const [menustate, setMenuState] = useState(useSelector((state) => state.UIstate.menustate));
  const screenstate = useSelector((state) => state.UIstate.screenstate);

  useEffect(() => {
    console.log(`${modulename} *** MOUNTING ${version}`);
  }, [])

  useEffect(() => {
    if(menustate && screenstate !== 'lg') {
        console.log(`${modulename} *** MENU OR SCREEN CHANGED ${menustate}/${screenstate}`); 
        thenav.current.classList.remove("slide-right-out");
        thenav.current.classList.add("slide-right-in");
      } else {
        thenav.current.classList.remove("slide-right-in");
        thenav.current.classList.add("slide-right-out");
      }
  }, [menustate, screenstate]);


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
      dispatch(setScreenstate({screenstate: breakpoint}));
      // Switch menu on in large screen, off in smaller screens
      properties.setMenuState(breakpoint === 'lg');
      properties.setActiveBreakpoint(breakpoint);
    }
    window.addEventListener('resize', updateSize);
    updateSize();
    return () => window.removeEventListener('resize', updateSize);
  });

  return (
    // Look in globals.css for classes definitions
    <>
      <NavbarTop></NavbarTop>
      <nav className="nav" ref={thenav}>
        <div className="topmenu">
          <div className="nav-links">
            <ul>
              {properties.getMenuStatus() && (properties.getActivePage() === 'booksearch') &&
                <li>
                  <Link to="/" onClick={() => dispatch(setMenuState(false))} >Home</Link>
                </li>
              }
              {properties.getMenuStatus() && (properties.getActivePage() === 'home') &&
                <li>
                  <Link to="/BooksSearch" onClick={() => dispatch(setMenuState(false))}>Search Books</Link>
                </li>
           }
            </ul>
          </div>
        </div>
      </nav>
    </>
  )
}


