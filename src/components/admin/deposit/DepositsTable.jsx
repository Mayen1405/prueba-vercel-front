import React from 'react';
import {
  Paper, Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, IconButton, Chip, Typography,
  Box, Tooltip
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import HistoryEduIcon from '@mui/icons-material/HistoryEdu'; // Ícono para revertir
import { formatAmount, formatDate } from '../../../utils/formatter';

export const DepositsTable = ({ deposits, onModify, onRevert, isSubmitting }) => {
  return (
    <Paper elevation={2} sx={{ borderRadius: 2, overflow: 'hidden' }}>
      <TableContainer>
        <Table>
          <TableHead sx={{ backgroundColor: '#f5f5f5' }}>
            <TableRow>
              <TableCell>Fecha</TableCell>
              <TableCell>Cuenta Destino</TableCell>
              <TableCell align="right">Monto</TableCell>
              <TableCell>Realizado Por</TableCell>
              <TableCell>Estado</TableCell>
              <TableCell align="right">Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {deposits.map((deposit) => (
              <TableRow key={deposit.tid} hover>
                <TableCell>{formatDate(deposit.createdAt)}</TableCell>
                <TableCell>
                    <Typography variant="body2" fontWeight="medium">
                        {deposit.toAccount?.numberAccount || 'N/A'}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                        {deposit.toAccount?.user?.name || 'Usuario no disponible'}
                    </Typography>
                </TableCell>
                <TableCell align="right">
                    <Typography fontWeight="bold" color="success.main">
                        {formatAmount(deposit.amount)}
                    </Typography>
                </TableCell>
                <TableCell>{deposit.performedBy?.username || 'N/A'}</TableCell>
                <TableCell>
                  <Chip
                    label={deposit.status}
                    color={deposit.status === 'ACTIVE' ? 'success' : 'default'}
                    size="small"
                  />
                </TableCell>
                <TableCell align="right">
                  <Tooltip title="Modificar Monto">
                    <span>
                      <IconButton
                        color="primary"
                        onClick={() => onModify(deposit)}
                        disabled={isSubmitting || deposit.status !== 'ACTIVE'}
                      >
                        <EditIcon />
                      </IconButton>
                    </span>
                  </Tooltip>
                  <Tooltip title="Revertir Depósito">
                    <span>
                      <IconButton
                        color="error"
                        onClick={() => onRevert(deposit.tid)}
                        disabled={isSubmitting || deposit.status !== 'ACTIVE'}
                      >
                        <HistoryEduIcon />
                      </IconButton>
                    </span>
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