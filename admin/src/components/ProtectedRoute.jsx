import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  const { isLoggedIn } = useSelector((state) => state.admin);

  // If not logged in, redirect to admin-login
  if (!isLoggedIn) {
    return <Navigate to="/admin-login" replace />;
  }

  // If logged in, render child routes
  return <Outlet />;
};

export default ProtectedRoute;
