import { useState } from 'react';

const useForm = (initialValues, httpFn) => {
  const [inputs, setInputs] = useState(initialValues);
  const [errors, setErrors] = useState({});

  const [touched, setTouched] = useState({});

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setInputs((prev) => ({ ...prev, [name]: { ...prev[name], value } }));
  };

  const onBlurHandler = (e) => {
    const { name, value } = e.target;

    setTouched((prev) => {
      const updated = { ...prev, [name]: true };

      console.log(initialValues);
      const validateResult =
        initialValues[name].validationFn(value, inputs) ?? true;

      validateResult && updated[name]
        ? setErrors((prevErrors) => ({ ...prevErrors, [name]: false }))
        : setErrors((prevErrors) => ({ ...prevErrors, [name]: true }));

      return updated;
    });
  };

  const validateAll = () => {
    return true;
    // return Object.entries(inputs).every(
    //   ([name, value]) => errors[name] === false && value !== ''
    // );
  };
  const reset = () => {
    setInputs(initialValues);
    setErrors({});
    setTouched({});
  };

  const onSubmit = (e, url) => {
    e.preventDefault();
    const data = new FormData(e.target);
    const form = Object.fromEntries(data.entries());
    if (!validateAll()) {
      return;
    }

    try {
      httpFn(url, form);
    } catch (error) {
      return;
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
  };
};

export default useForm;
