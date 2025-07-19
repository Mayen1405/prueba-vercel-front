import React, { useState, useEffect } from 'react';
import {
  Container, Typography, Paper, Box, Divider, 
  CircularProgress, Alert, Button, Chip, 
  Table, TableBody, TableCell, TableContainer, 
  TableHead, TableRow, IconButton, FormControl,
  InputLabel, Select, MenuItem
} from '@mui/material';
import {
  ShoppingCart as ShoppingCartIcon,
  Refresh as RefreshIcon,
  KeyboardBackspace as BackIcon,
  Receipt as ReceiptIcon
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useTransactionHistory, useAccounts } from '../../shared/hooks';
import { formatDate, formatAmount } from '../../utils/formatter';

export const PurchaseHistoryPage = () => {
  const navigate = useNavigate();
  const { 
    accounts, 
    loading: accountsLoading, 
    error: accountsError, 
    fetchUserAccounts 
  } = useAccounts();
  
  const { 
    purchases, 
    loading: purchasesLoading, 
    error: purchasesError,
    fetchAllPurchases,
    fetchAccountTransactions
  } = useTransactionHistory();
  
  const [selectedAccountId, setSelectedAccountId] = useState('all');
  
  // Cargar cuentas al montar el componente
  useEffect(() => {
    document.title = 'Historial de Compras';
    const loadAccounts = async () => {
      await fetchUserAccounts();
    };
    loadAccounts();
  }, [fetchUserAccounts]);
  
  // Cargar compras cuando tenemos las cuentas
  useEffect(() => {
    if (!accountsLoading && accounts.length > 0) {
      if (selectedAccountId === 'all') {
        fetchAllPurchases(accounts);
      } else {
        fetchAccountTransactions(selectedAccountId);
      }
    }
  }, [accounts, accountsLoading, selectedAccountId, fetchAllPurchases, fetchAccountTransactions]);
  
  const handleAccountChange = (event) => {
    setSelectedAccountId(event.target.value);
  };
  
  const handleRefresh = () => {
    if (selectedAccountId === 'all') {
      fetchAllPurchases(accounts);
    } else {
      fetchAccountTransactions(selectedAccountId);
    }
  };
  
  const handleBack = () => {
    navigate('/store');
  };
  
  const loading = accountsLoading || purchasesLoading;
  const error = accountsError || purchasesError;

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
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
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1 }}>
            <Typography variant="h4" component="h1" sx={{ fontWeight: 'bold', display: 'flex', alignItems: 'center' }}>
              <ShoppingCartIcon sx={{ mr: 1 }} /> Historial de Compras
            </Typography>
            <IconButton color="inherit" onClick={handleBack} aria-label="volver">
              <BackIcon />
            </IconButton>
          </Box>
          <Typography variant="body1" sx={{ mb: 1, opacity: 0.9, maxWidth: '800px' }}>
            Consulte todas sus compras realizadas en nuestra tienda de productos y servicios financieros.
          </Typography>
        </Box>
      </Paper>

      <Paper sx={{ borderRadius: 2, overflow: 'hidden' }}>
        <Box sx={{ p: 2, display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: 2 }}>
          <Typography variant="h6">
            Historial de Transacciones
          </Typography>
          
          <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
            <FormControl size="small" sx={{ minWidth: 200 }}>
              <InputLabel id="account-select-label">Filtrar por cuenta</InputLabel>
              <Select
                labelId="account-select-label"
                id="account-select"
                value={selectedAccountId}
                label="Filtrar por cuenta"
                onChange={handleAccountChange}
                disabled={loading || accounts.length === 0}
              >
                <MenuItem value="all">Todas las cuentas</MenuItem>
                {accounts.map(account => (
                  <MenuItem key={account.uid} value={account.uid}>
                    {account.numberAccount} - {account.typeAccount}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            
            <Button 
              startIcon={<RefreshIcon />} 
              onClick={handleRefresh}
              disabled={loading}
              size="small"
              variant="outlined"
            >
              Actualizar
            </Button>
          </Box>
        </Box>
        <Divider />

        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 5 }}>
            <CircularProgress />
          </Box>
        ) : error ? (
          <Box sx={{ p: 3 }}>
            <Alert 
              severity="error" 
              action={
                <Button color="inherit" size="small" onClick={handleRefresh}>
                  Reintentar
                </Button>
              }
            >
              {error}
            </Alert>
          </Box>
        ) : purchases.length === 0 ? (
          <Box sx={{ 
            py: 6, 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <Box sx={{ 
              width: 80, 
              height: 80, 
              borderRadius: '50%', 
              bgcolor: 'action.hover', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center', 
              mb: 2 
            }}>
              <ShoppingCartIcon sx={{ fontSize: 40, color: 'text.secondary' }} />
            </Box>
            <Typography variant="h6" color="textSecondary" align="center">
              No se encontraron compras en su historial
            </Typography>
            <Typography variant="body2" color="textSecondary" align="center" sx={{ mt: 1 }}>
              Visite nuestra tienda para adquirir productos y servicios financieros
            </Typography>
            <Button 
              variant="outlined" 
              sx={{ mt: 2 }}
              onClick={() => navigate('/store')}
            >
              Ir a la tienda
            </Button>
          </Box>
        ) : (
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Fecha</TableCell>
                  <TableCell>Cuenta</TableCell>
                  <TableCell align="right">Monto</TableCell>
                  <TableCell>Detalles</TableCell>
                  <TableCell align="center">Estado</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {purchases.map((purchase) => (
                  <TableRow key={purchase.tid} hover>
                    <TableCell>
                      {formatDate(purchase.createdAt)}
                    </TableCell>
                    <TableCell>
                      {purchase.accountNumber || 'N/A'} 
                      {purchase.accountType && `(${purchase.accountType})`}
                    </TableCell>
                    <TableCell align="right" sx={{ fontWeight: 'bold', color: 'error.main' }}>
                      {formatAmount(purchase.amount)}
                    </TableCell>
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <ReceiptIcon 
                          fontSize="small" 
                          color="primary" 
                          sx={{ mr: 1 }}
                        />
                        <Typography variant="body2">
                          Compra de producto
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell align="center">
                      <Chip 
                        size="small"
                        color={purchase.status === 'ACTIVE' ? 'success' : 'default'}
                        label={purchase.status === 'ACTIVE' ? 'Completada' : 'Revertida'}
                        variant={purchase.status === 'ACTIVE' ? 'filled' : 'outlined'}
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Paper>
    </Container>
  );
};