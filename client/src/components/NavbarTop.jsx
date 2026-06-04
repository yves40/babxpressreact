/* eslint-disable no-unused-vars */
import { Link} from "react-router";
export default function NavbarTop() {
  
  const modulename = 'NavbarTop.jsx # ';
  const version = "NavbarTop.jsx May 04 2026, 1.02";
  
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
