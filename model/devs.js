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
