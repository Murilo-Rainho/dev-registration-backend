import { getAllDevs as modelGetAllDevs } from "../model/devs";

export const getAllDevs = async () => {
  const resultOfQueryWithAllDevs = await modelGetAllDevs();
  return resultOfQueryWithAllDevs;
};
