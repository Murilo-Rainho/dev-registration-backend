import connection from "./connection.js";

export const getAllDevs = async () => {
  try {
    const [resultOfQueryWithAllDevs] = await connection.execute(`
      SELECT * ROM dev_registration.devs;
    `);
    return resultOfQueryWithAllDevs;
  } catch ({ sqlMessage, errno }) {
    return [{
      code: errno,
      message: sqlMessage,
    }];
  }
};
