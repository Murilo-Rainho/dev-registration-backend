import {
  getAllDevs as servicesGetAllDevs,
  getDevByName as servicesGetDevByName,
  createDev as servicesCreateDev,
  deleteDev as servicesDeleteDev,
  updateDev as servicesUpdateDev,
} from "../services/devs.js";

// The default return from services is:
// OK: Return an object with a key 'results' with all query and a key
// 'status' with the correct status.
// ERROR: Return an object with a key 'status' with the status code
// and a key 'message' with any description of error.

export const getDevs = async (req, res, _next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  const { name, limit = 10, offset = 0 } = req.query;

  const resultOfQueryWithDevs = (name) ?
    await servicesGetDevByName(name) :
    await servicesGetAllDevs({ limit, offset });

  const { status, message, ...response } = resultOfQueryWithDevs;
  if (message) {
    return res.status(400).json({ message }).end();
  }

  res.status(status).json({ ...response });
};

export const createDev = async (req, res, _next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  const { level, name, gender, birthday_date, age, hobby } = req.body;
  const resultOfQueryOfCreateADev = await servicesCreateDev({
    level, name, gender, birthday_date, age, hobby,
  });

  const { status, message, inserted, response } = resultOfQueryOfCreateADev;
  if (message) return res.status(status).json({ message }).end();

  res.status(status).json({ inserted, response });
};

export const deleteDev = async (req, res, _next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  const { id: devId } = req.params;

  const resultOfQueryOfDeleteADev = await servicesDeleteDev(devId);

  const { status, message } = resultOfQueryOfDeleteADev;
  if (message) return res.status(status).send({ message });

  res.status(status).send({ message: 'Dev has been removed.' });
};

export const updateDev = async (req, res, _next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  const { id: devId } = req.params;
  const { level, name, gender, birthday_date, age, hobby } = req.body;

  const resultOfQueryOfUpdateADev = await servicesUpdateDev(devId, {
    level, name, gender, birthday_date, age, hobby,
  });

  const { status, message } = resultOfQueryOfUpdateADev;
  if (message) return res.status(status).send({ message });

  res.status(status).send({ message: 'Dev has been updated.' });
};
