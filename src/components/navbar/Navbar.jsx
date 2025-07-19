import React, { useState, useCallback } from 'react';
import { AppBar, Toolbar, Button, Box, IconButton, Menu, MenuItem, Chip, Avatar, Tooltip } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { useUser } from '../../shared/hooks/useUser';

import MenuIcon from '@mui/icons-material/Menu';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import ContactsOutlinedIcon from '@mui/icons-material/ContactsOutlined';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import CompareArrowsOutlinedIcon from '@mui/icons-material/CompareArrowsOutlined';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PersonIcon from '@mui/icons-material/Person';
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import InventoryIcon from '@mui/icons-material/Inventory';
import AssessmentIcon from '@mui/icons-material/Assessment';
import SettingsIcon from '@mui/icons-material/Person';

export const Navbar = () => {
  const { userRole, isLoggedIn, username, logout } = useUser();
  const [anchorEl, setAnchorEl] = useState(null);
  const isMenuOpen = Boolean(anchorEl);
  const navigate = useNavigate();

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = useCallback(() => {
    logout();
    handleMenuClose();
    navigate('/');
  }, [logout, navigate]);
  
  const handleGoToSettings = useCallback(() => {
    navigate('/profile');
    handleMenuClose();
  }, [navigate]);
  
  const getInitials = (name = '') => {
    return name.charAt(0).toUpperCase();
  };

  const handleLogoClick = () => {
    if (!isLoggedIn) {
      navigate('/');
    } else if (userRole === 'USER_ROLE') {
      navigate('/client');
    } else if (userRole === 'ADMIN_ROLE') {
      navigate('/admin');
    }
  };

  return (
    <AppBar 
      position="sticky"
      sx={{ 
        backgroundColor: '#011B2F',
        boxShadow: '0px 2px 4px -1px rgba(0,0,0,0.2)',
      }}
    >
      <Toolbar>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          {/* Logo - modificado para usar la función de redirección en lugar de Link */}
          <Box 
            onClick={handleLogoClick} 
            sx={{ 
              display: 'flex', 
              alignItems: 'center', 
              cursor: 'pointer' 
            }}
          >
            <img 
              src="https://res.cloudinary.com/dwc4ynoj9/image/upload/v1751093545/banck_CCI_sinfondo-removebg_gdhpkm.png" 
              alt="Bank CCI Logo" 
              style={{ height: '40px' }} 
            />
          </Box>
        </Box>

        <Box sx={{ flexGrow: 1 }} />

        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          
          {isLoggedIn && userRole === 'ADMIN_ROLE' ? (
            <>
              <Button color="inherit" component={Link} to="/admin/users" startIcon={<PeopleAltOutlinedIcon />}>
                  Gestión de Usuarios
              </Button>
              <Button color="inherit" component={Link} to="/admin/accounts" startIcon={<AccountBalanceWalletIcon />}>
                Gestión de Cuentas
              </Button>
              <Button color="inherit" component={Link} to="/admin/products" startIcon={<InventoryIcon />}>
                Gestión de Productos
              </Button>
              <Button color="inherit" component={Link} to="/admin/reports/transaction-count" startIcon={<AssessmentIcon />}>
                Reportes
              </Button>
            </>
          ) : isLoggedIn && userRole === 'USER_ROLE' ? (
            <>
              <Button color="inherit" component={Link} to="/accounts" startIcon={<AccountBalanceIcon />}>
                Mis Cuentas
              </Button>
              <Button color="inherit" component={Link} to="/transfers" startIcon={<CompareArrowsOutlinedIcon />}>
                Transferencias
              </Button>
              <Button color="inherit" component={Link} to="/store" startIcon={<ShoppingCartIcon />}>
                Tienda
              </Button>
            </>
          ) : (
            // Navegación para usuarios no autenticados
            <>
              <Button color="inherit" component={Link} to="/about" startIcon={<InfoOutlinedIcon />}>
                Nosotros
              </Button>
              <Button color="inherit" component={Link} to="/contact" startIcon={<ContactsOutlinedIcon />}>
                Contacto
              </Button>
            </>
          )}

          {!isLoggedIn ? (
            // Botón de acceso para usuarios no autenticados
            <Button
              component={Link}
              to="/auth"
              variant="contained"
              startIcon={<LoginIcon />}
              sx={{ backgroundColor: '#FFD915', color: '#011B2F', '&:hover': { backgroundColor: '#FFD358' }, marginLeft: '20px' }}
            >
              Acceder
            </Button>
          ) : (
            <>
              <Tooltip title="Usuario conectado">
                <Chip
                  avatar={<Avatar sx={{ bgcolor: '#FFD915', color: '#011B2F', fontWeight: 'bold' }}>{getInitials(username)}</Avatar>}
                  label={username}
                  onClick={handleMenuOpen}
                  variant="outlined"
                  sx={{
                    color: 'white',
                    borderColor: 'rgba(255, 255, 255, 0.23)',
                    marginLeft: '20px',
                    padding: '2px',
                    cursor: 'pointer',
                    '& .MuiChip-label': {
                      fontWeight: '500'
                    }
                  }}
                />
              </Tooltip>
              <Menu 
                anchorEl={anchorEl} 
                open={isMenuOpen} 
                onClose={handleMenuClose}
                aria-labelledby="menú principal"
              >
                <MenuItem 
                  onClick={handleGoToSettings}
                  aria-label="Ir a configuración"
                >
                  <SettingsIcon sx={{ mr: 1.5 }} />
                  Profile
                </MenuItem>
                <MenuItem 
                  onClick={handleLogout}
                  aria-label="Cerrar sesión"
                >
                  <LogoutIcon sx={{ mr: 1.5 }} />
                  Cerrar Sesión
                </MenuItem>
              </Menu>
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};