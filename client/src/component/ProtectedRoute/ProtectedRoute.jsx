import React from 'react';
import { Navigate,useLocation } from 'react-router-dom';

const ProtectedRoute = ({ isAuthenticated, children }) => {
    const location = useLocation();
  if (!isAuthenticated) {
    alert('Please log in to continue.');
    return <Navigate to={location} replace />;
  }
  return children;
};

export default ProtectedRoute;
