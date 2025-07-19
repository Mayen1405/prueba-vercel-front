import React from 'react';
import {
  Paper, Typography, List, ListItem, ListItemText, ListItemAvatar,
  Avatar, Box, Divider, Button
} from '@mui/material';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import { formatAmount, formatDate } from '../../../utils/formatter';
import { useNavigate } from 'react-router-dom';

const getTransactionDetails = (tx) => {
    switch (tx.type) {
        case 'DEPOSIT':
        case 'IN_TRANSFER':
            return { icon: <ArrowDownwardIcon />, color: 'success.main', sign: '+' };
        case 'OUT_TRANSFER':
        case 'PURCHASE':
        case 'WITHDRAWAL':
            return { icon: <ArrowUpwardIcon />, color: 'error.main', sign: '-' };
        default:
            return { icon: <ArrowUpwardIcon />, color: 'text.secondary', sign: '-' };
    }
}

export const RecentTransactions = ({ transactions }) => {
    const navigate = useNavigate();

    if (transactions.length === 0) {
        return (
            <Paper sx={{ p: 2, textAlign: 'center' }}>
                <Typography color="text.secondary">No hay transacciones recientes.</Typography>
            </Paper>
        );
    }
    
    return (
        <Paper elevation={2} sx={{ p: 2, borderRadius: 2 }}>
            <Typography variant="h6" fontWeight="bold" sx={{ mb: 2, px: 1 }}>
                Actividad Reciente
            </Typography>
            <List>
                {transactions.map((tx, index) => {
                    const { icon, color, sign } = getTransactionDetails(tx);
                    return (
                        <React.Fragment key={tx.tid}>
                            <ListItem>
                                <ListItemAvatar>
                                    <Avatar sx={{ bgcolor: `${color.split('.')[0]}.light` }}>
                                        {React.cloneElement(icon, { sx: { color } })}
                                    </Avatar>
                                </ListItemAvatar>
                                <ListItemText
                                    primary={tx.type.replace('_', ' ')}
                                    secondary={formatDate(tx.createdAt)}
                                />
                                <Typography fontWeight="medium" color={color}>
                                    {sign} {formatAmount(tx.amount)}
                                </Typography>
                            </ListItem>
                            {index < transactions.length - 1 && <Divider variant="inset" component="li" />}
                        </React.Fragment>
                    );
                })}
            </List>
            <Box sx={{ mt: 2, textAlign: 'center' }}>
                <Button onClick={() => navigate('/accounts')}>Ver todas mis cuentas</Button>
            </Box>
        </Paper>
    );
};