import { useState } from 'react';

const useApiRequest = (apiRequest) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  const sendRequest = async (...args) => {
    setLoading(true);
    setError(null);
    try {
      const responseData = await apiRequest(...args);
      setData(responseData);
    } catch (err) {
      setError(err.message || 'Something went wrong');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { sendRequest, loading, error, data, setData };
};

export default useApiRequest;
