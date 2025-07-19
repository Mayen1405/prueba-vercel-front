import React from 'react';
import {
  Box, Typography, TextField, Button, CircularProgress, Tooltip,
  Grid // Use standard Grid instead of Unstable_Grid2
} from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import SaveIcon from '@mui/icons-material/Save';

const ProfileForm = ({ 
  profileData, 
  isSubmitting, 
  handleProfileChange, 
  handleProfileSubmit 
}) => {
  return (
    <>
      <Typography variant="subtitle1" color="text.secondary" paragraph>
        Actualice su información personal. Los campos con * son obligatorios.
      </Typography>
      
      <Box component="form" onSubmit={handleProfileSubmit} noValidate>
        <Grid container spacing={3} sx={{ mt: 1 }}>
          <Grid item xs={12} md={6}>
            <TextField 
              fullWidth 
              label="Nombre Completo" 
              name="name" 
              value={profileData.name} 
              onChange={handleProfileChange}
              required
            />
          </Grid>
          
          <Grid item xs={12} md={6}>
            <TextField 
              fullWidth 
              label="Nombre de Usuario" 
              name="username" 
              value={profileData.username} 
              onChange={handleProfileChange}
              required
            />
          </Grid>
          
          <Grid item xs={12} md={6}>
            <TextField 
              fullWidth 
              label="DPI" 
              name="dpi" 
              value={profileData.dpi} 
              disabled 
              InputProps={{ 
                endAdornment: (
                  <Tooltip title="El DPI no puede ser modificado.">
                    <InfoIcon color="disabled" fontSize="small" />
                  </Tooltip>
                ) 
              }} 
            />
          </Grid>
          
          <Grid item xs={12} md={6}>
            <TextField 
              fullWidth 
              label="Email" 
              name="email" 
              value={profileData.email} 
              disabled 
              InputProps={{ 
                endAdornment: (
                  <Tooltip title="El correo no puede ser modificado.">
                    <InfoIcon color="disabled" fontSize="small" />
                  </Tooltip>
                ) 
              }} 
            />
          </Grid>
          
          <Grid item xs={12}>
            <TextField 
              fullWidth 
              label="Dirección" 
              name="address" 
              value={profileData.address} 
              onChange={handleProfileChange} 
              required
            />
          </Grid>
          
          <Grid item xs={12} md={6}>
            <TextField 
              fullWidth 
              label="Teléfono" 
              name="phone" 
              value={profileData.phone} 
              onChange={handleProfileChange}
              required 
            />
          </Grid>
          
          <Grid item xs={12} md={6}>
            <TextField 
              fullWidth 
              label="Lugar de Trabajo" 
              name="workName" 
              value={profileData.workName} 
              onChange={handleProfileChange} 
              required
            />
          </Grid>
          
          <Grid item xs={12} md={6}>
            <TextField 
              fullWidth 
              type="number" 
              label="Ingresos Mensuales" 
              name="monthlyIncome" 
              value={profileData.monthlyIncome} 
              onChange={handleProfileChange}
              InputProps={{
                startAdornment: <Box component="span" sx={{ mr: 1 }}>Q</Box>
              }}
              required
            />
          </Grid>
        </Grid>
        
        <Box sx={{ mt: 4, display: 'flex', justifyContent: 'flex-end' }}>
          <Button 
            type="submit" 
            variant="contained" 
            color="primary"
            size="large"
            startIcon={isSubmitting ? <CircularProgress size={20} /> : <SaveIcon />}
            disabled={isSubmitting}
            sx={{ 
              py: 1.5, 
              px: 4, 
              borderRadius: 2,
              boxShadow: 3
            }} 
          >
            {isSubmitting ? 'Guardando...' : 'Guardar Cambios'}
          </Button>
        </Box>
      </Box>
    </>
  );
};

export default ProfileForm;