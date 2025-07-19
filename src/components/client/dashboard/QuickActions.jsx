import React from 'react';
import {
  Paper, Typography, List, ListItem, ListItemButton,
  ListItemIcon, ListItemText, Divider
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import HistoryIcon from '@mui/icons-material/History';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import LockResetIcon from '@mui/icons-material/LockReset';

// Nueva lista de acciones según tu solicitud
const actions = [
    { text: 'Historial de Compras', path: '/purchase-history', icon: <HistoryIcon color="primary"/> },
    { text: 'Cuentas Favoritas', path: '/profile', section: 'favorites', icon: <StarBorderIcon color="primary"/> },
    { text: 'Cambiar Contraseña', path: '/profile', section: 'password', icon: <LockResetIcon color="primary"/> },
];

export const QuickActions = () => {
    const navigate = useNavigate();

    // Navega a la página de ajustes y pasa el estado para abrir la sección correcta
    const handleNavigate = (path, section) => {
        navigate(path, { state: { openSection: section } });
    };

    return (
        <Paper elevation={2} sx={{ p: 2, borderRadius: 2, height: '100%' }}>
            <Typography variant="h6" fontWeight="bold" sx={{ mb: 1, px: 2 }}>
                Accesos Rápidos
            </Typography>
            <List>
                {actions.map((action, index) => (
                    <React.Fragment key={action.text}>
                        <ListItem disablePadding>
                            <ListItemButton onClick={() => handleNavigate(action.path, action.section)} sx={{ borderRadius: 1.5, py: 1.5 }}>
                                <ListItemIcon sx={{ minWidth: 40 }}>
                                    {action.icon}
                                </ListItemIcon>
                                <ListItemText primary={action.text} primaryTypographyProps={{ fontWeight: 500 }} />
                            </ListItemButton>
                        </ListItem>
                        {index < actions.length - 1 && <Divider variant="middle" component="li" />}
                    </React.Fragment>
                ))}
            </List>
        </Paper>
    );
};