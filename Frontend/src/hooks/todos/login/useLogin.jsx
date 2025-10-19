import { useState } from 'react';
import useInput from '../../form/useInput';
import { postRequest } from '../../../util/http';
export const useLogin = () => {
  const { errors, inputs, onBlurHandler, onChangeHandler } = useInput(
    {},
    {
      username: (value, _) =>
        value?.length === 0 ? 'username is required' : '',
      password: (value, _) =>
        value?.length === 0 ? 'password is required' : '',
    }
  );
  const [loading, setLoading] = useState(false);
  const [loginError, setLoginError] = useState(false);
  const [loginData, setLoginData] = useState(null);

  const [banner, setBanner] = useState({
    visible: false,
    severity: '',
    message: '',
  });
  const loginSubmissionHandler = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await postRequest('auth/login', inputs);
      setLoginData(res);
      setLoading(false);
    } catch (error) {
      const msg = error?.message || 'Something went wrong';
      setBanner({ visible: true, severity: 'error', message: msg });
      setLoginError(true);
    } finally {
      setLoading(false);
    }
  };

  return {
    inputs,
    errors,
    loginError,
    loading,
    loginSubmissionHandler,
    setBanner,
    banner,
    loginData,
    onBlurHandler,
    onChangeHandler,
    setLoginError,
  };
};
