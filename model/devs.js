import connection from "./connection";

export const getAllDevs = async () => {
  const resultOfQueryWithAllDevs = await connection.execute(`
    SELECT * FROM devs;
  `);
  return resultOfQueryWithAllDevs;
};
