const postRequest = async (url, data, headers = {}) => {
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json', // MUST be this exact string
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
