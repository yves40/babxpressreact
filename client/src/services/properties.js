/* eslint-disable no-unused-vars */
//----------------------------------------------------------------------------
//    Jun 04 2026   Initial
//----------------------------------------------------------------------------
import Logger from "../classes/Logger";

const Version = 'babxpressreact Jun 10 2026, 1.17 ';
const modulename = 'properties.js # ';
const logger = new Logger(modulename);
let menustate = true;          // Menu is visible or not
let activeBreakpoint = ''; // mobile, sm, md, lg, xl
let activepage = 'home';
let screenstate = 'mobile'; // mobile, sm, md, lg, xl

const setMenuState = (status) => {menustate = status;}
const toggleMenuStatus = () => {menustate = !menustate;}
const getMenuStatus = () => menustate;
const setActiveBreakpoint = (breakpoint) => {activeBreakpoint = breakpoint;}
const getActiveBreakpoint = () => activeBreakpoint;
const setActivePage = (page) => {activepage = page;}
const getActivePage = () => activepage;
const setScreenstate = (state) => {screenstate = state;}
const getScreenstate = () => screenstate;

const properties = {
    version: Version,
    setMenuState: setMenuState,
    getMenuStatus: getMenuStatus,
    toggleMenuStatus: toggleMenuStatus,
    setActiveBreakpoint: setActiveBreakpoint,
    getActiveBreakpoint: getActiveBreakpoint,
    setActivePage: setActivePage,
    getActivePage: getActivePage,
    setScreenstate: setScreenstate,
    getScreenstate: getScreenstate
}

export default properties;
