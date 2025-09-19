import { useCallback, useState } from 'react';

const useForm = (initialValues) => {
  const [inputs, setInputs] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [files, setFiles] = useState([]);
  const [coverPhoto, setCoverPhoto] = useState(null);

  // Initialize form inputs with validationFn
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

  // Blur handler — sets touched and updates errors
  const onBlurHandler = (eOrName, value) => {
    let name, val;
    if (eOrName?.target) {
      name = eOrName.target.name;
      val = eOrName.target.value;
    } else {
      name = eOrName;
      val = value;
    }

    setTouched((prev) => ({ ...prev, [name]: true }));

    const validateResult = inputs[name]?.validationFn?.(val, inputs) ?? true;

    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: !validateResult,
    }));
  };

  // Validate all fields
  const validateAll = () => {
    let valid = true;
    const newErrors = {};

    Object.entries(inputs).forEach(([name, inputObj]) => {
      const result = inputObj.validationFn?.(inputObj.value, inputs) ?? true;
      newErrors[name] = !result;
      if (!result) valid = false;
    });

    setErrors(newErrors);
    setTouched((prev) => ({
      ...prev,
      ...Object.keys(inputs).reduce((acc, k) => ({ ...acc, [k]: true }), {}),
    }));

    return valid;
  };

  // Reset form
  const reset = () => {
    setInputs(initialValues);
    setErrors({});
    setTouched({});
  };

  // Form submission
  const onSubmit = async (e, submitFn) => {
    e.preventDefault();
    if (!validateAll()) return;

    const formData = new FormData(e.target);

    files.forEach((file) => formData.append('files', file));

    // Append cover photo
    if (coverPhoto) formData.append('coverPhoto', coverPhoto);

    try {
      await submitFn(formData);
    } catch (err) {
      return err;
    }

    reset();
    return formData;
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
    files,
    setFiles,
    coverPhoto,
    setCoverPhoto,
  };
};

export default useForm;
