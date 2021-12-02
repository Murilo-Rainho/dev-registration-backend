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
      (\`level\`) VALUES (?);
    `, [levelName]);
    return resultOfQuery;
  } catch ({ sqlMessage, errno }) {
    return {
      status: errno,
      message: sqlMessage,
    };
  }
};

export const deleteLevel = async (levelId) => {
  try {
    const [resultOfQuery] = await connection.execute(`
      DELETE FROM dev_registration.levels
      WHERE id = ?;
    `, [levelId]);

    if (resultOfQuery.affectedRows === 0) {
      return {
        status: 400,
        message: 'Has no level with this Id to be removed.',
      };
    }

    return resultOfQuery;
  } catch ({ sqlMessage, errno }) {
    return {
      status: errno,
      message: sqlMessage,
    };
  }
};
