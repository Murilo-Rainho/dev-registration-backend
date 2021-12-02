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

export const createLevel = async (levelName) => {
  try {
    const [resultOfQuery] = await connection.execute(`
      INSERT INTO dev_registration.levels
      (level) VALUES (?);
    `, [levelName]);
    return resultOfQuery;
  } catch ({ sqlMessage, errno }) {
    return {
      status: errno,
      message: sqlMessage,
    };
  }
};
