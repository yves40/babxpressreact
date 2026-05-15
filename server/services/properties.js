//----------------------------------------------------------------------------
//    properties.js
//
//    Oct 11 2019   Initial
//    Oct 12 2019   Add node server port
//    Oct 15 2019   Debug level and ports
//    Oct 16 2019   Getter for loglevel info
//                  mongodb URL set to local host
//    Oct 22 2019   Axios URL prefix
//    Oct 23 2019   Wrong nodeserver URL
//    Oct 24 2019   Centralize mongodb checking delay
//    Oct 25 2019   Define logger levels here.
//    Oct 28 2019   Start using the mongo cams schema.
//    Oct 29 2019   Add a user / password for later use with mongo.
//                  Start work on JWT
//    Nov 03 2019   Axios
//    Nov 05 2019   Shorten the mongo monitoring delay
//                  Parameter for the timer in corestore
//    Nov 13 2019   No trace for mongo
//    Nov 29 2019   Timer to 1sec : Externalize session duration time
//    Dec 03 2019   Variable to define alert delay before killing the session
//    Dec 05 2019   Test session expiration 
//    Dec 08 2019   Reset session expiration time
//    Dec 11 2019   Query on mongolog : lines limit parameter
//    Dec 12 2019   session expiration in debug mode (shorter)
//    Dec 20 2019   session expiration in debug mode (longer)
//    Jan 05 2020   Mongodb bind listen on WIFI address
//                  Seems to be 10 times quicker...
//    Jan 14 2020   WIP on multiple deployment hosts for mongodbserver 
//    Jan 17 2020   session duration
//    Jan 20 2020   asusp4 now accesses mongodb in asusp7
//    Feb 01 2020   Mongodb interval check when connection lost
//    Feb 08 2020   In airport
//    Feb 12 2020   Property for log list max number of lines
//    Feb 25 2020   vboxnode deployment
//    Feb 26 2020   vboxnode deployment, change a few things about CORS and
//                  corsclientorigin. Now managed by corshelper
//    Mar 01 2020   zerasp deployment
//    Mar 04 2020   camsapi test
//    Mar 17 2020   ASUSP7 mongodb url updated
//    Mar 21 2020   nodeservercandidates
//    Mar 22 2020   Add IPs
//    Mar 25 2020   Add symbolic names to nodeservercandidates
//    Apr 04 2020   Change symbolic names for nodeservercandidates
//    Jul 17 2021   Fix typo error 
//    Nov 29 2021   set up mongodb params for RYZEN
//----------------------------------------------------------------------------
// eslint-disable-next-line no-unused-vars
const Version = 'properties:1.59, Jul 17 2021 ';

// Core timer used to display the hour in the bottom bar
const COREDELAY = 1000;
// The webpack dev server
const webserver = process.env.WEBSERVER || "http://localhost:8080";
const webserverport = process.env.WEBSERVERPORT || 8080;
// The node server : Put this camspi in your hosts or DNS
const nodeserver =  process.env.NODESERVER || 'http://camsapi:8081';
const nodeserverport = process.env.NODESERVERPORT || 8081;
const nodeservercandidates = [
    { url: 'http://camsapi:8081', name: 'camsapi'},
    { url: 'http://localhost:8081', name: 'dev machine'},
    { url: 'http://zerasp:8081', name: 'zerasp'},
    { url: 'http://192.168.47.168:8081', name: 'Pi 4 IP'}, // For my tab and phone
    { url: 'http://192.168.47.166:8081', name: 'vboxnode IP'},
  ];
// Trace HTTP calls to express
const httptrace = false;
// Define the logger level
const DEBUG = 0;
const INFORMATIONAL = 1;
const WARNING = 2;
const ERROR = 3;
const FATAL = 4;
const loggerlevel = DEBUG;  // This one sets the tracing level of the app
// JWT stuff
const jwtconfig = {  
    jwtSecret: process.env.NODESECRET || 'thisisthesecretkey' ,
    jwtSession: {session: false},
};

// User session duration in seconds
const tokenexpirationdelay = 600;
const tokenexpirationalert = 60;    // Display a message in menu to inform user session is soon expired
// Log list max number of lines (see Logs.vue)
const LOGLISTMAX = 200;

 const properties = {
    webserver: webserver,
    webserverport: webserverport,
    nodeserverport: nodeserverport,
    nodeservercandidates: nodeservercandidates,
    loggerlevel: loggerlevel,
    nodeserver: nodeserver,
    COREDELAY,
    httptrace: httptrace,
    DEBUG,
    INFORMATIONAL,
    WARNING,
    ERROR,
    FATAL,
    LOGLISTMAX,
    jwtconfig,
    tokenexpirationdelay,
    tokenexpirationalert,
}
export default properties;