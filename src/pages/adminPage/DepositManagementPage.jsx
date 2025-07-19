import React, { useState } from 'react';
import { Container, Typography, Box, Grid, Alert, CircularProgress } from '@mui/material';
import { useDeposits } from '../../shared/hooks/useDeposits';
import { DepositForm, DepositsTable, ModifyDepositModal } from '../../components/admin/deposit';

export const DepositManagementPage = () => {
    const { 
        deposits,
        isLoading,
        isSubmitting,
        error,
        makeDeposit,
        modifyDeposit,
        revertDeposit
    } = useDeposits();

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedDeposit, setSelectedDeposit] = useState(null);

    const handleOpenModifyModal = (deposit) => {
        setSelectedDeposit(deposit);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedDeposit(null);
    };

    const handleConfirmModify = (transactionId, newAmount) => {
        modifyDeposit(transactionId, newAmount);
        handleCloseModal();
    };

    return (
        <Container maxWidth="xl" sx={{ py: 4 }}>
            <Box sx={{ mb: 4 }}>
                <Typography variant="h4" fontWeight="bold">
                    Gestión de Depósitos
                </Typography>
                <Typography color="text.secondary">
                    Realice depósitos a cuentas de clientes y gestione las transacciones existentes.
                </Typography>
            </Box>
            
            <Grid container spacing={4}>
                <Grid item xs={12} md={4}>
                    <DepositForm onDeposit={makeDeposit} isSubmitting={isSubmitting} />
                </Grid>
                <Grid item xs={12} md={8}>
                    <Typography variant="h6" fontWeight="bold" gutterBottom>
                        Historial de Depósitos
                    </Typography>
                    {isLoading ? (
                        <Box sx={{ display: 'flex', justifyContent: 'center', py: 5 }}><CircularProgress /></Box>
                    ) : error ? (
                        <Alert severity="error">{error}</Alert>
                    ) : (
                        <DepositsTable 
                            deposits={deposits}
                            onModify={handleOpenModifyModal}
                            onRevert={revertDeposit}
                            isSubmitting={isSubmitting}
                        />
                    )}
                </Grid>
            </Grid>

            <ModifyDepositModal
                open={isModalOpen}
                onClose={handleCloseModal}
                onConfirm={handleConfirmModify}
                deposit={selectedDeposit}
                isSubmitting={isSubmitting}
            />
        </Container>
    );
};