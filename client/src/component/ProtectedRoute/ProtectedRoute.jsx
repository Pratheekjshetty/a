import React, { useContext } from 'react';
import { Navigate,useLocation } from 'react-router-dom';
import { StoreContext } from '../../context/StoreContext';

const ProtectedRoute = ({ isAuthenticated, children }) => {
    const { token } = useContext(StoreContext);
    const location = useLocation();
  if (!token) {
    alert('Please log in to continue.');
    return <Navigate to={location} replace />;
  }
  return children;
};

export default ProtectedRoute;
