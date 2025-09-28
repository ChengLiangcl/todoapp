import { useState, useCallback } from 'react';
const useInput = (initialValue, validators) => {
  const [inputs, setInputs] = useState(initialValue);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  const onChangeHandler = (e, name) => {
    if (e.target) {
      const { name, value } = e.target;
      setInputs((prevInputs) => ({
        ...prevInputs,
        [name]: value,
      }));
      if (validators[name] && touched[name]) {
        const error = validators[name](value, inputs);
        setErrors((prevErrors) => {
          return {
            ...prevErrors,
            [name]: error,
          };
        });
      }
    } else {
      setInputs((prevInputs) => ({
        ...prevInputs,
        [name]: e,
      }));
    }
  };
  const updateInputs = useCallback((updater) => {
    setInputs((prev) =>
      typeof updater === 'function' ? updater(prev) : updater
    );
  }, []);
  const onBlurHandler = (e) => {
    const { name } = e.target;

    setTouched((prev) => {
      return {
        ...prev,
        [name]: true,
      };
    });

    if (validators[name]) {
      const error = validators[name](inputs[name], inputs);
      setErrors((prevErrors) => {
        return {
          ...prevErrors,
          [name]: error,
        };
      });
    }
  };
  const validateAll = () => {
    const updatedErrors = {};
    let isValid = true;
    for (const key in inputs) {
      const error = validators[key] ? validators[key](inputs[key], inputs) : '';
      updatedErrors[key] = error;
      if (error) isValid = false;
    }
    setErrors(updatedErrors);
    return isValid;
  };

  const reset = () => {
    setErrors({});
    setTouched({});
    setInputs({});
  };
  return {
    inputs,
    errors,
    touched,
    onChangeHandler,
    onBlurHandler,
    validateAll,
    reset,
    setInputs,
    updateInputs,
  };
};

export default useInput;
