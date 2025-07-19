import React from 'react';
import {
  Paper, Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, IconButton, Chip, Typography,
  Box, Tooltip
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import { formatAmount } from '../../../utils/formatter';

const AccountTable = ({ accounts, onDelete, onViewDetails }) => {
  const getAccountTypeColor = (type) => {
    const types = {
      'AHORRO': 'success',
      'MONETARIO': 'primary',
      'CREDITO': 'warning'
    };
    return types[type] || 'default';
  };

  return (
    <Paper elevation={2} sx={{ borderRadius: 2, overflow: 'hidden' }}>
      <TableContainer>
        <Table>
          <TableHead sx={{ backgroundColor: '#f5f5f5' }}>
            <TableRow>
              <TableCell width="20%"><Typography variant="subtitle2" fontWeight="bold">Cuenta</Typography></TableCell>
              <TableCell width="30%"><Typography variant="subtitle2" fontWeight="bold">Usuario</Typography></TableCell>
              <TableCell width="20%"><Typography variant="subtitle2" fontWeight="bold">Tipo</Typography></TableCell>
              <TableCell width="15%"><Typography variant="subtitle2" fontWeight="bold">Saldo</Typography></TableCell>
              <TableCell width="15%" align="right"><Typography variant="subtitle2" fontWeight="bold">Acciones</Typography></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {accounts.map((account) => (
              <TableRow key={account.uid} hover sx={{ '&:hover': { backgroundColor: '#f9f9f9' } }}>
                <TableCell>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Box
                      sx={{
                        width: 40,
                        height: 40,
                        borderRadius: 1,
                        backgroundColor: 'primary.light',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        mr: 2
                      }}
                    >
                      <AccountBalanceIcon sx={{ color: 'white' }} />
                    </Box>
                    <Typography variant="body1" fontWeight="medium">{account.numberAccount}</Typography>
                  </Box>
                </TableCell>
                <TableCell>
                  {account.user && (
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
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
                </TableCell>
                <TableCell>
                  <Chip 
                    label={account.typeAccount} 
                    color={getAccountTypeColor(account.typeAccount)}
                    size="small"
                  />
                </TableCell>
                <TableCell>
                  <Typography 
                    variant="body1" 
                    fontWeight="bold" 
                    color={account.balance < 0 ? 'error.main' : 'text.primary'}
                  >
                    {formatAmount(account.balance)}
                  </Typography>
                </TableCell>
                <TableCell align="right">
                  <Tooltip title="Ver detalles">
                    <IconButton 
                      onClick={() => onViewDetails && onViewDetails(account)} 
                      color="primary"
                      sx={{ 
                        '&:hover': { 
                          backgroundColor: 'rgba(25, 118, 210, 0.1)',
                          transform: 'translateY(-2px)'
                        },
                        transition: 'transform 0.2s'
                      }}
                    >
                      <VisibilityIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Desactivar cuenta">
                    <IconButton 
                      onClick={() => onDelete(account)} 
                      color="error"
                      sx={{ 
                        '&:hover': { 
                          backgroundColor: 'rgba(211, 47, 47, 0.1)',
                          transform: 'translateY(-2px)'
                        },
                        transition: 'transform 0.2s'
                      }}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default AccountTable;