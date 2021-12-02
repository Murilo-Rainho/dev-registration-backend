import connection from "./connection.js";

export const getAllLevels = async () => {
  try {
    const [resultOfQueryWithAllLevels] = await connection.execute(`
      SELECT * FROM dev_registration.levels;
    `);
    return resultOfQueryWithAllLevels;
  } catch ({ sqlMessage, errno }) {
    return {
      status: errno,
      message: sqlMessage,
    };
  }
};
