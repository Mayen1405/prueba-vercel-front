import React from 'react';
import {
  Paper, Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, IconButton, Chip, Typography,
  Box, Tooltip
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import WorkIcon from '@mui/icons-material/Work';
import PersonIcon from '@mui/icons-material/Person';

const UserTable = ({ users, onEdit, onDelete }) => {
  return (
    <Paper elevation={2} sx={{ borderRadius: 2, overflow: 'hidden' }}>
      <TableContainer>
        <Table>
          <TableHead sx={{ backgroundColor: '#f5f5f5' }}>
            <TableRow>
              <TableCell width="25%"><Typography variant="subtitle2" fontWeight="bold">Usuario</Typography></TableCell>
              <TableCell width="25%"><Typography variant="subtitle2" fontWeight="bold">Contacto</Typography></TableCell>
              <TableCell width="20%"><Typography variant="subtitle2" fontWeight="bold">Datos Laborales</Typography></TableCell>
              <TableCell width="15%"><Typography variant="subtitle2" fontWeight="bold">Rol/Estado</Typography></TableCell>
              <TableCell width="15%" align="right"><Typography variant="subtitle2" fontWeight="bold">Acciones</Typography></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.uid} hover sx={{ '&:hover': { backgroundColor: '#f9f9f9' } }}>
                <TableCell>
                  <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                    <Typography variant="body1" fontWeight="medium">{user.name}</Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', mt: 0.5 }}>
                      <PersonIcon fontSize="small" sx={{ color: 'text.secondary', mr: 0.5 }} />
                      <Typography variant="body2" color="text.secondary">{user.username}</Typography>
                    </Box>
                    <Typography variant="caption" color="text.secondary">DPI: {user.dpi}</Typography>
                  </Box>
                </TableCell>
                <TableCell>
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <EmailIcon fontSize="small" sx={{ color: 'primary.main', mr: 0.5 }} />
                      <Typography variant="body2">{user.email}</Typography>
                    </Box>
                    {user.phone && (
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <PhoneIcon fontSize="small" sx={{ color: 'success.main', mr: 0.5 }} />
                        <Typography variant="body2">{user.phone}</Typography>
                      </Box>
                    )}
                    {user.address && (
                      <Typography variant="body2" color="text.secondary" noWrap sx={{ maxWidth: 200 }}>
                        {user.address}
                      </Typography>
                    )}
                  </Box>
                </TableCell>
                <TableCell>
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                    {user.workName && (
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <WorkIcon fontSize="small" sx={{ color: 'info.main', mr: 0.5 }} />
                        <Typography variant="body2">{user.workName}</Typography>
                      </Box>
                    )}
                    {user.monthlyIncome !== undefined && (
                      <Typography variant="body2" color="text.secondary">
                        Ingresos: <b>Q{user.monthlyIncome.toLocaleString('es-GT')}</b>
                      </Typography>
                    )}
                  </Box>
                </TableCell>
                <TableCell>
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                    <Chip 
                      size="small"
                      label={user.role === 'ADMIN_ROLE' ? 'Administrador' : 'Cliente'} 
                      color={user.role === 'ADMIN_ROLE' ? 'primary' : 'default'}
                      variant={user.role === 'ADMIN_ROLE' ? 'filled' : 'outlined'}
                    />
                    <Chip 
                      size="small"
                      label={user.status ? 'Activo' : 'Inactivo'} 
                      color={user.status ? 'success' : 'error'}
                      variant={user.status ? 'filled' : 'outlined'}
                    />
                  </Box>
                </TableCell>
                <TableCell align="right">
                  <Tooltip title="Editar usuario">
                    <IconButton 
                      onClick={() => onEdit(user)} 
                      color="primary"
                      sx={{ 
                        '&:hover': { 
                          backgroundColor: 'rgba(25, 118, 210, 0.1)',
                          transform: 'translateY(-2px)'
                        },
                        transition: 'transform 0.2s'
                      }}
                    >
                      <EditIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Desactivar usuario">
                    <IconButton 
                      onClick={() => onDelete(user)} 
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

export default UserTable;