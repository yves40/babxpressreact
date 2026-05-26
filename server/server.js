import express from 'express';
import cors from 'cors';
import path from 'path';
import responseheader from './services/responseheader.js';
import datetime from './services/datetime.js';
import process from 'process';
import { getBooksCount } from './services/books.js';
import fileHelper from './services/filehelper.js';
import console, { log } from 'console';

const app = express();
const port = 5000;
const thedate = datetime.getDateTime();
let db = null;
const version = 'server.js:1.14, May 22 2026 ';

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
  // Server static files from the client/dist directory and serve index.html for the root path
  app.use(express.static(path.join(serverpath, '/client/dist')));
  res.sendFile(path.join(serverpath, '/client/dist/index.html'));
});
// -----------------------------------
// API endpoints
// -----------------------------------
app.get('/api/fake', (req, res) => {
  const data = { fruits: ['apple', 'banana', 'orange', 'Pomme', 'Fraise', 'Annanas'] }    ;
  console.log(`Data request from client served with ${data.fruits.length} fruits`);
  res.json(data);
});
// -----------------------------------
app.get('/api/books/count', async (req, res) => {
  try {
    const count = await getBooksCount();  
    res.json({ count });
  } catch (error) {
    console.error('Error fetching books count:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}); 
// -----------------------------------
app.get('/api/tech/env', async (req, res) => {
  try {
    const serverenv = await fileHelper.findEnvFile();  
    res.json({ serverenv });
  } 
  catch (error) {
    console.error('Error fetching environment variables:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}); 


app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
}); 
