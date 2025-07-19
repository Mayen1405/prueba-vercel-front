import React from 'react';
import {
  Container, Typography, Paper, Box, CircularProgress, Alert
} from '@mui/material';
import { useTransfers } from '../../shared/hooks/useTransfers';
import { TransferForm } from '../../components/client/transfers';
import CompareArrowsIcon from '@mui/icons-material/CompareArrows';

export const TransfersPage = () => {
    const { myAccounts, isLoading, isSubmitting, error, handleTransfer } = useTransfers();

    if (isLoading) {
        return <Box sx={{ display: 'flex', justifyContent: 'center', mt: 5 }}><CircularProgress /></Box>;
    }
    
    if (!isLoading && myAccounts.length === 0) {
        return (
            <Container maxWidth="sm" sx={{ py: 5, textAlign: 'center' }}>
                <Alert severity="warning">
                    No tienes cuentas bancarias para realizar una transferencia. Por favor, contacta a un administrador para que te asigne una.
                </Alert>
            </Container>
        );
    }

    return (
        <Container maxWidth="lg" sx={{ py: 4 }}>
            {/* INICIO: Nuevo encabezado inspirado en la página de cuentas */}
            <Paper 
              elevation={1} 
              sx={{ 
                borderRadius: 2, 
                overflow: 'hidden',
                mb: 4, 
                backgroundImage: 'linear-gradient(to right, #011B2F, #023E6A)',
                color: 'white'
              }}
            >
              <Box sx={{ p: 4 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <CompareArrowsIcon sx={{ mr: 1.5, fontSize: 30 }} />
                  <Typography variant="h4" component="h1" sx={{ fontWeight: 'bold' }}>
                    Realizar Transferencia
                  </Typography>
                </Box>
                <Typography variant="body1" sx={{ mb: 1, opacity: 0.9, maxWidth: '800px' }}>
                  Mueve fondos de forma segura entre tus cuentas o a cuentas de terceros.
                </Typography>
              </Box>
            </Paper>
            {/* FIN: Nuevo encabezado */}

            <Paper elevation={2} sx={{ p: 4, borderRadius: 2 }}>
                {/* El título se movió al nuevo encabezado de arriba, por lo que el formulario ahora está más limpio */}
                <TransferForm 
                    myAccounts={myAccounts}
                    handleTransfer={handleTransfer}
                    isSubmitting={isSubmitting}
                    error={error}
                />
            </Paper>
        </Container>
    );
};