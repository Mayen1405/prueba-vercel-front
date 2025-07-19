import React, { useState } from 'react';
import {
    Box,
    TextField,
    Button,
    CircularProgress,
    Typography,
    Grid
} from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import AddIcon from '@mui/icons-material/Add';

export const AddFavoriteForm = ({ onAddFavorite, isLoading }) => {
    const [accountNumber, setAccountNumber] = useState('');
    const [alias, setAlias] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!accountNumber.trim()) {
            return;
        }
        onAddFavorite(accountNumber, alias);
        setAccountNumber('');
        setAlias('');
    };

    return (
        <>
            <Typography variant="h5" component="h2" fontWeight="bold" gutterBottom>
                Añadir Nueva Cuenta Favorita
            </Typography>
            
            <Typography variant="subtitle1" color="text.secondary" paragraph>
                Agregue cuentas de otros usuarios para realizar transferencias más rápidas.
            </Typography>
            
            <Box component="form" onSubmit={handleSubmit} noValidate>
                <Grid container spacing={2} sx={{ mt: 2 }}>
                    <Grid item xs={12} md={5}>
                        <TextField
                            fullWidth
                            label="Número de Cuenta"
                            name="accountNumber"
                            value={accountNumber}
                            onChange={(e) => setAccountNumber(e.target.value)}
                            required
                            placeholder="Ej: 0000000001"
                            helperText="Ingresa el número de cuenta que deseas agregar a favoritos"
                        />
                    </Grid>
                    <Grid item xs={12} md={5}>
                        <TextField
                            fullWidth
                            label="Alias (Opcional)"
                            name="alias"
                            value={alias}
                            onChange={(e) => setAlias(e.target.value)}
                            helperText="Un nombre amigable para identificar esta cuenta"
                        />
                    </Grid>
                    <Grid item xs={12} md={2} sx={{ display: 'flex', alignItems: 'center' }}>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="warning" // Color que coincide con el ícono de estrella en la navegación
                            size="large"
                            disabled={isLoading || !accountNumber}
                            startIcon={isLoading ? <CircularProgress size={20} /> : <AddIcon />}
                            sx={{ 
                                py: 1.5,
                                borderRadius: 2,
                                boxShadow: 3,
                                height: '56px' // Para alinear mejor con los campos de texto
                            }}
                        >
                            {isLoading ? 'Agregando...' : 'Añadir'}
                        </Button>
                    </Grid>
                </Grid>
            </Box>
        </>
    );
};