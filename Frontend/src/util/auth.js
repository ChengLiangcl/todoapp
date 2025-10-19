import { redirect } from 'react-router';

const getToken = () => {
  return localStorage.getItem('token');
};

const setToken = (data) => {
  localStorage.setItem('token', data.token);
};

const isLoggedIn = () => {
  let token = getToken();
  if (!token) {
    throw redirect('http://localhost:3001/login');
  }
  return null;
};

const logout = () => {
  localStorage.removeItem('token');
  redirect('/login');
};

export { getToken, setToken, isLoggedIn, logout };
