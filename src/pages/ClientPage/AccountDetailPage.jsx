import React from 'react';
import { 
  Container, Typography, Box, Paper, Divider, Button, 
  Grid, CircularProgress, Alert, Chip, IconButton
} from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { useAccountDetails } from '../../shared/hooks/useAccountDetails';
import { TransactionList } from '../../components/client/account';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import RefreshIcon from '@mui/icons-material/Refresh';
import { formatAmount } from '../../utils/formatter';
import { CurrencyConversionSection } from '../../components/client/transfers/CurrencyConversionSection';


export const AccountDetailPage = () => {
  const navigate = useNavigate();
  const { accountId } = useParams();
  const { 
    transactions, 
    balance, 
    loading, 
    error, 
    getTransactionTypeLabel,
    refreshData
  } = useAccountDetails(accountId);

  const handleBack = () => {
    navigate('/accounts');
  };

  const getAccountTypeName = (transactions) => {
    if (!transactions || transactions.length === 0) return '';
    
    // Intentamos encontrar la información del tipo de cuenta en las transacciones
    const accountTypeInfo = transactions.find(t => t.fromAccount?._id === accountId || t.toAccount?._id === accountId);
    
    if (accountTypeInfo) {
      const account = accountTypeInfo.fromAccount?._id === accountId 
        ? accountTypeInfo.fromAccount 
        : accountTypeInfo.toAccount;
      
      if (account?.typeAccount) {
        const types = {
          'AHORRO': 'Cuenta de Ahorro',
          'MONETARIO': 'Cuenta Monetaria',
          'CREDITO': 'Línea de Crédito'
        };
        return types[account.typeAccount] || account.typeAccount;
      }
    }
    
    return '';
  };

  const getAccountTypeColor = (transactions) => {
    if (!transactions || transactions.length === 0) return 'default';
    
    const accountTypeInfo = transactions.find(t => t.fromAccount?._id === accountId || t.toAccount?._id === accountId);
    
    if (accountTypeInfo) {
      const account = accountTypeInfo.fromAccount?._id === accountId 
        ? accountTypeInfo.fromAccount 
        : accountTypeInfo.toAccount;
      
      if (account?.typeAccount) {
        const types = {
          'AHORRO': 'success',
          'MONETARIO': 'primary',
          'CREDITO': 'warning'
        };
        return types[account.typeAccount] || 'default';
      }
    }
    
    return 'default';
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
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
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <AccountBalanceIcon sx={{ mr: 1, fontSize: 30 }} />
              <Typography variant="h4" component="h1" sx={{ fontWeight: 'bold' }}>
                Detalle de Cuenta
              </Typography>
            </Box>
            <IconButton color="inherit" onClick={handleBack}>
              <KeyboardBackspaceIcon />
            </IconButton>
          </Box>
          <Typography variant="body1" sx={{ mb: 2, opacity: 0.9 }}>
            Consulta el historial de movimientos y el saldo actual de tu cuenta.
          </Typography>
          <Chip 
            label={getAccountTypeName(transactions)} 
            color={getAccountTypeColor(transactions)}
            sx={{ fontWeight: 'bold' }}
          />
        </Box>
      </Paper>
      
      {error ? (
        <Alert 
          severity="error" 
          sx={{ mb: 3 }}
          action={
            <Button color="inherit" size="small" onClick={refreshData}>
              Reintentar
            </Button>
          }
        >
          {error}
        </Alert>
      ) : (
        <>
          <Paper 
            elevation={2} 
            sx={{ 
              borderRadius: 2, 
              p: 3, 
              mb: 4,
              background: 'linear-gradient(145deg, #f8f9fa 0%, #ffffff 100%)'
            }}
          >
            <Grid container spacing={3} alignItems="center">
              <Grid item xs={12} md={6}>
                <Typography variant="h6" color="text.secondary">
                  Saldo Disponible
                </Typography>
                <Typography variant="h3" fontWeight="bold" color={balance < 0 ? 'error.main' : 'success.main'}>
                  {formatAmount(balance)}
                </Typography>
              </Grid>
              <Grid item xs={12} md={6} sx={{ textAlign: { xs: 'left', md: 'right' } }}>
                <Button 
                  variant="outlined" 
                  startIcon={<RefreshIcon />} 
                  onClick={refreshData}
                >
                  Actualizar
                </Button>
              </Grid>
            </Grid>
          </Paper>
          
          <Box sx={{ mb: 3 }}>
            <Typography variant="h6" gutterBottom>
              Historial de Movimientos
            </Typography>
            <TransactionList 
              transactions={transactions}
              loading={false}
              error={null}
              getTransactionTypeLabel={getTransactionTypeLabel}
            />
          </Box>
        </>
      )}
    </Container>
  );
};