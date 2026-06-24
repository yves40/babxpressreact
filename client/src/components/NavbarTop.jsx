/* eslint-disable no-unused-vars */
import { Link} from "react-router";
import { useDispatch } from "react-redux";
import { setMenuState } from "../redux/menustate";
import properties from "../services/properties";
import Home from "../app/Home";

export default function NavbarTop() {
  
  const modulename = 'NavbarTop.jsx # ';
  const version = "NavbarTop.jsx Jun 18 2026, 1.05";  

  const dispatch = useDispatch();
  
  return (
    // Look in globals.css for classes definitions
      <div className='navtop'>
        <ul className=" flex flex-row">
          <li className=' my-3 ml-3' key="NAVTOP">
              <Link to="/">
                <img className="svg-white32"  src="/svg/house-solid.svg" alt=""/>
              </Link>
          </li>
          <li className=" text-white my-auto ml-6 font-bold text-2xl">
            <Link to="/BooksSearch" onClick={() => dispatch(setMenuState({menuvisible: "false"}))}>Rechercher</Link>
          </li>
        </ul>
      </div>
  )
}
