import connection from "./connection.js";

export const getAllLevels = async ({ limit, offset }) => {
  try {
    const [resultOfQueryWithAllLevels] = await connection.execute(`
      SELECT l.id, l.\`level\`, COUNT(d.\`name\`) devTotal
      FROM levels l
      LEFT JOIN devs d ON d.\`level\` = l.id
      GROUP BY d.\`name\`, l.id, l.\`level\`
      ORDER BY devTotal DESC LIMIT ? OFFSET ?;
    `, [parseInt(limit), parseInt(offset)]);

    if (resultOfQueryWithAllLevels.length === 0) {
      return {
        status: 404,
        message: 'There is no level.',
      };
    }

    return resultOfQueryWithAllLevels;
  } catch ({ sqlMessage, errno }) {
    return {
      status: errno,
      message: sqlMessage,
    };
  }
};

export const getLevelByName = async (queryStringLevelName) => {
  try {
    const LIKEQueryStringLevelName = `%${queryStringLevelName}%`;
    const [resultOfQueryWithLevel] = await connection.execute(`
      SELECT * FROM levels
      WHERE level LIKE ?;
    `, [LIKEQueryStringLevelName]);

    if (resultOfQueryWithLevel.length === 0) {
      return {
        status: 404,
        message: 'There is no level with that name.',
      };
    }

    return resultOfQueryWithLevel;
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
      INSERT INTO levels
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
      DELETE FROM levels
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
    console.log(errno);
    return {
      status: errno,
      message: sqlMessage,
    };
  }
};

export const updateLevel = async (levelId, objInfoForUpdateALevel) => {
  try {
    const { level } = objInfoForUpdateALevel;
    
    const [resultOfQuery] = await connection.execute(`
      UPDATE levels
      SET level = ?
      WHERE id = ?;
    `, [level, levelId]);

    if (resultOfQuery.affectedRows === 0) {
      return {
        status: 400,
        message: 'Has no level with this Id to be update.',
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

export const howManyLevelsAreThere = async () => {
  try {
    const [resultOfQuery] = await connection.execute(`
      SELECT COUNT(*) AS total FROM levels;
    `);

    return resultOfQuery;
  } catch ({ sqlMessage, errno }) {
    return {
      status: errno,
      message: sqlMessage,
    };
  }
}
