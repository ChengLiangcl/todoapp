import { createBrowserRouter } from 'react-router-dom';
import React from 'react';
import LoginPage from '../pages/LoginPage';
import ErrorPage from '../pages/ErrorPage';
import SignupPage from '../pages/SignupPage';
const router = createBrowserRouter([
  {
    path: '/',
    element: <LoginPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/signup',
    element: <SignupPage />,
  },
]);

export default router;
