/* eslint-disable no-unused-vars */
import { useContext, useState } from "react";
import properties from "../services/properties";
import timeHelper from "../classes/timeHelper";
import { useDispatch } from 'react-redux'
import { toggleMenuState } from "../redux/menustate";
import { createLocalData, createSessionData } from "../services/browserStorage";
import { createCookie, deleteCookie, getCookie } from "../services/cookiesHelper";

function Footer({parentHandler}) {

  const dispatch = useDispatch();
  const th = new timeHelper();

  async function toggleMenu() {
    
    dispatch(toggleMenuState());
    createSessionData("lastMenuToggle", th.getDateTime());
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