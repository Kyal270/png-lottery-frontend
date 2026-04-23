// src/components/user/UserProtectedRoute.jsx
import React from 'react';
import { Navigate } from 'react-router-dom';

const UserProtectedRoute = ({ children }) => {
  // User Token ကို စစ်ဆေးပါမည်
  const userToken = sessionStorage.getItem("app_session_token");

  // Token မရှိလျှင် User Login (/) သို့ ပြန်ပို့မည်
  if (!userToken) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default UserProtectedRoute;
