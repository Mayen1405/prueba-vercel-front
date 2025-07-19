import React from 'react';
import { Paper, Grid, Box, Typography, Divider } from '@mui/material';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import { formatAmount } from '../../../utils/formatter';

const AccountSummaryCard = ({ totalBalance, totalAccounts }) => {
  return (
    <Paper 
      elevation={2} 
      sx={{ 
        borderRadius: 2, 
        p: 3,
        background: 'linear-gradient(145deg, #f8f9fa 0%, #ffffff 100%)',
      }}
    >
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
            <Box
              sx={{
                bgcolor: 'primary.main',
                color: 'white',
                width: 40,
                height: 40,
                borderRadius: 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                mr: 2
              }}
            >
              <AccountBalanceWalletIcon />
            </Box>
            <Box>
              <Typography variant="body2" color="text.secondary">
                Saldo Total
              </Typography>
              <Typography variant="h5" fontWeight="bold" color={totalBalance < 0 ? 'error.main' : 'text.primary'}>
                {formatAmount(totalBalance)}
              </Typography>
            </Box>
          </Box>
        </Grid>
        
        <Grid item xs={12} sm={6}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
            <Box
              sx={{
                bgcolor: 'success.main',
                color: 'white',
                width: 40,
                height: 40,
                borderRadius: 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                mr: 2
              }}
            >
              <CreditCardIcon />
            </Box>
            <Box>
              <Typography variant="body2" color="text.secondary">
                Total de Cuentas
              </Typography>
              <Typography variant="h5" fontWeight="bold">
                {totalAccounts}
              </Typography>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default AccountSummaryCard;