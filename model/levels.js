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

export const getLevelByName = async (queryStringLevelName) => {
  try {
    const LIKEQueryStringLevelName = `%${queryStringLevelName}%`;
    const [resultOfQueryWithLevel] = await connection.execute(`
      SELECT * FROM dev_registration.levels
      WHERE level LIKE ?;
    `, [LIKEQueryStringLevelName]);
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

export const updateLevel = async (levelId, objInfoForUpdateALevel) => {
  try {
    const { level } = objInfoForUpdateALevel;
    
    const [resultOfQuery] = await connection.execute(`
      UPDATE dev_registration.levels
      SET level = ?
      WHERE id = ?;
    `, [level, levelId]);

    console.log(resultOfQuery);
  
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
