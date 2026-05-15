import express from 'express';
import cors from 'cors';
import path from 'path';
import responseheader from './services/responseheader.js';

const app = express();
const port = 5000;
const __dirname = path.resolve();
const corsOptions= {
    origin:  [
      'http://127.0.0.1:5000', 
      'http://localhost:5000'
    ], // React app's URL
}

app.use(express.static(path.join(__dirname, '../client/dist')));
//---------------------------------------------------------------------------------------------------------
// Install middleware responsible for response header settings
//---------------------------------------------------------------------------------------------------------
app.use(responseheader);
// app.use(cors(corsOptions));


app.get('/', (req, res) => {
  res.send('Hello, World!');
});

app.get('/api', (req, res) => {
  const data = { fruits: ['apple', 'banana', 'orange', 'Pomme', 'Fraise', 'Annanas'] }    ;
  console.log(`Data request from client served with ${data.fruits.length} fruits`);
  res.json(data);
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
}); 
