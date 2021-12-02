import { createPool } from 'mysql2/promise';

const connection = createPool({
  host: 'localhost',
  user: 'root',
  password: 'murilo123',
  database: 'dev_registration',
});

export default connection;
