import { useState } from 'react';
import { postRequest } from '../../util/http';
import useApiRequest from '../../hooks/form/useApiRequest';
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
  const { sendRequest, error, data, loading } = useApiRequest(postRequest);

  // Handle input value change
  const changeHandler = (e) => {
    const { name, value } = e.target;

    setInputs((prevInputs) => {
      const field = prevInputs[name];
      const isTouched = touched[name] ?? false;
      const isValid = field?.validationFn
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
      (input) => !input.error && input.value !== ''
    );
  };

  const formReset = () => {
    const resetInputs = Object.entries(initialInputs).reduce(
      (acc, [key, field]) => {
        acc[key] = {
          ...field,
          value: '',
          error: false,
          helperText: '',
        };
        return acc;
      },
      {}
    );
    setInputs(resetInputs);
    setTouched({});
  };

  const getFormData = (e) => {
    const formData = new FormData(e.target);
    return Object.fromEntries(formData.entries());
  };

  const formSubmissionHandler = async (e, url) => {
    e.preventDefault();
    if (!validateAll()) {
      return;
    }
    const formData = getFormData(e);
    try {
      await sendRequest(url, formData);
      formReset();
    } catch (error) {
      return error;
    }
  };

  return {
    inputs,
    touched,
    setInputs,
    setTouched,
    changeHandler,
    blurHandler,
    validateAll,
    getFormData,
    formSubmissionHandler,
    error,
    data,
    loading,
  };
};

export default useForm;
