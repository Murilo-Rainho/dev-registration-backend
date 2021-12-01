import express from 'express';

import { config as dotenvConfig } from 'dotenv';

dotenvConfig();

const app = express();

app.use(express.json());

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Backend rodando na porta ${PORT}`);
});
