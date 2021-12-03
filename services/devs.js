import {
  getAllDevs as modelGetAllDevs,
  createDev as modelCreateDev,
  deleteDev as modelDeleteDev,
  updateDev as modelUpdateDev,
  getDevByName as modelGetDevByName,
} from "../model/devs.js";

import validateGetDevsOrLevels from "../schemas/validateGetDevsOrLevels.js";
import validateInsertDevOrLevel from "../schemas/validateInsertDevOrLevel.js";
import verifyDeleteDevOrLevel from "../schemas/verifyDeleteDevOrLevel.js";
import verifyUpdateDevOrLevel from "../schemas/verifyUpdateDevOrLevel.js";

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

  const objectErrorOrNo = validateGetDevsOrLevels(resultOfQueryWithAllDevs);
  if (objectErrorOrNo.message) return objectErrorOrNo;

  return {
    results: resultOfQueryWithAllDevs,
    status: 200,
  };
};

export const getDevByName = async (name) => {
  const resultOfQueryWithDev = await modelGetDevByName(name);

  const objectErrorOrNo = validateGetDevsOrLevels(resultOfQueryWithDev);
  if (objectErrorOrNo.message) return objectErrorOrNo;

  return {
    results: resultOfQueryWithDev,
    status: 200,
  };
}

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

export const deleteDev = async (devId) => {
  const resultOfQueryOfDeleteADev = await modelDeleteDev(devId);

  const objectErrorOrNo = verifyDeleteDevOrLevel(resultOfQueryOfDeleteADev);
  if (objectErrorOrNo.message) return objectErrorOrNo;

  return { status: 204 };
};

export const updateDev = async (devId, objInfoForUpdateADev) => {
  const resultOfQueryOfUpdateADev = await modelUpdateDev(devId, objInfoForUpdateADev);

  const objectErrorOrNo = verifyUpdateDevOrLevel(resultOfQueryOfUpdateADev);
  if (objectErrorOrNo.message) return objectErrorOrNo;

  return { status: 200 };
};
