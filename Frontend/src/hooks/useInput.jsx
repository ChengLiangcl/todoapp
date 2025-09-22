import { useState } from 'react';
const useInput = (initialValue, validators) => {
  const [inputs, setInputs] = useState(initialValue);
  const [errors, setErrors] = useState(initialValue);
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
    return Object.values(errors).every((error) => error === '');
  };

  const clickOnConfirm = () => {
    if (!validateAll()) return;
    reset();
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
    clickOnConfirm,
  };
};

export default useInput;
