import React from 'react';
import {
  Box, Typography, Button, TextField, InputAdornment,
  Divider, Card, CardContent, useTheme, useMediaQuery
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';
import CategoryIcon from '@mui/icons-material/Category';

const ProductActionBar = ({ onAddProduct, searchTerm = '', onSearchChange = () => {} }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Card 
      elevation={1} 
      sx={{ 
        mb: 3, 
        borderRadius: 2,
        background: 'linear-gradient(145deg, #f8f9fa 0%, #ffffff 100%)',
        boxShadow: '0 2px 12px rgba(0,0,0,0.05)'
      }}
    >
      <CardContent sx={{ p: { xs: 2, md: 3 } }}>
        <Box sx={{ 
          display: 'flex', 
          flexDirection: { xs: 'column', md: 'row' },
          justifyContent: 'space-between', 
          alignItems: { xs: 'stretch', md: 'center' },
          gap: 2
        }}>
          <Box>
            <Typography 
              variant="h5" 
              component="h1" 
              fontWeight="bold" 
              sx={{ color: '#1e3a5f', display: 'flex', alignItems: 'center' }}
            >
              <CategoryIcon sx={{ mr: 1, color: 'primary.main' }} />
              Administración de Productos
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
              Gestione el catálogo de productos: cree, actualice y elimine productos para su tienda
            </Typography>
          </Box>

          <Box 
            sx={{ 
              display: 'flex', 
              flexDirection: { xs: 'column', sm: 'row' }, 
              gap: 2, 
              width: { xs: '100%', md: 'auto' } 
            }}
          >
            <TextField
              placeholder="Buscar productos..."
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              size="small"
              sx={{ 
                minWidth: { sm: 200 }, 
                '.MuiInputBase-root': { 
                  borderRadius: 6,
                  backgroundColor: '#ffffff'
                } 
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon color="action" />
                  </InputAdornment>
                ),
              }}
            />
            <Button
              variant="contained"
              color="primary"
              startIcon={<AddIcon />}
              onClick={onAddProduct}
              sx={{ 
                borderRadius: 6,
                whiteSpace: 'nowrap',
                boxShadow: '0 4px 10px rgba(0, 114, 229, 0.2)',
                fontWeight: 'medium',
                px: 2
              }}
            >
              {isMobile ? 'Añadir' : 'Crear Nuevo Producto'}
            </Button>
          </Box>
        </Box>

        <Divider sx={{ my: 2 }} />
      </CardContent>
    </Card>
  );
};

export default ProductActionBar;