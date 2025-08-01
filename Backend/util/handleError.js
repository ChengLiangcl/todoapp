const handleError = (error) => {
  if (error.code === 11000) {
    const key = Object.keys(error.keyValue)[0];
    return {
      status: 400,
      message: `${key} can't be duplicated, try to enter a unique ${key}`,
    };
  }

  return {
    status: 500,
    error: error.message,
  };
};

module.exports = handleError;
