const verifyDeleteDevOrLevel = (queryResult) => {
  if (queryResult.message) {
    const { message } = queryResult;
    return { message, status: 400 };
  }
  return {};
};

export default verifyDeleteDevOrLevel;
