import connection from "./connection.js";

export const getAllDevs = async () => {
  try {
    const [resultOfQueryWithAllDevs] = await connection.execute(`
      SELECT * FROM dev_registration.devs;
    `);
    return resultOfQueryWithAllDevs;
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
      INSERT INTO dev_registration.devs
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
      DELETE FROM dev_registration.devs
      WHERE id = ?;
    `, [devId]);

    if (resultOfQuery.affectedRows === 0) {
      return {
        status: 400,
        message: 'Has no dev with this Id to be removed.',
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
