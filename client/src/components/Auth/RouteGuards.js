import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

// Public Route
export const PublicRoute = ({ children }) => {
  const { isAuthenticated } = useSelector((state) => state.user);

  return isAuthenticated ? <Navigate to="/" /> : children;
};

// Private Route
export const PrivateRoute = ({ children }) => {
  const { isAuthenticated } = useSelector((state) => state.user);

  return isAuthenticated ? children : <Navigate to="/email" />;
};

// Protected Route with Roles
export const ProtectedRoute = ({ children, requiredRole }) => {
  const { isAuthenticated, user } = useSelector((state) => state.user);

  if (!isAuthenticated) return <Navigate to="/email" />;

  if (requiredRole && user.role !== requiredRole)
    return <Navigate to="/email" />;

  return children;
};
