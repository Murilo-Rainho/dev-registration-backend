import {
  getAllLevels as modelGetAllLevels,
  getLevelByName as modelGetLevelByName,
  createLevel as modelCreateLevel,
  deleteLevel as modelDeleteLevel,
  updateLevel as modelUpdateLevel,
} from "../model/levels.js";

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


export const getAllLevels = async ({ limit, offset }) => {
  const resultOfQueryWithAllDevs = await modelGetAllLevels({ limit, offset });

  const objectErrorOrNo = validateGetDevsOrLevels(resultOfQueryWithAllDevs);
  if (objectErrorOrNo.message) return objectErrorOrNo;

  const { previousPage, nextPage } = await getPreviousAndNextPages({
    limit: parseInt(limit), offset: parseInt(offset),
  }, 'level');

  return {
    previousPage,
    nextPage,
    results: resultOfQueryWithAllDevs,
    status: 200,
  };
};

export const getLevelByName = async (queryStringLevelName) => {
  const resultOfQueryWithLevel = await modelGetLevelByName(queryStringLevelName);

  const objectErrorOrNo = validateGetDevsOrLevels(resultOfQueryWithLevel);
  if (objectErrorOrNo.message) return objectErrorOrNo;

  return {
    results: resultOfQueryWithLevel,
    status: 200,
  };
}

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

export const deleteLevel = async (levelId) => {
  const resultOfQueryOfDeleteADev = await modelDeleteLevel(levelId);

  const objectErrorOrNo = verifyDeleteDevOrLevel(resultOfQueryOfDeleteADev);
  if (objectErrorOrNo.message) return objectErrorOrNo;

  return { status: 204 };
};

export const updateLevel = async (levelId, objInfoForUpdateALevel) => {
  const resultOfQueryOfUpdateALevel = await modelUpdateLevel(levelId, objInfoForUpdateALevel);

  const objectErrorOrNo = verifyUpdateDevOrLevel(resultOfQueryOfUpdateALevel);
  if (objectErrorOrNo.message) return objectErrorOrNo;

  return { status: 200 };
};
