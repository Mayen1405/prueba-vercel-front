import React, { useState, useEffect } from 'react';
import {
  Dialog, DialogTitle, DialogContent, DialogActions,
  Button, TextField, CircularProgress, Box, Typography
} from '@mui/material';

export const ModifyDepositModal = ({ open, onClose, onConfirm, deposit, isSubmitting }) => {
  const [newAmount, setNewAmount] = useState('');

  useEffect(() => {
    if (deposit) {
      setNewAmount(String(deposit.amount));
    }
  }, [deposit]);

  const handleConfirm = () => {
    const amountValue = parseFloat(newAmount);
    if (!isNaN(amountValue) && amountValue > 0) {
      onConfirm(deposit.tid, amountValue);
    }
  };

  if (!deposit) return null;

  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
      <DialogTitle>Modificar Monto del Depósito</DialogTitle>
      <DialogContent>
        <Typography gutterBottom>
          Tx ID: {deposit.tid}
        </Typography>
        <Typography color="text.secondary" gutterBottom>
          Estás modificando el depósito para la cuenta {deposit.toAccount?.numberAccount}.
        </Typography>
        <TextField
          autoFocus
          margin="dense"
          label="Nuevo Monto"
          type="number"
          fullWidth
          variant="outlined"
          value={newAmount}
          onChange={(e) => setNewAmount(e.target.value)}
          inputProps={{ min: 0.01, step: 0.01 }}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="inherit">Cancelar</Button>
        <Button onClick={handleConfirm} variant="contained" disabled={isSubmitting}>
          {isSubmitting ? <CircularProgress size={24} color="inherit" /> : 'Guardar Cambios'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};