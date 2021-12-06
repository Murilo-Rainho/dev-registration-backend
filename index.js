import express from 'express';

import { config as dotenvConfig } from 'dotenv';
import cors from 'cors';

import { getDevs, createDev, deleteDev, updateDev } from './controller/devs.js';
import { getLevels, createLevel, deleteLevel, updateLevel } from './controller/levels.js';

dotenvConfig();

const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 8080;

app.use(function(_req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/', (_req, res, _next) => {
  const levelGetUrl = 'https://dev-registration-backend.herokuapp.com/level';
  const devGetUrl = 'https://dev-registration-backend.herokuapp.com/dev';
  const message = 'This is the root of backend! Try a Get, Post, Put or Delete (WARNING) in any routes down'

  res.status(200).json({ message, devGetUrl, levelGetUrl, port: PORT });
});

app.get('/dev', getDevs);
app.get('/level', getLevels);

app.post('/dev', createDev)
app.post('/level', createLevel);

app.delete('/dev/:id', deleteDev);
app.delete('/level/:id', deleteLevel);

app.put('/dev/:id', updateDev);
app.put('/level/:id', updateLevel);

app.listen(PORT, () => {
  console.log(`Backend rodando na porta ${PORT}`);
});
