const backendUrl = process.env.REACT_APP_BACKEND_API_BASE_URL;
const postRequest = async (url, data, headers = {}) => {
  try {
    const response = await fetch(`${backendUrl}/${url}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json', // MUST be this exact string
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        ...headers,
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      const responseBody = await response.json();
      throw new Error(responseBody.message);
    }
    return response.json();
  } catch (error) {
    throw error;
  }
};
const getRequest = async (url, headers = {}) => {
  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'content/type': 'application/json',
        ...headers,
      },
    });
    return await response.json();
  } catch (error) {
    throw error;
  }
};

const putPost = async (url, data, headers = {}) => {
  try {
    const response = await fetch(url, {
      method: 'PUT',
      headers: {
        'content/type': 'application/json',
        ...headers,
      },
      body: JSON.stringify(data),
    });
    return await response.json();
  } catch (error) {
    throw error;
  }
};

export { postRequest, getRequest, putPost };
