import express from 'express';
import cors from 'cors';
import { Users } from './users.js';

const app = express();
const port = 3000;

app.use(cors());

app.get('/', (req, res) => {
  res.json(Users);
});

app.listen(port, () => {
  console.log(`API is working on port: ${port}`);
});
