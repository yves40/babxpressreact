/* eslint-disable no-unused-vars */
import { Link} from "react-router";
import properties from "../services/properties";
import Home from "../app/Home";

export default function NavbarTop() {
  
  const modulename = 'NavbarTop.jsx # ';
  const version = "NavbarTop.jsx May 05 2026, 1.04";  
  
  return (
    // Look in globals.css for classes definitions
      <div className='navtop'>
        <ul>
          <li className=' my-3 ml-3' key="NAVTOP">
              <Link to="/">
                <img className="svg-white32"  src="/svg/house-solid.svg" alt=""/>
              </Link>
          </li>
        </ul>
      </div>
  )
}
