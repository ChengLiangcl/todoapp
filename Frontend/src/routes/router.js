import { createBrowserRouter } from 'react-router-dom';
import React from 'react';
import LoginPage from '../pages/LoginPage';
import ErrorPage from '../pages/ErrorPage';
import SignupPage from '../pages/SignupPage';
import DashBoard from '../pages/DashBoard';
import Layout from '../pages/Layout';
import { isLoggedIn } from '../util/auth';
import TodoPage from '../pages/TodoPage';
const router = createBrowserRouter([
  {
    path: '/login',
    element: <LoginPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/signup',
    element: <SignupPage />,
  },
  {
    path: '/',
    element: <Layout />,
    loader: isLoggedIn,
    children: [
      {
        path: '/dashboard',
        element: <DashBoard />,
      },
      {
        path: '/todo',
        element: <TodoPage />,
      },
    ],
  },
]);

export default router;
