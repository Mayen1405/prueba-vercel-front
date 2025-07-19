import React from 'react';
import {
  Paper, Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, IconButton, Chip, Typography,
  Box, Tooltip
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import InventoryIcon from '@mui/icons-material/Inventory';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

const ProductTable = ({ products, onEdit, onDelete }) => {
  return (
    <Paper elevation={2} sx={{ borderRadius: 2, overflow: 'hidden' }}>
      <TableContainer>
        <Table>
          <TableHead sx={{ backgroundColor: '#f5f5f5' }}>
            <TableRow>
              <TableCell width="25%"><Typography variant="subtitle2" fontWeight="bold">Producto</Typography></TableCell>
              <TableCell width="30%"><Typography variant="subtitle2" fontWeight="bold">Descripción</Typography></TableCell>
              <TableCell width="15%"><Typography variant="subtitle2" fontWeight="bold">Precio/Stock</Typography></TableCell>
              <TableCell width="15%"><Typography variant="subtitle2" fontWeight="bold">Estado</Typography></TableCell>
              <TableCell width="15%" align="right"><Typography variant="subtitle2" fontWeight="bold">Acciones</Typography></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.map((product) => (
              <TableRow key={product.uid} hover sx={{ '&:hover': { backgroundColor: '#f9f9f9' } }}>
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
                      <ShoppingCartIcon sx={{ color: 'white' }} />
                    </Box>
                    <Typography variant="body1" fontWeight="medium">{product.name}</Typography>
                  </Box>
                </TableCell>
                <TableCell>
                  <Typography 
                    variant="body2" 
                    color="text.secondary" 
                    sx={{ 
                      display: '-webkit-box',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      maxWidth: 400
                    }}
                  >
                    {product.descripcion}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <AttachMoneyIcon fontSize="small" sx={{ color: 'success.main', mr: 0.5 }} />
                      <Typography variant="body2" fontWeight="bold">
                        Q{product.price.toFixed(2)}
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <InventoryIcon fontSize="small" sx={{ color: 'info.main', mr: 0.5 }} />
                      <Typography variant="body2">
                        Stock: <b>{product.stock}</b>
                      </Typography>
                    </Box>
                  </Box>
                </TableCell>
                <TableCell>
                  <Chip 
                    label={product.status ? 'Activo' : 'Inactivo'} 
                    color={product.status ? 'success' : 'error'}
                    variant={product.status ? 'filled' : 'outlined'}
                    size="small"
                  />
                </TableCell>
                <TableCell align="right">
                  <Tooltip title="Editar producto">
                    <IconButton 
                      onClick={() => onEdit(product)} 
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
                  <Tooltip title="Eliminar producto">
                    <IconButton 
                      onClick={() => onDelete(product.uid)} 
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

export default ProductTable;