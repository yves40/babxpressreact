import express from 'express';
import cors from 'cors';
const app = express();
const port = 5000;
const corsOptions= {
    origin: 'http://127.0.0.1:5500', // React app's URL
}

app.use(cors(corsOptions));

app.get('/', (req, res) => {
  res.send('Hello, World!');
});

app.get('/api', (req, res) => {
  const data = { fruits: ['apple', 'banana', 'orange', 'Pomme', 'Fraise'] }    ;
  console.log(`Data request from client served with ${data.fruits.length} fruits`);
  
  res.json(data);
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
}); 
