const validateGetDevsOrLevels = (resultOfQueryWithDevsOrLevels) => {
  if (resultOfQueryWithDevsOrLevels.message) {
    const { message, status } = resultOfQueryWithDevsOrLevels;
    return { message, status };
  }

  return {};
};

export default validateGetDevsOrLevels;
