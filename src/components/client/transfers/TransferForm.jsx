import React, { useState, useEffect } from 'react';
import {
  Box, Grid, TextField, Button, FormControl, InputLabel,
  Select, MenuItem, InputAdornment, Typography, CircularProgress, Alert
} from '@mui/material';
import { useLocation } from 'react-router-dom';

export const TransferForm = ({ myAccounts, handleTransfer, isSubmitting, error }) => {
    const location = useLocation();
    const [fromAccount, setFromAccount] = useState('');
    const [toAccount, setToAccount] = useState('');
    const [amount, setAmount] = useState('');

    // Efecto para precargar el destinatario si viene desde la lista de favoritos
    useEffect(() => {
        if (location.state?.recipient?.numberAccount) {
            setToAccount(location.state.recipient.numberAccount);
        }
    }, [location.state]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const success = await handleTransfer(fromAccount, toAccount, parseFloat(amount));
        if (success) {
            // Limpiar el formulario después de una transferencia exitosa
            setFromAccount('');
            setToAccount('');
            setAmount('');
        }
    };

    return (
        <Box component="form" onSubmit={handleSubmit} noValidate>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <FormControl fullWidth required>
                        <InputLabel id="from-account-label">Desde la cuenta</InputLabel>
                        <Select
                            labelId="from-account-label"
                            value={fromAccount}
                            label="Desde la cuenta"
                            onChange={(e) => setFromAccount(e.target.value)}
                            disabled={!myAccounts || myAccounts.length === 0}
                        >
                            {myAccounts.map(acc => (
                                <MenuItem key={acc.uid} value={acc.numberAccount}>
                                    <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                                        <span>{acc.typeAccount} - {acc.numberAccount}</span>
                                        <Typography color="text.secondary">Q{acc.balance.toFixed(2)}</Typography>
                                    </Box>
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>

                <Grid item xs={12}>
                    <TextField
                        fullWidth
                        required
                        label="Número de cuenta de destino"
                        value={toAccount}
                        onChange={(e) => setToAccount(e.target.value)}
                    />
                </Grid>

                <Grid item xs={12}>
                    <TextField
                        fullWidth
                        required
                        label="Monto a transferir"
                        type="number"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        InputProps={{
                            startAdornment: <InputAdornment position="start">Q</InputAdornment>,
                            inputProps: { min: 0.01, step: 0.01 }
                        }}
                    />
                </Grid>

                {error && (
                    <Grid item xs={12}>
                        <Alert severity="error">{error}</Alert>
                    </Grid>
                )}

                <Grid item xs={12}>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        size="large"
                        disabled={isSubmitting || !fromAccount || !toAccount || !amount || parseFloat(amount) <= 0}
                        sx={{ py: 1.5 }}
                    >
                        {isSubmitting ? <CircularProgress size={24} color="inherit" /> : 'Realizar Transferencia'}
                    </Button>
                </Grid>
            </Grid>
        </Box>
    );
};