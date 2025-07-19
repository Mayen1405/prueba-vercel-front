import React, { useState } from 'react';
import { 
    Box, 
    TextField, 
    Button, 
    CircularProgress, 
    Typography,
    Paper,
    InputAdornment
} from '@mui/material';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';

export const DepositForm = ({ onDeposit, isSubmitting }) => {
    const [accountNumber, setAccountNumber] = useState('');
    const [amount, setAmount] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!accountNumber || !amount || parseFloat(amount) <= 0) {
            return;
        }
        const success = await onDeposit(accountNumber, parseFloat(amount));
        if (success) {
            setAccountNumber('');
            setAmount('');
        }
    };

    return (
        <Paper elevation={2} sx={{ p: 3, borderRadius: 2 }}>
            <Typography variant="h6" fontWeight="bold" gutterBottom>
                Realizar un Nuevo Depósito
            </Typography>
            <Box component="form" onSubmit={handleSubmit} noValidate>
                <TextField
                    fullWidth
                    margin="normal"
                    label="Número de Cuenta de Destino"
                    name="accountNumber"
                    value={accountNumber}
                    onChange={(e) => setAccountNumber(e.target.value)}
                    required
                    InputProps={{
                        startAdornment: <InputAdornment position="start"><AccountBalanceIcon /></InputAdornment>,
                    }}
                />
                <TextField
                    fullWidth
                    margin="normal"
                    label="Monto a Depositar"
                    name="amount"
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    required
                    InputProps={{
                        startAdornment: <InputAdornment position="start"><MonetizationOnIcon /></InputAdornment>,
                        inputProps: { min: 0.01, step: 0.01 }
                    }}
                />
                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    disabled={isSubmitting || !accountNumber || !amount || parseFloat(amount) <= 0}
                    sx={{ mt: 2, py: 1.5, width: '100%' }}
                >
                    {isSubmitting ? <CircularProgress size={24} color="inherit" /> : 'Confirmar Depósito'}
                </Button>
            </Box>
        </Paper>
    );
};