import React from 'react';
import {
  Dialog, DialogTitle, DialogContent, DialogActions,
  Button, Typography, Box, CircularProgress, Avatar
} from '@mui/material';
import WarningIcon from '@mui/icons-material/Warning';
import DeleteIcon from '@mui/icons-material/Delete';
import CloseIcon from '@mui/icons-material/Close';

const UserDeleteDialog = ({ open, onClose, onConfirm, user, isDeleting }) => {
  if (!user) return null;

  return (
    <Dialog 
      open={open} 
      onClose={isDeleting ? undefined : onClose}
      maxWidth="xs"
      fullWidth
      PaperProps={{
        elevation: 5,
        sx: { borderRadius: 2, overflow: 'hidden' }
      }}
    >
      <DialogTitle sx={{ 
        bgcolor: '#ffebee', 
        color: '#d32f2f',
        display: 'flex',
        alignItems: 'center',
        gap: 1,
        py: 2
      }}>
        <WarningIcon color="error" />
        <Typography variant="h6" component="div" fontWeight="bold">
          Confirmar Desactivación
        </Typography>
      </DialogTitle>

      <DialogContent sx={{ mt: 2, px: 3 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 2 }}>
          <Avatar
            sx={{
              bgcolor: '#f5f5f5',
              width: 70,
              height: 70,
              mb: 2
            }}
          >
            {user.name?.charAt(0).toUpperCase() || 'U'}
          </Avatar>
          <Typography variant="subtitle1" gutterBottom>
            ¿Estás seguro de que quieres desactivar al usuario?
          </Typography>
          <Typography variant="h6" color="error" fontWeight="bold" gutterBottom>
            {user.username}
          </Typography>
          <Typography variant="body2" color="text.secondary" align="center" sx={{ mt: 1 }}>
            Esta acción desactivará el acceso del usuario al sistema. El usuario podrá ser reactivado posteriormente si es necesario.
          </Typography>
        </Box>
      </DialogContent>

      <DialogActions sx={{ px: 3, py: 2, bgcolor: '#f5f5f5' }}>
        <Button 
          onClick={onClose} 
          startIcon={<CloseIcon />}
          disabled={isDeleting}
          color="inherit"
        >
          Cancelar
        </Button>
        <Button 
          onClick={onConfirm} 
          color="error" 
          variant="contained"
          startIcon={isDeleting ? <CircularProgress size={20} color="inherit" /> : <DeleteIcon />}
          disabled={isDeleting}
          sx={{ boxShadow: '0 2px 8px rgba(211, 47, 47, 0.3)' }}
        >
          {isDeleting ? 'Desactivando...' : 'Desactivar'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default UserDeleteDialog;