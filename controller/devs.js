import { getAllDevs as servicesGetAllDevs } from "../services/devs.js";

// The default return from services is:
// OK: Return an object with a key 'results' with all query and a key
// 'status' with the correct status.
// ERROR: Return an object with a key 'status' with the status code
// and a key 'message' with any description of error.

export const getAllDevs = async (_req, res, _next) => {
  const resultOfQueryWithAllDevs = await servicesGetAllDevs();

  const { status, message, results } = resultOfQueryWithAllDevs;
  if (message) {
    return res.status(status).json({ message }).end();
  }

  res.status(status).json({ results });
};
