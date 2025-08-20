const backendUrl = process.env.REACT_APP_BACKEND_API_BASE_URL;
const Authorization = `Bearer ${localStorage.getItem('token')}` || null;

const postRequest = async (url, data, headers = {}) => {
  console.log(`${backendUrl}/${url}`);
  try {
    const response = await fetch(`${backendUrl}/${url}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json', // MUST be this exact string
        Authorization,
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
    const response = await fetch(`${backendUrl}/${url}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization,
        ...headers,
      },
    });
    return await response.json();
  } catch (error) {
    throw error;
  }
};

const putRequest = async (url, data, headers = {}) => {
  try {
    const response = await fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization,
        ...headers,
      },
      body: JSON.stringify(data),
    });
    return await response.json();
  } catch (error) {
    throw error;
  }
};

const deleteRequest = async (url, headers = {}) => {
  try {
    const response = await fetch(`${backendUrl}/${url}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization,
        ...headers,
      },
    });
    return await response.json();
  } catch (error) {
    throw error;
  }
};

export { postRequest, getRequest, putRequest, deleteRequest };
