const verifyUpdateDevOrLevel = (queryResult) => {
  if (queryResult.message) {
    const { message } = queryResult;
    return { message, status: 400 };
  }
  return {};
};

export default verifyUpdateDevOrLevel;
