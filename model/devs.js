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
