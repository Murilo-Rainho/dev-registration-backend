import express from 'express';

import { config as dotenvConfig } from 'dotenv';

import { getAllDevs } from './controller/devs';

dotenvConfig();

const app = express();

app.use(express.json());

const PORT = process.env.PORT || 8080;

app.get('/dev', getAllDevs);

app.listen(PORT, () => {
  console.log(`Backend rodando na porta ${PORT}`);
});
