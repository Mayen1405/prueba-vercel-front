import React, { useState, useEffect } from 'react';
import { 
  Container, Typography, Box, Button, Card, CardContent,
  CardActions, Chip, TextField, InputAdornment,
  CircularProgress, Alert, Pagination, Divider, Paper, 
  Snackbar, IconButton, FormControl, InputLabel,
  Select, MenuItem
} from '@mui/material';
import { 
  Search as SearchIcon,
  ShoppingCart as ShoppingCartIcon,
  FilterList as FilterListIcon,
  Sort as SortIcon,
  Refresh as RefreshIcon,
  History as HistoryIcon
} from '@mui/icons-material';
import { useProducts } from '../../shared/hooks';
import { PurchaseModal } from '../../components/store';
import { useNavigate } from 'react-router-dom';


export const StoreProductsPage = () => {
  const navigate = useNavigate();
  const { products, loading, error, fetchProducts } = useProducts();
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [openPurchaseModal, setOpenPurchaseModal] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  
  // Estados para búsqueda, filtrado y ordenación
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('name');
  const [sortDirection, setSortDirection] = useState('asc');
  const [filterInStock, setFilterInStock] = useState(true);
  
  // Estado para paginación
  const [page, setPage] = useState(1);
  const itemsPerPage = 6;

  // Usamos useEffect solamente para establecer el título de la página
  useEffect(() => {
    document.title = 'Tienda de Productos';
  }, []); // Sin dependencias, solo se ejecuta al montar

  // Filtrado, ordenamiento y paginación de productos
  const filteredProducts = products
    .filter(product => 
      (!filterInStock || product.stock > 0) &&
      product.status &&
      (product.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
       product.descripcion.toLowerCase().includes(searchTerm.toLowerCase()))
    )
    .sort((a, b) => {
      let comparison = 0;
      if (sortBy === 'name') {
        comparison = a.name.localeCompare(b.name);
      } else if (sortBy === 'price') {
        comparison = a.price - b.price;
      }
      return sortDirection === 'asc' ? comparison : -comparison;
    });

  // Productos paginados
  const paginatedProducts = filteredProducts.slice(
    (page - 1) * itemsPerPage, 
    page * itemsPerPage
  );

  const pageCount = Math.ceil(filteredProducts.length / itemsPerPage);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
    // Scroll to top of product section when changing page
    const productsSection = document.getElementById('products-section');
    if (productsSection) {
      window.scrollTo({
        top: productsSection.offsetTop - 20,
        behavior: 'smooth'
      });
    }
  };

  const handleSort = (event) => {
    setSortBy(event.target.value);
  };

  const toggleSortDirection = () => {
    setSortDirection(prev => prev === 'asc' ? 'desc' : 'asc');
  };

  const handleBuy = (product) => {
    setSelectedProduct(product);
    setOpenPurchaseModal(true);
  };

  const handleClosePurchaseModal = () => {
    setOpenPurchaseModal(false);
  };

  const handlePurchaseComplete = () => {
    setOpenPurchaseModal(false);
    setSuccessMessage('¡Compra realizada con éxito! El producto ha sido añadido a su cuenta.');
    setSnackbarOpen(true);
    fetchProducts(); // Refrescar productos para actualizar stock
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Paper 
        elevation={1} 
        sx={{ 
          borderRadius: 2, 
          overflow: 'hidden',
          mb: 4, 
          backgroundImage: 'linear-gradient(to right, #011B2F, #023E6A)',
          color: 'white'
        }}
      >
        <Box sx={{ p: 4 }}>
          <Typography variant="h4" component="h1" sx={{ fontWeight: 'bold', mb: 1 }}>
            Tienda de Productos y Servicios
          </Typography>
          <Typography variant="body1" sx={{ mb: 2, opacity: 0.9, maxWidth: '800px' }}>
            Explore nuestra selección de productos financieros y servicios exclusivos para nuestros clientes.
            Mejore su experiencia bancaria con nuestras opciones premium.
          </Typography>
          <Button 
            variant="contained" 
            color="secondary"
            startIcon={<HistoryIcon />}
            sx={{ borderRadius: 2, fontWeight: 'bold', px: 3 }}
            onClick={() => navigate('/purchase-history')}
            >
            Ver mi historial de compras
          </Button>
        </Box>
      </Paper>

      <Box sx={{ mb: 4 }}>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
          <Box sx={{ width: { xs: '100%', md: 'calc(50% - 8px)' } }}>
            <TextField
              fullWidth
              placeholder="Buscar productos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
              size="small"
              variant="outlined"
            />
          </Box>
          <Box sx={{ 
            width: { xs: '100%', md: 'calc(50% - 8px)' },
            display: 'flex', 
            gap: 1, 
            flexWrap: 'wrap', 
            justifyContent: { xs: 'flex-start', md: 'flex-end' } 
          }}>
            <FormControl size="small" sx={{ minWidth: 120 }}>
              <InputLabel id="sort-by-label">Ordenar por</InputLabel>
              <Select
                labelId="sort-by-label"
                value={sortBy}
                label="Ordenar por"
                onChange={handleSort}
              >
                <MenuItem value="name">Nombre</MenuItem>
                <MenuItem value="price">Precio</MenuItem>
              </Select>
            </FormControl>
            
            <Button
              variant={sortDirection === 'asc' ? "contained" : "outlined"}
              color="primary"
              size="small"
              startIcon={<SortIcon />}
              onClick={toggleSortDirection}
              sx={{ minWidth: 100 }}
            >
              {sortDirection === 'asc' ? 'Ascendente' : 'Descendente'}
            </Button>
            
            <Button
              variant={filterInStock ? "contained" : "outlined"}
              color="primary"
              size="small"
              startIcon={<FilterListIcon />}
              onClick={() => setFilterInStock(!filterInStock)}
            >
              {filterInStock ? 'En Stock' : 'Todos'}
            </Button>
            
            <IconButton color="primary" onClick={fetchProducts} size="small">
              <RefreshIcon />
            </IconButton>
          </Box>
        </Box>
      </Box>

      <Box id="products-section">
        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', py: 10 }}>
            <CircularProgress />
          </Box>
        ) : error ? (
          <Alert 
            severity="error" 
            action={
              <Button color="inherit" size="small" onClick={fetchProducts}>
                Reintentar
              </Button>
            }
            sx={{ mb: 3 }}
          >
            {error}
          </Alert>
        ) : filteredProducts.length === 0 ? (
          <Box sx={{ 
            py: 8, 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <Box sx={{ 
              width: 100, 
              height: 100, 
              borderRadius: '50%', 
              bgcolor: 'action.hover', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center', 
              mb: 2 
            }}>
              <ShoppingCartIcon sx={{ fontSize: 40, color: 'text.secondary' }} />
            </Box>
            <Typography variant="h6" color="textSecondary" align="center">
              {searchTerm ? 'No se encontraron productos con esa búsqueda' : 'No hay productos disponibles'}
            </Typography>
            {searchTerm && (
              <Button 
                sx={{ mt: 2 }}
                variant="outlined"
                onClick={() => setSearchTerm('')}
              >
                Limpiar búsqueda
              </Button>
            )}
          </Box>
        ) : (
          <>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', margin: -1.5 }}>
              {paginatedProducts.map((product) => (
                <Box key={product.uid} sx={{ 
                  width: { xs: '100%', sm: '50%', md: '33.333333%' },
                  padding: 1.5
                }}>
                  <Card 
                    elevation={2}
                    sx={{ 
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      transition: 'transform 0.2s, box-shadow 0.2s',
                      '&:hover': {
                        transform: 'translateY(-4px)',
                        boxShadow: '0 8px 16px rgba(0,0,0,0.1)'
                      },
                      position: 'relative',
                      borderRadius: 2
                    }}
                  >
                    {product.stock <= 0 && (
                      <Box 
                        sx={{ 
                          position: 'absolute',
                          top: 0,
                          right: 0,
                          left: 0,
                          bottom: 0,
                          bgcolor: 'rgba(0,0,0,0.5)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          zIndex: 1,
                          borderRadius: 2
                        }}
                      >
                        <Chip 
                          label="AGOTADO" 
                          color="error"
                          sx={{ 
                            fontWeight: 'bold',
                            fontSize: '1.1rem',
                            py: 2,
                            transform: 'rotate(-10deg)'
                          }}
                        />
                      </Box>
                    )}
                    
                    <Box 
                      sx={{ 
                        height: 140, 
                        bgcolor: product.stock <= 0 ? 'action.disabledBackground' : 'primary.light',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}
                    >
                      <ShoppingCartIcon sx={{ fontSize: 60, color: 'white', opacity: 0.8 }} />
                    </Box>
                    
                    <CardContent sx={{ flexGrow: 1 }}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
                        <Typography variant="h6" component="h2" gutterBottom>
                          {product.name}
                        </Typography>
                        <Chip 
                          label={`Q${product.price.toFixed(2)}`} 
                          color="primary"
                          sx={{ fontWeight: 'bold' }}
                        />
                      </Box>
                      
                      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                        {product.descripcion}
                      </Typography>
                      
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Chip 
                          label={`Stock: ${product.stock}`}
                          color={
                            product.stock > 10 ? 'success' : 
                            product.stock > 0 ? 'warning' : 
                            'error'
                          }
                          size="small"
                          variant="outlined"
                        />
                      </Box>
                    </CardContent>
                    
                    <Divider />
                    
                    <CardActions sx={{ p: 2 }}>
                      <Button
                        fullWidth
                        variant="contained"
                        color="primary"
                        startIcon={<ShoppingCartIcon />}
                        onClick={() => handleBuy(product)}
                        disabled={product.stock <= 0}
                      >
                        {product.stock > 0 ? "Comprar Ahora" : "Agotado"}
                      </Button>
                    </CardActions>
                  </Card>
                </Box>
              ))}
            </Box>
            
            {pageCount > 1 && (
              <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                <Pagination 
                  count={pageCount} 
                  page={page} 
                  onChange={handleChangePage} 
                  color="primary"
                  showFirstButton
                  showLastButton
                />
              </Box>
            )}
          </>
        )}
      </Box>

      {/* Modal para compra de productos */}
      <PurchaseModal
        open={openPurchaseModal}
        onClose={handleClosePurchaseModal}
        product={selectedProduct}
        onPurchaseComplete={handlePurchaseComplete}
      />

      {/* Snackbar para mensajes de éxito */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert onClose={handleCloseSnackbar} severity="success" variant="filled">
          {successMessage}
        </Alert>
      </Snackbar>
    </Container>
  );
};