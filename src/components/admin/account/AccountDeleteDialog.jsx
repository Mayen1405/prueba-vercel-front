import React from 'react';
import {
  Dialog, DialogTitle, DialogContent, DialogActions,
  Button, Typography, Box, CircularProgress
} from '@mui/material';
import WarningIcon from '@mui/icons-material/Warning';
import DeleteIcon from '@mui/icons-material/Delete';
import CloseIcon from '@mui/icons-material/Close';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import { formatAmount } from '../../../utils/formatter';

const AccountDeleteDialog = ({ open, onClose, onConfirm, account, isDeleting }) => {
  if (!account) return null;

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
          <Box 
            sx={{
              bgcolor: 'primary.light',
              width: 70,
              height: 70,
              borderRadius: 2,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              mb: 2
            }}
          >
            <AccountBalanceIcon sx={{ fontSize: 40, color: 'white' }} />
          </Box>
          <Typography variant="subtitle1" gutterBottom>
            ¿Estás seguro de que quieres desactivar la cuenta?
          </Typography>
          <Typography variant="h6" color="error" fontWeight="bold" gutterBottom>
            {account.numberAccount}
          </Typography>
          
          <Box sx={{ mt: 2, width: '100%', backgroundColor: '#f5f5f5', p: 2, borderRadius: 1 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
              <Typography variant="body2" color="text.secondary">Tipo:</Typography>
              <Typography variant="body2" fontWeight="bold">{account.typeAccount}</Typography>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
              <Typography variant="body2" color="text.secondary">Saldo:</Typography>
              <Typography variant="body2" fontWeight="bold">{formatAmount(account.balance)}</Typography>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography variant="body2" color="text.secondary">Usuario:</Typography>
              <Typography variant="body2" fontWeight="bold">{account.user?.name || 'N/A'}</Typography>
            </Box>
          </Box>
          
          <Typography variant="body2" color="text.secondary" align="center" sx={{ mt: 3 }}>
            Esta acción desactivará la cuenta bancaria. El usuario ya no podrá acceder a esta cuenta ni realizar operaciones con ella.
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

export default AccountDeleteDialog;