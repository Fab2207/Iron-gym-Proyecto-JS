import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import type { RolUsuario } from '../../types';

interface PrivateRouteProps {
  roles: RolUsuario[];
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ roles }) => {
  const { currentUser, loading } = useAuth();

  if (loading) {
    return <div>Cargando autenticación...</div>;
  }

  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }

  if (!roles.includes(currentUser.rol)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <Outlet />;
};

export default PrivateRoute;