import React from 'react';
import {
  Container, Box, CircularProgress, Alert
} from '@mui/material';
import { useProducts } from '../../shared/hooks/useProducts';
import { ProductTable, ProductActionBar, ProductDeleteDialog } from '../../components/admin/product';
import { ProductModal } from '../../components/admin/product/ProductModal';

export const ProductManagementPage = () => {
  const {
    products,
    loading,
    error,
    selectedProduct,
    modalOpen,
    deleteDialogOpen,
    productToDelete,
    isDeleting,
    searchTerm,
    fetchProducts,
    handleOpenModal,
    handleCloseModal,
    handleOpenDeleteDialog,
    handleCloseDeleteDialog,
    handleDeleteProduct,
    handleSearchChange
  } = useProducts();

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <ProductActionBar 
        onAddProduct={() => handleOpenModal()} 
        searchTerm={searchTerm}
        onSearchChange={handleSearchChange}
      />
      
      {error && (
        <Alert 
          severity="error" 
          sx={{ mb: 3 }}
          action={
            <Button onClick={fetchProducts}>
              Reintentar
            </Button>
          }
        >
          {error}
        </Alert>
      )}
      
      <ProductTable 
        products={products} 
        onEdit={handleOpenModal}
        onDelete={handleOpenDeleteDialog}
      />
      
      <ProductModal 
        open={modalOpen}
        onClose={handleCloseModal}
        product={selectedProduct}
      />
      
      <ProductDeleteDialog 
        open={deleteDialogOpen}
        onClose={handleCloseDeleteDialog}
        onConfirm={handleDeleteProduct}
        productId={productToDelete?.id}
        productName={productToDelete?.name}
        isDeleting={isDeleting}
      />
    </Container>
  );
};