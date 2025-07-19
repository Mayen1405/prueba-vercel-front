import React, { useEffect } from 'react';
import {
  Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField,
  Grid, CircularProgress, Box, Alert, Typography, MenuItem, IconButton
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import { useAccountForm } from '../../../shared/hooks/useAccountForm';

const AccountForm = ({ open, onClose, userId = null }) => {
  const {
    formData,
    users,
    loading,
    usersLoading,
    error,
    handleChange,
    handleSubmit,
    setFormData
  } = useAccountForm((shouldRefresh) => onClose(shouldRefresh), userId);

  // Sincronizar el userId cuando cambia el prop
  useEffect(() => {
    if (userId) {
      setFormData(prev => ({ ...prev, user: userId }));
    }
  }, [userId, setFormData]);

  const accountTypes = [
    { value: 'AHORRO', label: 'Cuenta de Ahorro' },
    { value: 'MONETARIO', label: 'Cuenta Monetaria' },
    { value: 'CREDITO', label: 'Línea de Crédito' }
  ];

  // Verificar si hay usuarios disponibles para evitar error de MUI
  const hasValidUsers = users && users.length > 0;

  return (
    <Dialog 
      open={open} 
      onClose={loading ? undefined : () => onClose(false)}
      fullWidth
      maxWidth="sm"
      PaperProps={{
        elevation: 5,
        sx: { borderRadius: 2, overflow: 'hidden' }
      }}
    >
      <DialogTitle sx={{ 
        bgcolor: 'primary.light', 
        color: 'white',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        py: 2
      }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <AccountBalanceIcon />
          <Typography variant="h6" component="div">
            Crear Nueva Cuenta
          </Typography>
        </Box>
        {!loading && (
          <IconButton 
            edge="end" 
            color="inherit" 
            onClick={() => onClose(false)} 
            aria-label="close"
          >
            <CloseIcon />
          </IconButton>
        )}
      </DialogTitle>
      <Box component="form" onSubmit={handleSubmit} noValidate>
        <DialogContent sx={{ p: 3 }}>
          {error && (
            <Alert severity="error" sx={{ mb: 3 }}>
              {error}
            </Alert>
          )}
          
          <Grid container spacing={3}>
            <Grid item xs={12}>
              {usersLoading ? (
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <CircularProgress size={24} sx={{ mr: 1 }} />
                  <Typography>Cargando usuarios...</Typography>
                </Box>
              ) : !hasValidUsers ? (
                <Alert severity="warning">
                  No hay usuarios disponibles para crear cuentas.
                </Alert>
              ) : (
                <TextField
                  select
                  label="Usuario"
                  name="user"
                  value={formData.user}
                  onChange={handleChange}
                  fullWidth
                  required
                  disabled={usersLoading || !!userId}
                  error={!formData.user && !!error}
                  helperText={!formData.user && !!error ? "Seleccione un usuario" : ""}
                >
                  {users.map(user => (
                    <MenuItem key={user.uid} value={user.uid}>
                      {user.name} ({user.email})
                    </MenuItem>
                  ))}
                </TextField>
              )}
            </Grid>
            <Grid item xs={12}>
              <TextField
                select
                label="Tipo de Cuenta"
                name="typeAccount"
                value={formData.typeAccount}
                onChange={handleChange}
                fullWidth
                required
              >
                {accountTypes.map(option => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="balance"
                label="Saldo Inicial (Q)"
                value={formData.balance}
                onChange={handleChange}
                type="number"
                inputProps={{ min: 0, step: 0.01 }}
                fullWidth
                required
              />
              <Typography variant="caption" color="text.secondary">
                Ingrese el saldo inicial para la cuenta, debe ser un número positivo o cero
              </Typography>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions sx={{ px: 3, py: 2, bgcolor: '#f5f5f5' }}>
          <Button onClick={() => onClose(false)} color="inherit" disabled={loading}>
            Cancelar
          </Button>
          <Button 
            type="submit" 
            variant="contained" 
            disabled={loading || !formData.user || !hasValidUsers}
          >
            {loading ? <CircularProgress size={24} color="inherit" /> : 'Crear Cuenta'}
          </Button>
        </DialogActions>
      </Box>
    </Dialog>
  );
};

export default AccountForm;