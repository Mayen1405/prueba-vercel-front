import React from 'react';
import { Typography, Box } from '@mui/material';

const SettingsHeader = () => {
  return (
    <Box sx={{ mb: 4 }}>
      <Typography 
        variant="h3" 
        component="h1" 
        gutterBottom 
        fontWeight="bold" 
        sx={{ color: '#002A45' }}
      >
        Ajustes de la Cuenta
      </Typography>
      <Typography variant="body1" color="text.secondary">
        Actualice su información personal y gestione la seguridad de su cuenta
      </Typography>
    </Box>
  );
};

export default SettingsHeader;