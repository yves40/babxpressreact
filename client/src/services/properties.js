/* eslint-disable no-unused-vars */
//----------------------------------------------------------------------------
//    Jun 04 2026   Initial
//----------------------------------------------------------------------------
import Logger from "../classes/Logger";

const Version = 'babxpressreact Jun 4 2026, 1.13 ';
const modulename = 'properties.js # ';
const logger = new Logger(modulename);
logger.debug('Module loaded');
let menustatus = true;          // Menu is visible or not

const setMenuStatus = (status) => {menustatus = status;}
const getMenuStatus = () => menustatus;
const toggleMenuStatus = () => {
    menustatus = !menustatus;
    logger.debug(`Menu status toggled : ${menustatus}`);
}

const properties = {
    version: Version,
    setMenuStatus: setMenuStatus,
    getMenuStatus: getMenuStatus,
    toggleMenuStatus: toggleMenuStatus
}

export default properties;
