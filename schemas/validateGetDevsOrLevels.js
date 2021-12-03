const validateGetDevsOrLevels = (resultOfQueryWithDevsOrLevels) => {
  if (resultOfQueryWithDevsOrLevels.message) {
    const { message } = resultOfQueryWithDevsOrLevels;
    return { message, status: 400 };
  }

  return {};
};

export default validateGetDevsOrLevels;
