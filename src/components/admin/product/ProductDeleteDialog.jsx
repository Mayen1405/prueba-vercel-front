import React from 'react';
import {
  Dialog, DialogTitle, DialogContent, DialogActions,
  Button, Typography, Box, CircularProgress
} from '@mui/material';
import WarningIcon from '@mui/icons-material/Warning';
import DeleteIcon from '@mui/icons-material/Delete';
import CloseIcon from '@mui/icons-material/Close';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

const ProductDeleteDialog = ({ open, onClose, onConfirm, productId, productName, isDeleting }) => {
  if (!productId || !productName) return null;

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
          Confirmar Eliminación
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
            <ShoppingCartIcon sx={{ fontSize: 40, color: 'white' }} />
          </Box>
          <Typography variant="subtitle1" gutterBottom>
            ¿Estás seguro de que quieres eliminar el producto?
          </Typography>
          <Typography variant="h6" color="error" fontWeight="bold" gutterBottom>
            {productName}
          </Typography>
          <Typography variant="body2" color="text.secondary" align="center" sx={{ mt: 1 }}>
            Esta acción eliminará permanentemente el producto del catálogo. Los usuarios no podrán ver ni comprar este producto.
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
          onClick={() => onConfirm(productId)} 
          color="error" 
          variant="contained"
          startIcon={isDeleting ? <CircularProgress size={20} color="inherit" /> : <DeleteIcon />}
          disabled={isDeleting}
          sx={{ boxShadow: '0 2px 8px rgba(211, 47, 47, 0.3)' }}
        >
          {isDeleting ? 'Eliminando...' : 'Eliminar'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ProductDeleteDialog;