import { howManyDevsAreThere } from '../model/devs.js';
import { howManyLevelsAreThere } from '../model/levels.js';

import { config as dotenvConfig } from 'dotenv';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

dotenvConfig({
  path: path.resolve(__dirname, '../.env'),
});

const getPreviousAndNextPages = async ({ limit, offset }, devOrLevelPath, queryStringDevName = '') => {
  let previousPage;
  let nextPage;

  const [{ total }] = (devOrLevelPath === 'dev') ?
    await howManyDevsAreThere() :
    await howManyLevelsAreThere();

  if (offset + limit >= total) {
    nextPage = false;
  } else {
    nextPage = `http://localhost:${process.env.PORT}/${devOrLevelPath}?name=${queryStringDevName}&limit=${(offset + limit > total) ? total - offset : limit}&offset=${offset + limit}`;
  }

  if (offset === 0) {
    previousPage = false;
  } else {
    previousPage = `http://localhost:${process.env.PORT}/${devOrLevelPath}?name=${queryStringDevName}&limit=${limit}&offset=${(offset - limit <= 0) ? 0 : offset - limit}`;
  }

  return { previousPage, nextPage };
};

export default getPreviousAndNextPages;
