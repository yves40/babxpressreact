import express from 'express';
import cors from 'cors';
import path from 'path';
import responseheader from './services/responseheader.js';
import datetime from './services/datetime.js';
import process from 'process';

const app = express();
const port = 5000;
const thedate = datetime.getDateTime();
const version = 'server.js:1.12, May 18 2026 ';

//---------------------------------------------------------------------------------------------------------
// Install middleware responsible for response header settings
//---------------------------------------------------------------------------------------------------------
app.use(responseheader);

app.get('/', (req, res) => {
  let serverpath = path.resolve('./');
  // Check if the resolved path ends with 'server' and if so, get its parent directory  
  // This is to ensure that the server can serve the client files correctly regardless of whether 
  // it's run from the 'server' directory or its parent directory  
  if(serverpath.endsWith('server')) {
    serverpath = path.dirname(serverpath);
  }
  console.log(`***************** ${serverpath}`);
   
  app.use(express.static(path.join(serverpath, '/client/dist')));
  res.sendFile(path.join(serverpath, '/client/dist/index.html'));
});

app.get('/api', (req, res) => {
  const data = { fruits: ['apple', 'banana', 'orange', 'Pomme', 'Fraise', 'Annanas'] }    ;
  console.log(`Data request from client served with ${data.fruits.length} fruits`);
  res.json(data);
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
}); 
