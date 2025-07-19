import React from 'react';
import { Box, Container, Typography, Grid, CircularProgress, Alert } from '@mui/material';
import { useUser } from '../../shared/hooks/useUser';
import { useDashboard } from '../../shared/hooks/useDashboard';
import { CurrencyConverter } from '../../components/common/CurrencyConverter';
import { RecentTransactions } from '../../components/client/transaction';
import { QuickActions } from '../../components/client/dashboard';

export const ClientPage = () => {
    const { username } = useUser();
    const { recentTransactions, isLoading, error } = useDashboard();

    if (isLoading) {
        return <Box sx={{ display: 'flex', justifyContent: 'center', py: 5 }}><CircularProgress size={40} /></Box>;
    }

    if (error) {
        return <Container sx={{ py: 5 }}><Alert severity="error">{error}</Alert></Container>;
    }

    return (
        <Box sx={{ py: 4, bgcolor: '#f4f6f8', minHeight: 'calc(100vh - 64px)' }}>
            <Container maxWidth="xl">
                {/* --- ENCABEZADO --- */}
                <Box sx={{ mb: 4 }}>
                    <Typography variant="h4" fontWeight="bold">
                        ¡Hola, {username || 'Bienvenido'}!
                    </Typography>
                    <Typography color="text.secondary">
                        Aquí tienes un resumen de tu actividad financiera.
                    </Typography>
                </Box>
                
                {/* Contenedor principal con los 3 widgets */}
                <Grid container spacing={3} alignItems="stretch">

                    {/* --- WIDGET 1: ACCESOS RÁPIDOS (Ahora en la primera posición) --- */}
                    <Grid item xs={12} md={5}>
                        <QuickActions />
                    </Grid>

                    {/* --- WIDGET 2: ACTIVIDAD RECIENTE (Ahora en la segunda posición) --- */}
                    <Grid item xs={12} md={3}>
                        <RecentTransactions transactions={recentTransactions} />
                    </Grid>
                    
                    {/* --- WIDGET 3: CONVERSOR DE DIVISAS (Se mantiene en su lugar) --- */}
                    <Grid item xs={12} md={4}>
                        <CurrencyConverter />
                    </Grid>
                    
                </Grid>
            </Container>
        </Box>
    );
};