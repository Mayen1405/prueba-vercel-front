import React from 'react';
import { Container, Typography, Box, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useClientAccounts } from '../../shared/hooks/useClientAccounts';
import { AccountList } from '../../components/client/account';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';

export const AccountsPage = () => {
  const navigate = useNavigate();
  const { 
    accounts, 
    loading, 
    error, 
    // Asegurarse de que no usamos handleSelectAccount que no utilizamos aquí
    getTotalBalance 
  } = useClientAccounts();

  const handleViewDetails = (account) => {
    navigate(`/account/${account.uid}`);
  };

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
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
            <AccountBalanceIcon sx={{ mr: 1, fontSize: 30 }} />
            <Typography variant="h4" component="h1" sx={{ fontWeight: 'bold' }}>
              Mis Cuentas Bancarias
            </Typography>
          </Box>
          <Typography variant="body1" sx={{ mb: 1, opacity: 0.9, maxWidth: '800px' }}>
            Visualiza todas tus cuentas bancarias, consulta tu saldo disponible y realiza operaciones.
          </Typography>
        </Box>
      </Paper>

      <AccountList 
        accounts={accounts}
        loading={loading}
        error={error}
        onViewDetails={handleViewDetails}
        totalBalance={getTotalBalance()}
      />
    </Container>
  );
};