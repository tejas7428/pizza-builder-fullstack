import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';

const AuthGuard = ({ children, requiredRole = null }) => {
  const { user, loading } = useContext(AuthContext);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    // User is not authenticated
    return <Navigate to="/login" replace />;
  }

  if (requiredRole && user.role !== requiredRole) {
    // User doesn't have the required role
    return <Navigate to="/" replace />;
  }

  // User is authenticated and has the required role
  return children;
};

export default AuthGuard;