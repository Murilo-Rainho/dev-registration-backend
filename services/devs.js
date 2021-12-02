import {
  getAllDevs as modelGetAllDevs,
  createDev as modelCreateDev,
} from "../model/devs.js";

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

export const getAllDevs = async () => {
  const resultOfQueryWithAllDevs = await modelGetAllDevs();

  const objectErrorOrNo = validateGetAllDevsOrLevels(resultOfQueryWithAllDevs);
  if (objectErrorOrNo.message) return objectErrorOrNo;

  return {
    results: resultOfQueryWithAllDevs,
    status: 200,
  };
};

export const createDev = async (objInfoForInsertADev) => {
  const resultOfQueryOfCreateADev = await modelCreateDev(objInfoForInsertADev);

  const objectErrorOrNo = validateInsertDevOrLevel(resultOfQueryOfCreateADev);
  if (objectErrorOrNo.message) return objectErrorOrNo;

  return {
    inserted: { id: resultOfQueryOfCreateADev.insertId, ...resultOfQueryOfCreateADev },
    response: resultOfQueryOfCreateADev,
    status: 201,
  };
};
