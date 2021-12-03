import { createPool } from 'mysql2/promise';

import { config as dotenvConfig } from 'dotenv';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

dotenvConfig({
  path: path.resolve(__dirname, './.env'),
});

const connection = createPool({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
});

export default connection;
