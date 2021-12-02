import connection from "./connection.js";

export const getAllDevs = async () => {
  console.log('testando');
  const resultOfQueryWithAllDevs = await connection.execute(`
    SELECT * FROM devs;
  `);
  console.log('query', resultOfQueryWithAllDevs);
  return resultOfQueryWithAllDevs;
};
