/* eslint-disable no-unused-vars */
//----------------------------------------------------------------------------
//    Jun 04 2026   Initial
//----------------------------------------------------------------------------
import Logger from "../classes/Logger";

const Version = 'babxpressreact Jun 06 2026, 1.16 ';
const modulename = 'properties.js # ';
const logger = new Logger(modulename);
let menustate = true;          // Menu is visible or not
let activeBreakpoint = 'mobile'; // mobile, sm, md, lg, xl
let activepage = 'home';

const setMenuState = (status) => {menustate = status;}
const toggleMenuStatus = () => {menustate = !menustate;}
const getMenuStatus = () => menustate;
const setActiveBreakpoint = (breakpoint) => {activeBreakpoint = breakpoint;}
const getActiveBreakpoint = () => activeBreakpoint;
const setActivePage = (page) => {activepage = page;}
const getActivePage = () => activepage;

const properties = {
    version: Version,
    setMenuState: setMenuState,
    getMenuStatus: getMenuStatus,
    toggleMenuStatus: toggleMenuStatus,
    setActiveBreakpoint: setActiveBreakpoint,
    getActiveBreakpoint: getActiveBreakpoint,
    setActivePage: setActivePage,
    getActivePage: getActivePage
}

export default properties;
