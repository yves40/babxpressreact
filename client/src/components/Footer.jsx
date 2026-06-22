/* eslint-disable no-unused-vars */
import { useContext, useEffect, useState } from "react";
import properties from "../services/properties";
import timeHelper from "../classes/timeHelper";
import { useDispatch } from 'react-redux'
import { toggleMenuState } from "../redux/menustate";
import { getCookie } from "../services/cookiesHelper";

function Footer({parentHandler}) {

  const modulename = 'Footer.jsx # ';
  const version = "Footer.jsx Jun 18 2026, 1.06 ";  
  const dispatch = useDispatch();
  const th = new timeHelper();

  let menuvisibility = getCookie("menustate");

  async function toggleMenu() {
    dispatch(toggleMenuState(!menuvisibility));
  }

  return (
    <footer className="footer">
      <ul>
        <li>
          <h2 className='my-4 font-light'>{properties.version}</h2>
        </li>
        <li className="footer__pizzabox" key="PIZZABOX">
            <img className="svg-white48" onClick={toggleMenu}
                  src="/svg/bars-solid.svg" alt="" />
        </li>        
      </ul>
    </footer>
  )
}

export default Footer


/**
 * 
 *  C O D E        R E S E R V O I R
 *     
 * createSessionData("lastMenuToggle", th.getDateTime());
    createSessionData("lastMenuState", properties.getMenuStatus());
    createLocalData("lastMenuToggle", th.getDateTime());
    createLocalData("lastMenuState", properties.getMenuStatus());
    const cookiemenustate = await getCookie("lastMenuState");
    if(cookiemenustate === '') {
      console.log(`****** toggleMenu CREATE cookies`);
      createCookie("lastMenuToggle", th.getDateTime());
      createCookie("lastMenuState", properties.getMenuStatus());
    }
    else {
      console.log(`****** toggleMenu DELETE cookies`);
      deleteCookie("lastMenuToggle");
      deleteCookie("lastMenuState");
    }

 */