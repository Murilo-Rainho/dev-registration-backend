import connection from "./connection.js";

export const getAllDevs = async ({ limit, offset }) => {
  try {
    const [resultOfQueryWithAllDevs] = await connection.execute(`
      SELECT * FROM devs
      LIMIT ? OFFSET ?;
    `, [parseInt(limit), parseInt(offset)]);

    if (resultOfQueryWithAllDevs.length === 0) {
      return {
        status: 404,
        message: 'There is no dev.',
      };
    }

    return resultOfQueryWithAllDevs;
  } catch ({ sqlMessage, errno }) {
    return {
      status: errno,
      message: sqlMessage,
    };
  }
};

export const getDevByName = async (queryStringDevName) => {
  try {
    const LIKEQueryStringDevName = `%${queryStringDevName}%`;
    const [resultOfQueryWithDev] = await connection.execute(`
      SELECT * FROM devs
      WHERE name LIKE ?;
    `, [LIKEQueryStringDevName]);

    if (resultOfQueryWithDev.length === 0) {
      return {
        status: 404,
        message: 'There is no dev with that name.',
      };
    }

    return resultOfQueryWithDev;
  } catch ({ sqlMessage, errno }) {
    return {
      status: errno,
      message: sqlMessage,
    };
  }
};

export const createDev = async (objInfoForInsertADev) => {
  try {
    const { level, name, gender, birthday_date, age, hobby } = objInfoForInsertADev;
    const [resultOfQuery] = await connection.execute(`
      INSERT INTO devs
      (\`level\`, \`name\`, gender, birthday_date, age, hobby)
      VALUES (?, ?, ?, ?, ?, ?);
    `, [level, name, gender, birthday_date, age, hobby]);
    return resultOfQuery;
  } catch ({ sqlMessage, errno }) {
    return {
      status: errno,
      message: sqlMessage,
    };
  }
};

export const deleteDev = async (devId) => {
  try {
    const [resultOfQuery] = await connection.execute(`
      DELETE FROM devs
      WHERE id = ?;
    `, [devId]);

    if (resultOfQuery.affectedRows === 0) {
      return {
        status: 400,
        message: 'Has no dev with this Id to be remove.',
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

export const updateDev = async (devId, objInfoForUpdateADev) => {
  try {
    const { level, name, gender, birthday_date, age, hobby } = objInfoForUpdateADev;
    
    const [resultOfQuery] = await connection.execute(`
      UPDATE devs
      SET level = ?, \`name\` = ?, gender = ?,
      birthday_date = ?, age = ?, hobby = ?
      WHERE id = ?;
    `, [level, name, gender, birthday_date, age, hobby, devId]);
  
    if (resultOfQuery.affectedRows === 0) {
      return {
        status: 400,
        message: 'Has no dev with this Id to be update.',
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

export const howManyDevsAreThere = async () => {
  try {
    const [resultOfQuery] = await connection.execute(`
      SELECT COUNT(*) AS total FROM devs;
    `);

    return resultOfQuery;
  } catch ({ sqlMessage, errno }) {
    return {
      status: errno,
      message: sqlMessage,
    };
  }
}
