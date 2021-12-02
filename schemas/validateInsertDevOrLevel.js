const validateInsertDevOrLevel = (queryResponse) => {
  if (queryResponse.message) {
    const { message } = queryResponse;
    return { message, status: 400 };
  }
  return {};
};

export default validateInsertDevOrLevel;
