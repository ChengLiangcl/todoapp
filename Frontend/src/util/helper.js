export const inputReducer = (inputList) => {
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

export const saveState = (key, value) => {
  try {
    const serializedState = JSON.stringify(value);
    localStorage.setItem(key, serializedState);
    return true;
  } catch (error) {
    return undefined;
  }
};

export const getState = (key) => {
  try {
    const serializedState = localStorage.getItem(key);

    if (key === 'page') {
      console.log(serializedState);
    }
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (error) {
    return undefined;
  }
};
