import React from 'react';
import { Card, CardContent, Typography, Box, Chip, Button } from '@mui/material';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { formatAmount } from '../../../utils/formatter';

const AccountCard = ({ account, onViewDetails }) => {
  const getAccountTypeColor = (typeAccount) => {
    const types = {
      'AHORRO': 'success',
      'MONETARIO': 'primary',
      'CREDITO': 'warning'
    };
    return types[typeAccount] || 'default';
  };

  // Simplificado para siempre devolver el mismo icono
  const getAccountTypeIcon = () => {
    return <AccountBalanceIcon />;
  };

  const getAccountTypeName = (typeAccount) => {
    const types = {
      'AHORRO': 'Cuenta de Ahorro',
      'MONETARIO': 'Cuenta Monetaria',
      'CREDITO': 'Línea de Crédito'
    };
    return types[typeAccount] || typeAccount;
  };

  return (
    <Card 
      elevation={2} 
      sx={{ 
        borderRadius: 2,
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        transition: 'transform 0.2s, box-shadow 0.2s',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: '0 8px 16px rgba(0,0,0,0.1)'
        }
      }}
    >
      <Box 
        sx={{ 
          p: 2, 
          bgcolor: 'primary.light', 
          color: 'white', 
          display: 'flex', 
          alignItems: 'center' 
        }}
      >
        <Box 
          sx={{ 
            mr: 1.5, 
            bgcolor: 'rgba(255, 255, 255, 0.2)', 
            borderRadius: 1, 
            p: 0.5, 
            display: 'flex' 
          }}
        >
          {getAccountTypeIcon()}
        </Box>
        <Box sx={{ flexGrow: 1 }}>
          <Typography variant="subtitle1" fontWeight="medium">
            {account.numberAccount}
          </Typography>
          <Chip 
            label={getAccountTypeName(account.typeAccount)} 
            color={getAccountTypeColor(account.typeAccount)} 
            size="small"
            sx={{ height: 20, '& .MuiChip-label': { px: 1, py: 0 } }}
          />
        </Box>
      </Box>
      <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        <Box>
          <Typography variant="body2" color="text.secondary" gutterBottom>
            Saldo Disponible
          </Typography>
          <Typography 
            variant="h5" 
            component="div" 
            fontWeight="bold"
            color={account.balance < 0 ? 'error.main' : 'text.primary'}
            sx={{ mb: 2 }}
          >
            {formatAmount(account.balance)}
          </Typography>
          
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
            <Typography variant="body2" color="text.secondary">
              Última Actualización
            </Typography>
            <Typography variant="body2">
              {new Date(account.updatedAt).toLocaleDateString()}
            </Typography>
          </Box>
        </Box>
        
        <Button 
          fullWidth 
          variant="outlined" 
          color="primary" 
          onClick={() => onViewDetails(account)}
          startIcon={<VisibilityIcon />}
          sx={{ mt: 2 }}
        >
          Ver Detalles
        </Button>
      </CardContent>
    </Card>
  );
};

export default AccountCard;