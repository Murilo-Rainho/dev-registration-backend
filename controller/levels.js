import {
  getAllLevels as servicesGetAllLevels,
  getLevelByName as servicesGetLevelByName,
  createLevel as servicesCreateLevel,
  deleteLevel as servicesDeleteLevel,
  updateLevel as servicesUpdateLevel,
} from "../services/levels.js";

// GET METHODS
// The default return from services is:
// OK: Return an object with a key 'results' with all query and a key
// 'status' with the correct status;
// ERROR: Return an object with a key 'status' with the status code
// and a key 'message' with any description of error.

// POST METHODS
// The default return from services is:
// OK: Return an object with a key 'inserted' with complete element inserted,
// a key 'status' with the correct status and a key 'response' with
// all informations about the insertion;
// ERROR: Return an object with a key 'status' with the status code
// and a key 'message' with any description of error.

export const getLevels = async (req, res, _next) => {
  const { level, limit = 10, offset = 0 } = req.query;

  const resultOfQueryWithAllDevs = (level) ? 
    await servicesGetLevelByName(level) :
    await servicesGetAllLevels({ limit, offset });

  const { status, message, ...response } = resultOfQueryWithAllDevs;
  if (message) return res.status(status).json({ message }).end();

  res.status(status).json({ ...response });
};

export const createLevel = async (req, res, _next) => {
  const { levelName } = req.body;
  const resultOfQueryOfCreateALevel = await servicesCreateLevel(levelName);

  const { status, message, inserted, response } = resultOfQueryOfCreateALevel;
  if (message) return res.status(status).json({ message }).end();

  res.status(status).json({ inserted, response });
};

export const deleteLevel = async (req, res, _next) => {
  const { id: levelId } = req.params;

  const resultOfQueryOfDeleteALevel = await servicesDeleteLevel(levelId);

  const { status, message } = resultOfQueryOfDeleteALevel;
  if (message) return res.status(status).send({ message });

  res.status(204).send({ message: 'Level has been removed.' });
};

export const updateLevel = async (req, res, _next) => {
  const { id: levelId } = req.params;
  const { level } = req.body;

  const resultOfQueryOfUpdateALevel = await servicesUpdateLevel(levelId, { level });

  const { status, message } = resultOfQueryOfUpdateALevel;
  if (message) return res.status(status).send({ message });

  res.status(status).send({ message: 'Level has been updated.' });
};
