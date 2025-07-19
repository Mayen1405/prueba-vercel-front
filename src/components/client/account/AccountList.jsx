import React from 'react';
import { Grid, Box, Typography, CircularProgress, Alert } from '@mui/material';
import AccountCard from './AccountCard';
import AccountSummaryCard from './AccountSummaryCard';

const AccountList = ({ accounts, loading, error, onViewDetails, totalBalance }) => {
  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', py: 5 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Alert severity="error" sx={{ my: 3 }}>
        {error}
      </Alert>
    );
  }

  if (!accounts || accounts.length === 0) {
    return (
      <Alert severity="info" sx={{ my: 3 }}>
        No tienes cuentas bancarias asociadas. Por favor contacta al administrador para crear una.
      </Alert>
    );
  }

  return (
    <Box>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h6" gutterBottom>
          Resumen de Cuentas
        </Typography>
        <AccountSummaryCard 
          totalBalance={totalBalance} 
          totalAccounts={accounts.length} 
        />
      </Box>
      
      <Typography variant="h6" gutterBottom>
        Tus Cuentas
      </Typography>
      <Grid container spacing={3}>
        {accounts.map((account) => (
          <Grid item xs={12} sm={6} md={4} key={account.uid}>
            <AccountCard 
              account={account} 
              onViewDetails={onViewDetails} 
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default AccountList;