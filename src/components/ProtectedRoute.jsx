import React, { useEffect } from 'react';
import { Navigate } from 'react-router-dom'; 
import { useUser } from '../shared/hooks/useUser';
import { CircularProgress, Box } from '@mui/material';

export const ProtectedRoute = ({ element, requiredRoles = [] }) => {
  const { isLoggedIn, userRole, isLoading } = useUser();
  useEffect(() => {
    console.log("ProtectedRoute - Auth state:", { isLoggedIn, userRole, isLoading });
    
    const userDetails = localStorage.getItem('usuario');
    console.log("localStorage 'usuario':", userDetails ? "Existe" : "No existe");
    
    if (userDetails) {
      try {
        const parsed = JSON.parse(userDetails);
        console.log("Token present:", !!parsed.token);
      } catch (e) {
        console.error("Error parsing user details:", e);
      }
    }
  }, [isLoggedIn, userRole, isLoading]);

  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (!isLoggedIn) {
    console.log("Usuario no autenticado, redirigiendo a /auth");
    return <Navigate to="/auth" replace />;
  }

  if (requiredRoles.length > 0 && !requiredRoles.includes(userRole)) {
    console.log(`Rol requerido no coincide. Usuario: ${userRole}, Requerido: ${requiredRoles.join(', ')}`);
    return <Navigate to="/" replace />;
  }

  console.log("Autenticación exitosa, mostrando componente protegido");
  return element;
};