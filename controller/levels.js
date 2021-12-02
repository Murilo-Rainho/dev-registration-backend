import {
  getAllLevels as servicesGetAllLevels,
  createLevel as servicesCreateLevel,
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

export const getAllLevels = async (_req, res, _next) => {
  const resultOfQueryWithAllDevs = await servicesGetAllLevels();

  const { status, message, results } = resultOfQueryWithAllDevs;
  if (message) return res.status(status).json({ message }).end();

  res.status(status).json({ results });
};

export const createLevel = async (req, res, _next) => {
  const { levelName } = req.body;
  const resultOfQueryOfCreateALevel = await servicesCreateLevel(levelName);

  const { status, message, inserted, response } = resultOfQueryOfCreateALevel;
  if (message) return res.status(status).json({ message }).end();

  res.status(status).json({ inserted, response });
};
