import { useState, useEffect, useCallback } from 'react';
import { getProducts, deleteProduct } from '../../services/api';
import toast from 'react-hot-toast';

export const useProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await getProducts();
      setProducts(response.data || []);
    } catch (err) {
      console.error('Error fetching products:', err);
      setError('Error al cargar los productos. Por favor, inténtelo de nuevo.');
      toast.error('Error al cargar los productos');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const handleOpenModal = (product = null) => {
    setSelectedProduct(product);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setSelectedProduct(null);
    setModalOpen(false);
    fetchProducts(); // Recargar los productos al cerrar el modal
  };

  const handleOpenDeleteDialog = (productId) => {
    const product = products.find(p => p.uid === productId);
    if (product) {
      setProductToDelete({
        id: productId,
        name: product.name
      });
      setDeleteDialogOpen(true);
    }
  };

  const handleCloseDeleteDialog = () => {
    setProductToDelete(null);
    setDeleteDialogOpen(false);
  };

  const handleDeleteProduct = async (productId) => {
    setIsDeleting(true);
    try {
      await deleteProduct(productId);
      toast.success('Producto eliminado con éxito');
      fetchProducts(); // Recargar productos después de eliminar
    } catch (err) {
      console.error('Error deleting product:', err);
      toast.error('Error al eliminar el producto');
    } finally {
      setIsDeleting(false);
      handleCloseDeleteDialog();
    }
  };

  const handleSearchChange = (value) => {
    setSearchTerm(value);
  };

  // Filtrar productos basados en el término de búsqueda
  const filteredProducts = searchTerm 
    ? products.filter(product => 
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.descripcion.toLowerCase().includes(searchTerm.toLowerCase()))
    : products;

  return {
    products: filteredProducts,
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
  };
};