import { useCallback } from 'react';
import { useState } from 'react';

const useForm = (initialValues) => {
  const [inputs, setInputs] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  const createFormInputs = useCallback((inputFields) => {
    const result = inputFields.reduce((acc, { name, validationFn }) => {
      acc[name] = {
        value: '',
        name,
        validationFn: validationFn || null,
      };
      return acc;
    }, {});
    setInputs(result);
  }, []);
  // Universal change handler
  const changeHandler = (eOrValue, name) => {
    if (eOrValue?.target) {
      const { name, value } = eOrValue.target;
      setInputs((prev) => ({ ...prev, [name]: { ...prev[name], value } }));
    } else {
      setInputs((prev) => ({
        ...prev,
        [name]: { ...prev[name], value: eOrValue },
      }));
    }
  };

  const onBlurHandler = (eOrName, value) => {
    let name, val;
    if (eOrName?.target) {
      name = eOrName.target.name;
      val = eOrName.target.value;
    } else {
      name = eOrName;
      val = value;
    }

    setTouched((prev) => {
      const updated = { ...prev, [name]: true };
      const validateResult =
        initialValues[name]?.validationFn?.(val, inputs) ?? true;

      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: !validateResult,
      }));

      return updated;
    });
  };

  const validateAll = () => {
    let valid = true;
    Object.entries(inputs).forEach(([name, { value, validationFn }]) => {
      const result = validationFn?.(value, inputs) ?? true;
      if (!result) {
        valid = false;
        setErrors((prev) => ({ ...prev, [name]: true }));
      }
    });
    return valid;
  };

  const reset = () => {
    setInputs(initialValues);
    setErrors({});
    setTouched({});
  };

  const onSubmit = async (e, submitFn) => {
    e.preventDefault();

    // if (!validateAll()) return;

    const form = Object.fromEntries(
      Object.entries(inputs).map(([k, v]) => [k, v.value])
    );

    try {
      await submitFn(form);
    } catch (err) {
      return err;
    }

    reset();
    return form;
  };

  return {
    inputs,
    errors,
    touched,
    changeHandler,
    onBlurHandler,
    validateAll,
    onSubmit,
    reset,
    setInputs,
    setErrors,
    createFormInputs,
  };
};

export default useForm;
