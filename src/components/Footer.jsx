import React from 'react';
import { Box, Container, Typography, Link as MuiLink } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom'; 

export const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: '#011B2F',
        color: 'white',
        py: 3,
        mt: 'auto',
      }}
    >
      <Container maxWidth="lg">
        <Typography variant="body2" align="center">
          © {new Date().getFullYear()} Bank CCI. Todos los derechos reservados.
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 1 }}>
          <MuiLink component={RouterLink} to="/privacy-policy" color="inherit" sx={{ mx: 1.5 }}>
            Política de Privacidad
          </MuiLink>
          <MuiLink component={RouterLink} to="/terms-of-service" color="inherit" sx={{ mx: 1.5 }}>
            Términos de Servicio
          </MuiLink>
        </Box>
      </Container>
    </Box>
  );
};