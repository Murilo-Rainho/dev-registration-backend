import { getAllDevs as servicesGetAllDevs } from "../services/devs.js";

export const getAllDevs = async (_req, res, _next) => {
  const resultOfQueryWithAllDevs = await servicesGetAllDevs();
  res.status(200).json(resultOfQueryWithAllDevs);
};
