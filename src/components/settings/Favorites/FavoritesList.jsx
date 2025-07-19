import React from 'react';
import {
    Box, Typography, Paper, List, ListItem, ListItemText,
    ListItemAvatar, Avatar, IconButton, Tooltip, Alert
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import SendIcon from '@mui/icons-material/Send';
import { useNavigate } from 'react-router-dom';

export const FavoritesList = ({ favorites, onRemove }) => {
    const navigate = useNavigate();

    const handleTransfer = (favorite) => {
        // Redirige al formulario de transferencia con los datos precargados
        navigate('/transfers', { state: { recipient: favorite.account } });
    };

    if (!favorites || favorites.length === 0) {
        return (
            <Alert severity="info" sx={{ mt: 3 }}>
                Aún no tienes cuentas favoritas. ¡Añade una para realizar transferencias más rápido!
            </Alert>
        );
    }

    return (
        <Paper elevation={2} sx={{ p: { xs: 2, md: 3 }, mt: 4 }}>
            <Typography variant="h6" component="h3" fontWeight="bold" gutterBottom>
                Mis Cuentas Favoritas
            </Typography>
            <List>
                {favorites.map((fav) => (
                    // Se usa fav.account.uid como clave única.
                    <ListItem
                        key={fav.account.uid}
                        divider
                        secondaryAction={
                            <Box>
                                <Tooltip title="Transferir">
                                    <IconButton edge="end" aria-label="transfer" onClick={() => handleTransfer(fav)}>
                                        <SendIcon color="primary" />
                                    </IconButton>
                                </Tooltip>
                                <Tooltip title="Eliminar de favoritos">
                                    {/* Se llama a la función 'onRemove' con el uid de la cuenta, que ahora sí viene desde el backend. */}
                                    <IconButton
                                        edge="end"
                                        aria-label="delete"
                                        onClick={() => onRemove(fav.account.uid)}
                                        sx={{ ml: 1 }}
                                    >
                                        <DeleteIcon color="error" />
                                    </IconButton>
                                </Tooltip>
                            </Box>
                        }
                    >
                        <ListItemAvatar>
                            <Avatar sx={{ bgcolor: 'primary.light' }}>
                                {fav.alias ? fav.alias.charAt(0).toUpperCase() : fav.account.user.name.charAt(0).toUpperCase()}
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText
                            primary={<Typography fontWeight="bold">{fav.alias || 'Favorito'}</Typography>}
                            secondary={
                                <>
                                    <Typography component="span" variant="body2" color="text.primary">
                                        {`Titular: ${fav.account.user.name}`}
                                    </Typography>
                                    {` — ${fav.account.numberAccount}`}
                                </>
                            }
                        />
                    </ListItem>
                ))}
            </List>
        </Paper>
    );
};