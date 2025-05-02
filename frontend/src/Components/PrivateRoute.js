// src/Components/PrivateRoute/PrivateRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem('authToken'); // or your auth method

  return isAuthenticated ? children : <Navigate to="/Login" />;
};

export default PrivateRoute;
