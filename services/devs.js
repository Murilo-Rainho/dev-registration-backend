import { getAllDevs as modelGetAllDevs } from "../model/devs.js";

export const getAllDevs = async () => {
  const resultOfQueryWithAllDevs = await modelGetAllDevs();
  return resultOfQueryWithAllDevs;
};
