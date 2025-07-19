import React from 'react';
import { Box, Typography, LinearProgress } from '@mui/material';

const calculatePasswordStrength = (password) => {
  if (!password) return 0;
  
  let strength = 0;
  if (password.length > 7) strength += 25;
  if (/[A-Z]/.test(password)) strength += 25;
  if (/[0-9]/.test(password)) strength += 25;
  if (/[^A-Za-z0-9]/.test(password)) strength += 25;
  
  return Math.min(strength, 100);
};

export const PasswordStrengthIndicator = ({ password }) => {
  const strength = calculatePasswordStrength(password);
  
  let color = 'error'; // Rojo (débil)
  let label = 'Débil';
  
  if (strength >= 75) {
    color = 'success'; // Verde (fuerte)
    label = 'Fuerte';
  } else if (strength >= 50) {
    color = 'warning'; // Naranja (media)
    label = 'Media';
  }
  
  return (
    <Box sx={{ mt: 1, mb: 2 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
        <Typography variant="body2" color="text.secondary">Fortaleza:</Typography>
        <Typography variant="body2" color={`${color}.main`}>{label}</Typography>
      </Box>
      <LinearProgress 
        variant="determinate" 
        value={strength} 
        color={color}
        sx={{ height: 8, borderRadius: 5 }} 
      />
    </Box>
  );
};