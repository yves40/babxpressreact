import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import path from 'path';
import responseheader from './services/responseheader.js';
import datetime from './services/datetime.js';
import process from 'process';
import { getBooksCount, getSelectedBooks, getAuthorBooks } from './services/books.js';
import { getTopAuthors, getAuthorsCount } from './services/authors.js';
import { getEditorsCount, getTopEditors } from './services/editors.js';
import helpers from './services/helpers.js';
import sqlHelper from './services/sqlHelper.js';

const app = express();
const port = 5000;
const thedate = datetime.getDateTime();
let db = null;
const version = 'server.js:1.17, Aug 062026 ';

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
app.get('/api/authors/top', async (req, res) => {
  try {
    const topauthors = await getTopAuthors(20);  
    res.json({status: 'success', topauthors });
  } catch (error) {
    console.error('Error fetching top authors:', error);
    res.json({ status: 'error', message: 'Réessayer SVP', topauthors: [] });
  }
}); 
// -----------------------------------
app.get('/api/authors/count', async (req, res) => {
  try {
    const count = await getAuthorsCount();  
    res.json({status: 'success', count });
  } catch (error) {
    console.error('Error fetching authors count:', error);
    res.json({ status: 'error', message: 'Réessayer SVP', count: 0 });
  }
}); 
// -----------------------------------
app.get('/api/editors/count', async (req, res) => {
  try {
    const count = await getEditorsCount();  
    res.json({status: 'success', count });
  } catch (error) {
    console.error('Error fetching editors count:', error);
    res.json({ status: 'error', message: 'Réessayer SVP', count: 0 });
  }
}); 
// -----------------------------------
app.get('/api/editors/top', async (req, res) => {
  try {
    const topeditors = await getTopEditors(20);  
    res.json({status: 'success', topeditors });
  } catch (error) {
    console.error('Error fetching top editors:', error);
    res.json({ status: 'error', message: 'Réessayer SVP', topeditors: [] });
  }
}); 
// -----------------------------------
app.post('/api/books/search', async (req, res) => {  

  console.log(`******* ${JSON.stringify(req.body.params)}`);
  
  let p = req.body.params;
  if(p === undefined || p === null) {
    p = req.body; // Fallback to req.body if params is not provided as we use a rest client directly
  }
  console.log(`Search criteria received: ${JSON.stringify(p)}`);
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
