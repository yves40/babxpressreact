/*----------------------------------------------------------------------------
    Oct 23 2019   Initial ; use express middleware to address CORS
                  The idea is to set attributes in the response header
    Oct 31 2019   Manage "equest header field authorization is not allowed by 
                  Access-Control-Allow-Headers in preflight response" error
    Feb 26 2020   Change cors client validation
    May 15 2027   Module syntax
----------------------------------------------------------------------------*/
const Version = 'responseheader.js:1.06, May 15 2027 ';
import corshelper from './corshelper.js';
import logger from './logger.js';

// Define the function installed by Express in server.js initialization

const responseheader = (req, res, next ) => {
  // Set the client address for the server  to inform the client browser that he will 
  // accept requests from him : can only specify one URI
  logger.debug(corshelper.getClientSite(req.hostname));  
  res.set('Access-Control-Allow-Origin', corshelper.getClientSite(req.hostname));   
  res.set('Access-Control-Allow-Credentials', 'true');
  res.set('Access-Control-Allow-Headers', corshelper.getCORSOptions().allowedHeaders);
  next();
};

export default responseheader;

