import React from 'react';
import {
  Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Typography, Box, Chip, CircularProgress, Alert
} from '@mui/material';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { formatAmount } from '../../../utils/formatter';

const TransactionList = ({ transactions, loading, error, getTransactionTypeLabel }) => {
  const getTransactionIcon = (type) => {
    switch (type) {
      case 'DEPOSIT':
        return <ArrowDownwardIcon fontSize="small" sx={{ color: 'success.main' }} />;
      case 'IN_TRANSFER':
        return <ArrowDownwardIcon fontSize="small" sx={{ color: 'success.main' }} />;
      case 'OUT_TRANSFER':
        return <ArrowUpwardIcon fontSize="small" sx={{ color: 'error.main' }} />;
      case 'WITHDRAWAL':
        return <ArrowUpwardIcon fontSize="small" sx={{ color: 'error.main' }} />;
      case 'PURCHASE':
        return <ShoppingCartIcon fontSize="small" sx={{ color: 'error.main' }} />;
      default:
        return <SwapHorizIcon fontSize="small" sx={{ color: 'primary.main' }} />;
    }
  };

  // Esta función no se usa en el componente, pero la definimos para evitar errores
  const getTransactionColor = (type) => {
    switch (type) {
      case 'DEPOSIT':
      case 'IN_TRANSFER':
        return 'success';
      case 'OUT_TRANSFER':
      case 'WITHDRAWAL':
      case 'PURCHASE':
        return 'error';
      default:
        return 'default';
    }
  };

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

  if (!transactions || transactions.length === 0) {
    return (
      <Alert severity="info" sx={{ my: 3 }}>
        No hay transacciones para mostrar en esta cuenta.
      </Alert>
    );
  }

  return (
    <Paper elevation={2} sx={{ borderRadius: 2, overflow: 'hidden' }}>
      <TableContainer>
        <Table>
          <TableHead sx={{ backgroundColor: '#f5f5f5' }}>
            <TableRow>
              <TableCell><Typography variant="subtitle2" fontWeight="bold">Fecha</Typography></TableCell>
              <TableCell><Typography variant="subtitle2" fontWeight="bold">Tipo</Typography></TableCell>
              <TableCell><Typography variant="subtitle2" fontWeight="bold">Detalles</Typography></TableCell>
              <TableCell align="right"><Typography variant="subtitle2" fontWeight="bold">Monto</Typography></TableCell>
              <TableCell><Typography variant="subtitle2" fontWeight="bold">Estado</Typography></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {transactions.map((transaction) => (
              <TableRow key={transaction.tid} hover>
                <TableCell>
                  <Typography variant="body2">
                    {new Date(transaction.createdAt).toLocaleDateString()}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {new Date(transaction.createdAt).toLocaleTimeString()}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    {getTransactionIcon(transaction.type)}
                    <Typography variant="body2">{getTransactionTypeLabel(transaction.type)}</Typography>
                  </Box>
                </TableCell>
                <TableCell>
                  <Box>
                    {transaction.fromAccount && transaction.toAccount && (
                      <Typography variant="caption" color="text.secondary">
                        Transferencia {transaction.type === 'OUT_TRANSFER' ? 'enviada' : 'recibida'}
                      </Typography>
                    )}
                    {transaction.type === 'PURCHASE' && (
                      <Typography variant="caption" color="text.secondary">
                        Compra de producto
                      </Typography>
                    )}
                  </Box>
                </TableCell>
                <TableCell align="right">
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
    </Paper>
  );
};

export default TransactionList;