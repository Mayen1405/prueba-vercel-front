import React from 'react';
import {
  Box, Typography, TextField, Button, CircularProgress, Grid
} from '@mui/material';
import { PasswordStrengthIndicator } from '../common/PasswordStrengthIndicator';
import LockResetIcon from '@mui/icons-material/LockReset';

const PasswordForm = ({ 
  passwordData, 
  isSubmitting, 
  errors, 
  handlePasswordChange, 
  handlePasswordSubmit 
}) => {
  return (
    <>
      <Typography variant="subtitle1" color="text.secondary" paragraph>
        Para actualizar su contraseña, primero ingrese la actual y luego la nueva. La contraseña debe tener al menos 8 caracteres.
      </Typography>
      
      <Box component="form" onSubmit={handlePasswordSubmit} noValidate>
        <Grid container spacing={3} sx={{ mt: 1 }}>
          <Grid item xs={12}>
            <TextField 
              fullWidth 
              type="password" 
              label="Contraseña Actual" 
              name="currentPassword" 
              value={passwordData.currentPassword} 
              onChange={handlePasswordChange} 
              required 
            />
          </Grid>
          
          <Grid item xs={12}>
            <TextField 
              fullWidth 
              type="password" 
              label="Nueva Contraseña" 
              name="newPassword" 
              value={passwordData.newPassword} 
              onChange={handlePasswordChange} 
              required 
              error={!!errors.newPassword} 
              helperText={errors.newPassword} 
            />
            {passwordData.newPassword && (
              <Box sx={{ mt: 1 }}>
                <PasswordStrengthIndicator password={passwordData.newPassword} />
              </Box>
            )}
          </Grid>
          
          <Grid item xs={12}>
            <TextField 
              fullWidth 
              type="password" 
              label="Confirmar Nueva Contraseña" 
              name="confirmNewPassword" 
              value={passwordData.confirmNewPassword} 
              onChange={handlePasswordChange} 
              required 
              error={!!errors.confirmNewPassword} 
              helperText={errors.confirmNewPassword} 
            />
          </Grid>
        </Grid>
        
        <Box sx={{ mt: 4, display: 'flex', justifyContent: 'flex-end' }}>
          <Button 
            type="submit" 
            variant="contained" 
            color="secondary"
            size="large"
            startIcon={isSubmitting ? <CircularProgress size={20} /> : <LockResetIcon />}
            disabled={isSubmitting}
            sx={{ 
              py: 1.5, 
              px: 4, 
              borderRadius: 2,
              boxShadow: 3
            }} 
          >
            {isSubmitting ? 'Actualizando...' : 'Actualizar Contraseña'}
          </Button>
        </Box>
      </Box>
    </>
  );
};

export default PasswordForm;