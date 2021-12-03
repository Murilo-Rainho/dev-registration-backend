const validateGetDevsOrLevels = (resultOfQueryWithAllDevsOrLevels) => {
  if (resultOfQueryWithAllDevsOrLevels.message) {
    const { message } = resultOfQueryWithAllDevsOrLevels;
    return { message, status: 400 };
  }
  return {};
};

export default validateGetDevsOrLevels;