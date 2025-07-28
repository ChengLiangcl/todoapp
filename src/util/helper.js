const inputReducer = (inputList) => {
  return inputList.reduce((acc, { name, helperText, validationFn }) => {
    return {
      ...acc,
      [name]: {
        value: '',
        validationFn,
        helperText,
        error: false,
      },
    };
  }, {});
};

export { inputReducer };
