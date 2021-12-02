import { getAllDevs as servicesGetAllDevs } from "../services/devs";

export const getAllDevs = async () => {
  const resultOfQueryWithAllDevs = await servicesGetAllDevs();
  return resultOfQueryWithAllDevs;
};
