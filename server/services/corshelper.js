//----------------------------------------------------------------------------
//    corshelper.js
//
//    Feb 01 2019   Initial, from myenv.js
//    Feb 08 2019   Add jwt as an allowed header
//    Mar 06 2019   console.log replaced by logger
//    Oct 22 2019   Project cams-bootstrap
//    Oct 23 2019   Blocked by CORS, once again ;-(
//                  Problem fixed by adding a response handler in express 
//                  middleware. Look at responseheader.js
//                  useful URL: https://github.com/expressjs/cors/blob/master/README.md
//    Nov 20 2019   No jwt in header here
//    Feb 26 2020   vboxnode deployment, change a few things about CORS and
//                  corsclientorigin
//    Mar 09 2020   zerasp deployment
//    Mar 26 2020   zerasp deployment with a browser from android tablet
//    Mar 28 2020   Trying to solve multi test environments problems
//    Apr 06 2020   Tests for corsclient
//    Nov 29 2021   RYZEN setup
//    May 15 2027   Module syntax
//    May 17 2027   Remove logs
//----------------------------------------------------------------------------
const Version = "corshelper:1.34, May 17 2027 ";


// CORS sites enabled for cross server requests
// This list gives one valid client per nodejs running node
const origindef = 'http://127.0.0.1:5000';
const corsclients = [
  { node: 'RYZEN', origin: 'http://localhost:8080' },
  { node: 'ASUSP7', origin: 'http://127.0.0.1:5000' },
  { node: 'localhost', origin: 'https://bab.couteaux-dart.fr' },
];

import logger from './logger.js';

function getClientSite(nodename) {
  // logger.debug(Version + `getClientSite called with nodename ${nodename}`);
  let origin = origindef; // In case no match is found
  // const nodename = process.env.COMPUTERNAME;
  for (let i=0; i < corsclients.length; ++i) {
    if (corsclients[i].node === nodename) {
      origin = corsclients[i].origin;
      break;
    }
  }
  return origin;
}

function checkOrigin(origin, callback) {
  if (origin === undefined) { // Do not want to block REST tools or server-to-server requests
    callback(null, true);
  }
  else { // origin is specified
    if (getClientSite(origin.split(':')[1].substr(2)) === origin) {
      callback(null, true)
    } else {
      logger.error(Version + (origin === null ? 'Local node': origin) + ' not allowed by CORS');
      callback(new Error('Not allowed by CORS'));
    }
  }
}

const corsOptions = {
  'origin': checkOrigin,
  'methods': 'GET,HEAD,PUT,PATCH,POST,DELETE',
  'preflightContinue': false,
  'optionsSuccessStatus': 204,
  'credentials': true,
  'allowedHeaders': ['Content-Type', 'Authorization'],
};

function getCORSOptions   () {
  return corsOptions;
};

const corshelper = {
  getCORSOptions: getCORSOptions,
  getClientSite: getClientSite,
};
export default corshelper;
