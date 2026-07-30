import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import path from 'path';
import responseheader from './services/responseheader.js';
import datetime from './services/datetime.js';
import process from 'process';
import { getBooksCount, getSelectedBooks, getAuthorBooks } from './services/books.js';
import helpers from './services/helpers.js';
import sqlHelper from './services/sqlHelper.js';

const app = express();
const port = 5000;
const thedate = datetime.getDateTime();
let db = null;
const version = 'server.js:1.16, Jul 30 2026 ';

//---------------------------------------------------------------------------------------------------------
// Install middleware responsible for response header settings
//---------------------------------------------------------------------------------------------------------
app.use(responseheader);
app.use(bodyParser.json());

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
    res.json({status: 'success', count });
  } catch (error) {
    console.error('Error fetching books count:', error);
    res.json({ status: 'error', message: 'Error fetching books count', count: 0 });
  }
}); 
// -----------------------------------
app.post('/api/books/search', async (req, res) => {  
  console.log(`******* ${JSON.stringify(req.body.params)}`);
  
  const p = req.body.params;
  const title = p["title"];
  const author = p["author"];
  const editor = p["editor"];
  
  try {
    const selectedbooks = await getSelectedBooks({title, author, editor});  
    res.json({status: 'success',  selectedbooks });
  } catch (error) {
    res.json({ status: 'error', message: error.message, selectedbooks: [] });
  }
}); 
// -----------------------------------
app.post('/api/books/searchbyauthor', async (req, res) => {  
  console.log(`******* ${JSON.stringify(req.body.params)}`);

  const p = req.body.params;
  const authorID = p["authorId"];

  try {
    const selectedbooks = await getAuthorBooks({authorID});  
    res.json({status: 'success',  selectedbooks });
  } catch (error) {
    console.error('Error searching books by author:', error);
    res.json({ status: 'error', message: 'Error searching books by author', selectedbooks: [] });
  }
}); 
// -----------------------------------
app.get('/api/tech/env', async (req, res) => {
  try {
    const serverenv = await helpers.findEnvFile();  
    res.json({status: 'success',  serverenv });
  } 
  catch (error) {
    console.error('Error fetching environment variables:', error);
    res.json({ status: 'error', message: 'Cannot locate environment file' });
  }
}); 


app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
}); 
