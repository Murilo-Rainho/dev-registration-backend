import {
  getAllLevels as modelGetAllLevels,
  createLevel as modelCreateLevel,
} from "../model/levels.js";

import validateGetAllDevsOrLevels from "../schemas/validateGetAllDevsOrLevels.js";
import validateInsertDevOrLevel from "../schemas/validateInsertDevOrLevel.js";

// The default return from validation functions is:
// OK: Return an empty object;
// ERROR: Return an object with a key 'status' with the status code
// and a key 'message' with any description of error.

// The default return from model is:
// OK: Return an array with the query;
// ERROR: Return an object with a key 'status' with the status code
// and a key 'message' with any description of error.


export const getAllLevels = async () => {
  const resultOfQueryWithAllDevs = await modelGetAllLevels();

  const objectErrorOrNo = validateGetAllDevsOrLevels(resultOfQueryWithAllDevs);
  if (objectErrorOrNo.message) return objectErrorOrNo;

  return {
    results: resultOfQueryWithAllDevs,
    status: 200,
  };
};

export const createLevel = async (levelName) => {
  const resultOfQueryOfCreateALevel = await modelCreateLevel(levelName);

  const objectErrorOrNo = validateInsertDevOrLevel(resultOfQueryOfCreateALevel);
  if (objectErrorOrNo.message) return objectErrorOrNo;

  return {
    inserted: { id: resultOfQueryOfCreateALevel.insertId, levelName },
    response: resultOfQueryOfCreateALevel,
    status: 201,
  };
};
