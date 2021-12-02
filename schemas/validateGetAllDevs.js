const validateGetAllDevs = (resultOfQueryWithAllDevs) => {
  if (resultOfQueryWithAllDevs.message) {
    const { message } = resultOfQueryWithAllDevs;
    return { message, status: 400 };
  }
  return {};
};

export default validateGetAllDevs;
