import { getAllDevs as modelGetAllDevs } from "../model/devs.js";

import validateGetAllDevs from "../schemas/validateGetAllDevs.js";

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

  const objectErrorOrNo = validateGetAllDevs(resultOfQueryWithAllDevs);
  if (objectErrorOrNo.message) return objectErrorOrNo;

  return {
    results: resultOfQueryWithAllDevs,
    status: 200,
  };
};
