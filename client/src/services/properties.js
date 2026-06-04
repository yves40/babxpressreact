/* eslint-disable no-unused-vars */
//----------------------------------------------------------------------------
//    Jun 04 2026   Initial
//----------------------------------------------------------------------------
import Logger from "../classes/Logger";

const Version = 'babxpressreact Jun 4 2026, 1.14 ';
const modulename = 'properties.js # ';
const logger = new Logger(modulename);
let menustatus = true;          // Menu is visible or not
let activeBreakpoint = 'mobile'; // mobile, sm, md, lg, xl
let activepage = 'home';

const setMenuStatus = (status) => {menustatus = status;}
const getMenuStatus = () => menustatus;
const toggleMenuStatus = () => {
    menustatus = !menustatus;
    logger.debug(`Menu status toggled : ${menustatus}`);
}
const setActiveBreakpoint = (breakpoint) => {activeBreakpoint = breakpoint;}
const getActiveBreakpoint = () => activeBreakpoint;
const setActivePage = (page) => {activepage = page;}
const getActivePage = () => activepage;

const properties = {
    version: Version,
    setMenuStatus: setMenuStatus,
    getMenuStatus: getMenuStatus,
    toggleMenuStatus: toggleMenuStatus,
    setActiveBreakpoint: setActiveBreakpoint,
    getActiveBreakpoint: getActiveBreakpoint,
    setActivePage: setActivePage,
    getActivePage: getActivePage
}

export default properties;
