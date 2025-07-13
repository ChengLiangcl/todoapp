import { useState } from 'react';

/**
 * Custom hook for managing form inputs with validation.
 *
 * @param {Object} initialInputs - Object shape:
 *   {
 *     [name: string]: {
 *       value: string,
 *       validationFn: (value: string, inputs: Object) => boolean,
 *       error: boolean,
 *       helperText: string,
 *     }
 *   }
 * @returns {Object} handlers and state for inputs
 */
const useForm = (initialInputs) => {
  const [inputs, setInputs] = useState(initialInputs);
  const [touched, setTouched] = useState({});

  // Handle input value change
  const changeHandler = (e) => {
    const { name, value } = e.target;

    setInputs((prevInputs) => {
      const field = prevInputs[name];
      const isTouched = touched[name] ?? false;
      const isValid = field.validationFn
        ? field.validationFn(value, prevInputs)
        : true;

      return {
        ...prevInputs,
        [name]: {
          ...field,
          value,
          error: isTouched && !isValid,
          helperText:
            isTouched && !isValid ? initialInputs[name].helperText : undefined,
        },
      };
    });
  };

  // Handle input blur (field loses focus)
  const blurHandler = (e) => {
    const { name, value } = e.target;

    setTouched((prevTouched) => ({
      ...prevTouched,
      [name]: true,
    }));

    setInputs((prevInputs) => {
      const field = prevInputs[name];
      const isValid = field.validationFn
        ? field.validationFn(value, prevInputs)
        : true;

      return {
        ...prevInputs,
        [name]: {
          ...field,
          error: !isValid,
          helperText: !isValid ? initialInputs[name].helperText : undefined,
        },
      };
    });
  };

  const validateAll = () => {
    return Object.values(inputs).every(
      (input) => !inputs.error && input.value != ''
    );
  };

  return {
    inputs,
    touched,
    setInputs,
    setTouched,
    changeHandler,
    blurHandler,
    validateAll,
  };
};

export default useForm;
