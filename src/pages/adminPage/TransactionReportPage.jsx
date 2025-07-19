import React, { useEffect, useState } from 'react';
import { Container, Typography, Box, CircularProgress, Alert, Button, ButtonGroup } from '@mui/material';
import { useTransactionReport } from '../../shared/hooks/useTransactionReport';
import { TransactionReportChart } from '../../components/admin/reports/TransactionReportChart';

export const TransactionReportPage = () => {
    const [order, setOrder] = useState('desc');
    const { reportData, isLoading, error, fetchReport } = useTransactionReport();

    useEffect(() => {
        fetchReport(order);
    }, [fetchReport, order]);

    return (
        <Container maxWidth="lg" sx={{ py: 4 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
                <Box>
                    <Typography variant="h4" fontWeight="bold">
                        Reporte de Actividad de Cuentas
                    </Typography>
                    <Typography color="text.secondary">
                        Visualiza las cuentas ordenadas por su número de transacciones.
                    </Typography>
                </Box>
                <ButtonGroup variant="contained" aria-label="ordenar reporte">
                    <Button onClick={() => setOrder('desc')} disabled={order === 'desc'}>
                        Descendente
                    </Button>
                    <Button onClick={() => setOrder('asc')} disabled={order === 'asc'}>
                        Ascendente
                    </Button>
                </ButtonGroup>
            </Box>

            {isLoading ? (
                <Box sx={{ display: 'flex', justifyContent: 'center', py: 5 }}>
                    <CircularProgress />
                </Box>
            ) : error ? (
                <Alert severity="error">{error}</Alert>
            ) : (
                <TransactionReportChart data={reportData} />
            )}
        </Container>
    );
};