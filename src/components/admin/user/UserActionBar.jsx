import React from 'react';
import {
  Box, Typography, Button, TextField, InputAdornment,
  Divider, Card, CardContent, useTheme, useMediaQuery
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';
import PersonAddIcon from '@mui/icons-material/PersonAdd';

const UserActionBar = ({ onAddUser, searchTerm = '', onSearchChange = () => {} }) => {
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
              <PersonAddIcon sx={{ mr: 1, color: 'primary.main' }} />
              Gestión de Usuarios
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
              Administre los usuarios, cree nuevos clientes y gestione sus accesos
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
              placeholder="Buscar usuarios..."
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
              onClick={onAddUser}
              sx={{ 
                borderRadius: 6,
                whiteSpace: 'nowrap',
                boxShadow: '0 4px 10px rgba(0, 114, 229, 0.2)',
                fontWeight: 'medium',
                px: 2
              }}
            >
              {isMobile ? 'Añadir' : 'Añadir Usuario'}
            </Button>
          </Box>
        </Box>

        <Divider sx={{ my: 2 }} />

        <Box sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
          <Button 
            startIcon={<FilterListIcon />} 
            variant="text" 
            size="small"
            sx={{ color: 'text.secondary' }}
          >
            Filtros
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default UserActionBar;