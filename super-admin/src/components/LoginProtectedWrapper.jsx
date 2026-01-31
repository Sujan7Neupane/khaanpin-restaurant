// src/components/LoginProtectedRoute.jsx
import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const LoginProtectedRoute = ({ children }) => {
  const { isLoggedIn } = useSelector((state) => state.superadmin);

  if (isLoggedIn) {
    return <Navigate to="/dashboard" replace />;
  }

  return <>{children}</>;
};

export default LoginProtectedRoute;
