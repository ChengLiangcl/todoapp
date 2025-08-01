import { useState } from 'react';

const useHttpRequest = (httpMethod) => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const triggerRequest = async (...args) => {
    setLoading(true);
    try {
      const data = await httpMethod(...args);
      setData(data);
    } catch (err) {
      setError(err.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };
  return { triggerRequest, loading, data, error, setData };
};

export default useHttpRequest;
