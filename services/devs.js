import {
  getAllDevs as modelGetAllDevs,
  getDevByName as modelGetDevByName,
  createDev as modelCreateDev,
  deleteDev as modelDeleteDev,
  updateDev as modelUpdateDev,
} from "../model/devs.js";

import validateGetDevsOrLevels from "../schemas/validateGetDevsOrLevels.js";
import validateInsertDevOrLevel from "../schemas/validateInsertDevOrLevel.js";
import verifyDeleteDevOrLevel from "../schemas/verifyDeleteDevOrLevel.js";
import verifyUpdateDevOrLevel from "../schemas/verifyUpdateDevOrLevel.js";
import getPreviousAndNextPages from "../schemas/getPreviousAndNextPages.js";

// The default return from validation functions is:
// OK: Return an empty object;
// ERROR: Return an object with a key 'status' with the status code
// and a key 'message' with any description of error.

// The default return from model is:
// OK: Return an array with the query;
// ERROR: Return an object with a key 'status' with the status code
// and a key 'message' with any description of error.

export const getAllDevs = async ({ limit, offset }) => {
  const resultOfQueryWithAllDevs = await modelGetAllDevs({ limit, offset });

  const objectErrorOrNo = validateGetDevsOrLevels(resultOfQueryWithAllDevs);
  if (objectErrorOrNo.message) return objectErrorOrNo;

  const { previousPage, nextPage } = await getPreviousAndNextPages({
    limit: parseInt(limit), offset: parseInt(offset),
  }, 'dev');

  return {
    previousPage,
    nextPage,
    results: resultOfQueryWithAllDevs,
    status: 200,
  };
};

export const getDevByName = async (queryStringDevName) => {
  const resultOfQueryWithDev = await modelGetDevByName(queryStringDevName);

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
