import express from 'express';

import { config as dotenvConfig } from 'dotenv';

import { getAllDevs, createDev, deleteDev, updateDev } from './controller/devs.js';
import { getAllLevels, createLevel, deleteLevel } from './controller/levels.js';

dotenvConfig();

const app = express();

app.use(express.json());

const PORT = process.env.PORT || 8080;

app.get('/dev', getAllDevs);
app.get('/level', getAllLevels);

app.post('/dev', createDev)
app.post('/level', createLevel);

app.delete('/dev/:id', deleteDev);
app.delete('/level/:id', deleteLevel);

app.put('/dev/:id', updateDev);
// app.put('/level/:id', );

app.listen(PORT, () => {
  console.log(`Backend rodando na porta ${PORT}`);
});
