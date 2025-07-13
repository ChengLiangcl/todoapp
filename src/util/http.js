const postRequest = async (url, data, headers = {}) => {
  try {
    const response = await fetch(url, {
      method: 'POST',
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

const check = async (url, data, header={})=>{

}
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

export { postRequest };
