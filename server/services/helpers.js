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

import filehelper  from './filehelper.js';
import path from 'path';
const module = 'HELPERS'
const Version = "helpers:1.04, May 28 2026 ";
//----------------------------------------------------------------------------
// Check for .env file existence
//----------------------------------------------------------------------------
// Must be called from an ASYNC function
//----------------------------------------------------------------------------
async function findEnvFile() {
  let message = 'Environment file not found';
  let fp = '';
  console.log(`${module} ************************* search for ./.env.local file`);
  if(await filehelper.fileExists('./.env.local')) {
      message = 'Found .env.local configuration file';
      fp = './.env.local';
      return { message: message, filepath: fp};
  }
  console.log(`${module} ************************* search for ./.env file`);
  if(await filehelper.fileExists('./.env')) {
    message = 'Found .env configuration file';
    fp = './.env';
      return { message: message, filepath: fp};
  }
  console.log(`${module} ************************* search for ./.env  with resolve()  `);
  const __dirname = path.dirname('.');
  if(await filehelper.fileExists(path.resolve(__dirname, '../.env'))) {
    message = 'Found .env configuration file in parent directory';
    fp = path.resolve(__dirname, '../.env');
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
