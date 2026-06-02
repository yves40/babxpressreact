//----------------------------------------------------------------------------
//    helpers.js
//
//    Oct 29 2019   Initial
//    Oct 31 2019   basic syntax error
//    Nov 20 2019   Async call function
//    Jan 19 2020   Debounce function
//    May 28 2026   Search for .env file
//----------------------------------------------------------------------------
// eslint-disable-next-line no-unused-vars
import process from 'process';
import filehelper  from './filehelper.js';
import path from 'path';
const module = 'HELPERS'
const Version = "helpers:1.05, May 31 2026 ";
//----------------------------------------------------------------------------
// Check for .env file existence
//----------------------------------------------------------------------------
// Must be called from an ASYNC function
//----------------------------------------------------------------------------
async function findEnvFile() {
  // console.log(`${module} ************************* Process directory is : ${process.cwd()} `);
  let message = 'Environment file not found';
  let fp = '';
  // Search for .env.local file first, then .env file in the process current directory
  // This works in DEV
  if(await filehelper.fileExists('./.env.local')) {
      message = 'Found .env.local configuration file';
      fp = './.env.local';
      return { message: message, filepath: fp};
  }
  // Search for .env file in the process current directory
  // In case we have a .env file in the project root directory and the node process is launched 
  // from the server directory, we need to search for ../.env file as well
  if(await filehelper.fileExists('./.env')) {
    message = 'Found .env configuration file';
    fp = './.env';
      return { message: message, filepath: fp};
  }
  // Search for server/.env file  in case the node process is launched from the server directory 
  // instead of the project root directory
  if(await filehelper.fileExists('server/.env')) {
    message = 'Found server/.env configuration file';
    fp = 'server/.env';
      return { message: message, filepath: fp};
  }
  return { message: message, filepath: fp};
}


//----------------------------------------------------------------------------
// Super sleep function ;-)
// Must be called from an ASYNC function
//----------------------------------------------------------------------------
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

//----------------------------------------------------------------------------
// Get IP from a request
//----------------------------------------------------------------------------
function getIP(req) {
    var ip = req.headers['x-forwarded-for'] || 
    req.connection.remoteAddress || 
    req.socket.remoteAddress ||
    req.connection.socket.remoteAddress;
    return ip.replace(/f/gi, '').replace(/:/gi, '');
}

const asyncMiddleware = fn =>
  (req, res, next) => {
    Promise.resolve(fn(req, res, next))
      .catch(next);
  };

function debounce (fn, delay) {
    var timeoutID = null
    return function () {
      clearTimeout(timeoutID)
      var args = arguments
      var that = this
      timeoutID = setTimeout(function () {
        fn.apply(that, args)
      }, delay)
    }
}

const helpers = {
    sleep,
    getIP,
    sleep,
    getIP,
    asyncMiddleware,
    debounce,
    findEnvFile,
}
export default helpers;
