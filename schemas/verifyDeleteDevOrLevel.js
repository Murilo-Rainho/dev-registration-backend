const verifyDeleteDevOrLevel = (queryResult) => {
  if (queryResult.status == 1451) {
    return {
      message: 'This level cannot be deleted as a developer is linked to it.',
      status: 409,
    };
  }
  if (queryResult.message) {
    const { message } = queryResult;
    return { message, status: 400 };
  }
  return {};
};

export default verifyDeleteDevOrLevel;
