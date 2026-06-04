/* eslint-disable no-unused-vars */
import { Link} from "react-router";
import properties from "../services/properties";

export default function NavbarTop() {
  
  const modulename = 'NavbarTop.jsx # ';
  const version = "NavbarTop.jsx May 04 2026, 1.02";

  console.log(`Current page is : ${properties.getActivePage()}`);
  
  return (
    // Look in globals.css for classes definitions
      <div className='navtop'>
        <ul>
          <li className=' my-3 ml-3' key="NAVTOP">
              <Link href="/">
                <img className="svg-white32"  src="/svg/house-solid.svg" alt=""/>
              </Link>
          </li>
        </ul>
      </div>
  )
}
