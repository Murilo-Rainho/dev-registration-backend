import express from 'express';

import { config as dotenvConfig } from 'dotenv';

import { getAllDevs, createDev } from './controller/devs.js';
import { getAllLevels, createLevel } from './controller/levels.js';

dotenvConfig();

const app = express();

app.use(express.json());

const PORT = process.env.PORT || 8080;

app.get('/dev', getAllDevs);
app.get('/level', getAllLevels);
app.post('/dev', createDev)
app.post('/level', createLevel);

app.listen(PORT, () => {
  console.log(`Backend rodando na porta ${PORT}`);
});
