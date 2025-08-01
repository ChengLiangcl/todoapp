const inputReducer = (inputList) => {
  return inputList.reduce((acc, { name, helperText, validationFn }) => {
    return {
      ...acc,
      [name]: {
        value: '',
        name,
        validationFn,
      },
    };
  }, {});
};

export { inputReducer };
