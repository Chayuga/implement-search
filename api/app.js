import express from 'express';
import cors from 'cors';
import { Users } from './users.js';

const app = express();
const port = 3000;

app.use(cors());

app.get('/', (req, res) => {
  const { q } = req.query;

  const keys = ['first_name', 'last_name', 'email'];

  const search = (data) => {
    return data.filter((item) => keys.some((key) => item[key].toLowerCase().includes(q)));
  };

  res.json(search(Users));
});

app.listen(port, () => {
  console.log(`API is working on port: ${port}`);
});
