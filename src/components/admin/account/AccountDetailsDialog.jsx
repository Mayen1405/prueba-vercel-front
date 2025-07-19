import React from 'react';
import {
  Dialog, DialogTitle, DialogContent, DialogActions,
  Button, Typography, Box, CircularProgress, Alert,
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Paper, Divider, Chip, IconButton
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import { formatAmount, formatDate } from '../../../utils/formatter';

const AccountDetailsDialog = ({ 
  open, 
  onClose, 
  account, 
  details, 
  loading, 
  error 
}) => {
  if (!account) return null;

  const getAccountTypeColor = (type) => {
    const types = {
      'AHORRO': 'success',
      'MONETARIO': 'primary',
      'CREDITO': 'warning'
    };
    return types[type] || 'default';
  };

  const getTransactionTypeLabel = (type) => {
    const labels = {
      'DEPOSIT': 'Depósito',
      'IN_TRANSFER': 'Transferencia Recibida',
      'OUT_TRANSFER': 'Transferencia Enviada',
      'WITHDRAWAL': 'Retiro',
      'PURCHASE': 'Compra'
    };
    return labels[type] || type;
  };

  const getTransactionIcon = (type) => {
    switch (type) {
      case 'DEPOSIT':
      case 'IN_TRANSFER':
        return '⬇️';
      case 'OUT_TRANSFER':
      case 'WITHDRAWAL':
      case 'PURCHASE':
        return '⬆️';
      default:
        return '↔️';
    }
  };

  return (
    <Dialog 
      open={open} 
      onClose={onClose}
      fullWidth
      maxWidth="md"
      PaperProps={{
        elevation: 5,
        sx: { borderRadius: 2, overflow: 'hidden' }
      }}
    >
      <DialogTitle sx={{ 
        bgcolor: 'primary.light', 
        color: 'white',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        py: 2
      }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <AccountBalanceIcon />
          <Typography variant="h6" component="div">
            Detalles de Cuenta: {account.numberAccount}
          </Typography>
        </Box>
        <IconButton 
          edge="end" 
          color="inherit" 
          onClick={onClose} 
          aria-label="close"
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent sx={{ p: 3 }}>
        {error ? (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        ) : loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
            <CircularProgress />
          </Box>
        ) : details ? (
          <>
            <Paper elevation={1} sx={{ p: 2, mb: 3 }}>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
                <Box>
                  <Typography variant="subtitle2" color="text.secondary">
                    Número de Cuenta
                  </Typography>
                  <Typography variant="body1" fontWeight="medium">
                    {account.numberAccount}
                  </Typography>
                </Box>
                
                <Box>
                  <Typography variant="subtitle2" color="text.secondary">
                    Tipo de Cuenta
                  </Typography>
                  <Chip 
                    label={account.typeAccount} 
                    color={getAccountTypeColor(account.typeAccount)}
                    size="small"
                  />
                </Box>
                
                <Box>
                  <Typography variant="subtitle2" color="text.secondary">
                    Saldo Actual
                  </Typography>
                  <Typography variant="body1" fontWeight="bold" color={details.balance < 0 ? 'error.main' : 'success.main'}>
                    {formatAmount(details.balance)}
                  </Typography>
                </Box>
                
                <Box>
                  <Typography variant="subtitle2" color="text.secondary">
                    Fecha de Creación
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <CalendarTodayIcon fontSize="small" sx={{ mr: 0.5, color: 'text.secondary' }} />
                    <Typography variant="body2">
                      {formatDate(account.createdAt)}
                    </Typography>
                  </Box>
                </Box>
              </Box>

              <Divider sx={{ my: 2 }} />

              <Box>
                <Typography variant="subtitle2" color="text.secondary">
                  Propietario
                </Typography>
                {account.user && (
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5, mt: 1 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <PersonIcon fontSize="small" sx={{ color: 'text.secondary', mr: 0.5 }} />
                      <Typography variant="body2">{account.user.name}</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <EmailIcon fontSize="small" sx={{ color: 'primary.main', mr: 0.5 }} />
                      <Typography variant="body2" color="text.secondary">{account.user.email}</Typography>
                    </Box>
                  </Box>
                )}
              </Box>
            </Paper>

            <Typography variant="h6" gutterBottom>
              Historial de Transacciones
            </Typography>

            {details.transactions && details.transactions.length > 0 ? (
              <TableContainer component={Paper} sx={{ maxHeight: 400, overflow: 'auto' }}>
                <Table stickyHeader>
                  <TableHead>
                    <TableRow>
                      <TableCell>Fecha</TableCell>
                      <TableCell>Tipo</TableCell>
                      <TableCell>Monto</TableCell>
                      <TableCell>Estado</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {details.transactions.map((transaction) => (
                      <TableRow key={transaction.tid} hover>
                        <TableCell>
                          {formatDate(transaction.createdAt)}
                        </TableCell>
                        <TableCell>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <span>{getTransactionIcon(transaction.type)}</span>
                            {getTransactionTypeLabel(transaction.type)}
                          </Box>
                        </TableCell>
                        <TableCell>
                          <Typography 
                            variant="body2" 
                            fontWeight="medium"
                            color={
                              transaction.type === 'DEPOSIT' || transaction.type === 'IN_TRANSFER' 
                                ? 'success.main' 
                                : 'error.main'
                            }
                          >
                            {transaction.type === 'DEPOSIT' || transaction.type === 'IN_TRANSFER' ? '+' : '-'}
                            {formatAmount(transaction.amount)}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Chip 
                            label={transaction.status === 'ACTIVE' ? 'Completada' : 'Anulada'} 
                            color={transaction.status === 'ACTIVE' ? 'success' : 'default'}
                            size="small"
                            variant={transaction.status === 'ACTIVE' ? 'filled' : 'outlined'}
                          />
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            ) : (
              <Alert severity="info">
                Esta cuenta no tiene transacciones registradas.
              </Alert>
            )}
          </>
        ) : (
          <Alert severity="warning">
            No se pudieron cargar los detalles de la cuenta.
          </Alert>
        )}
      </DialogContent>

      <DialogActions sx={{ px: 3, py: 2 }}>
        <Button onClick={onClose} variant="contained">
          Cerrar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AccountDetailsDialog;