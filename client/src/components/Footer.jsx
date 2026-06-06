/* eslint-disable no-unused-vars */
import { useContext, useState } from "react";
import properties from "../services/properties";
import { useDispatch } from 'react-redux'
import { setMenuState } from "../redux/menustate";

function Footer({parentHandler}) {

  const dispatch = useDispatch();

  function toggleMenu() {
    properties.toggleMenuStatus();
    dispatch(setMenuState({menuvisible: properties.getMenuStatus()}));
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