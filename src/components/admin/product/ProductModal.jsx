import React, { useState, useEffect } from 'react';
import {
  Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField,
  FormControlLabel, Switch, Grid, CircularProgress, Alert, Typography,
  Box, IconButton
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import CategoryIcon from '@mui/icons-material/Category';
import { createProduct, updateProduct } from '../../../services/api';
import toast from 'react-hot-toast';

export const ProductModal = ({ open, onClose, product }) => {
  const [formData, setFormData] = useState({
    name: '',
    descripcion: '',
    price: '',
    stock: '',
    status: true
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const isEditing = !!product;

  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name || '',
        descripcion: product.descripcion || '',
        price: product.price || '',
        stock: product.stock || '',
        status: product.status !== undefined ? product.status : true
      });
    } else {
      setFormData({
        name: '',
        descripcion: '',
        price: '',
        stock: '',
        status: true
      });
    }
    setError(null);
  }, [product]);

  const handleChange = (e) => {
    const { name, value, checked, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const validateForm = () => {
    const errors = {};
    if (!formData.name.trim()) errors.name = "El nombre es obligatorio";
    if (!formData.descripcion.trim()) errors.descripcion = "La descripción es obligatoria";
    
    const price = parseFloat(formData.price);
    if (isNaN(price) || price <= 0) errors.price = "El precio debe ser un número positivo";
    
    const stock = parseInt(formData.stock);
    if (isNaN(stock) || stock < 0) errors.stock = "El stock debe ser un número no negativo";
    
    return {
      valid: Object.keys(errors).length === 0,
      errors
    };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const { valid, errors } = validateForm();
    if (!valid) {
      let errorMessage = "Por favor corrija los siguientes errores:\n";
      Object.values(errors).forEach(err => {
        errorMessage += `- ${err}\n`;
      });
      setError(errorMessage);
      return;
    }
    
    setIsLoading(true);
    setError(null);
    
    try {
      const productData = {
        ...formData,
        price: parseFloat(formData.price),
        stock: parseInt(formData.stock)
      };
      
      if (isEditing) {
        await updateProduct(product.uid, productData);
        toast.success("Producto actualizado con éxito");
      } else {
        await createProduct(productData);
        toast.success("Producto creado con éxito");
      }
      
      onClose();
    } catch (err) {
      console.error('Error saving product:', err);
      setError(err.response?.data?.message || "Error al guardar el producto");
      toast.error(err.response?.data?.message || "Error al guardar el producto");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog 
      open={open} 
      onClose={isLoading ? undefined : onClose}
      fullWidth
      maxWidth="sm"
      PaperProps={{
        elevation: 5,
        sx: { borderRadius: 2, overflow: 'hidden' }
      }}
    >
      <DialogTitle sx={{ 
        bgcolor: 'primary.light', 
        color: 'white',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        py: 2
      }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <CategoryIcon />
          <Typography variant="h6" component="div">
            {isEditing ? 'Editar Producto' : 'Crear Nuevo Producto'}
          </Typography>
        </Box>
        {!isLoading && (
          <IconButton 
            edge="end" 
            color="inherit" 
            onClick={onClose} 
            aria-label="close"
          >
            <CloseIcon />
          </IconButton>
        )}
      </DialogTitle>
      <Box component="form" onSubmit={handleSubmit}>
        <DialogContent sx={{ p: 3 }}>
          {error && (
            <Alert severity="error" sx={{ mb: 3 }}>
              {error}
            </Alert>
          )}
          
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                autoFocus
                name="name"
                label="Nombre del Producto"
                value={formData.name}
                onChange={handleChange}
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="descripcion"
                label="Descripción"
                value={formData.descripcion}
                onChange={handleChange}
                fullWidth
                multiline
                rows={3}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                name="price"
                label="Precio (Q)"
                value={formData.price}
                onChange={handleChange}
                type="number"
                inputProps={{ min: 0, step: 0.01 }}
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                name="stock"
                label="Stock"
                value={formData.stock}
                onChange={handleChange}
                type="number"
                inputProps={{ min: 0, step: 1 }}
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Switch 
                    checked={formData.status} 
                    onChange={handleChange} 
                    name="status" 
                    color="primary" 
                  />
                }
                label="Activo"
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions sx={{ px: 3, py: 2, bgcolor: '#f5f5f5' }}>
          <Button onClick={onClose} color="inherit" disabled={isLoading}>
            Cancelar
          </Button>
          <Button 
            type="submit" 
            variant="contained" 
            disabled={isLoading}
          >
            {isLoading ? (
              <CircularProgress size={24} color="inherit" />
            ) : isEditing ? (
              'Guardar Cambios'
            ) : (
              'Crear Producto'
            )}
          </Button>
        </DialogActions>
      </Box>
    </Dialog>
  );
};