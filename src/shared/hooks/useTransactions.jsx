import { useState, useCallback } from 'react';
import { makeDeposit, makeTransfer, purchaseProduct as apiPurchaseProduct } from '../../services/api';

export const useTransactions = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');

  const handleDeposit = useCallback(async (data) => {
    setLoading(true);
    setError(null);
    setSuccessMessage('');
    
    try {
      const response = await makeDeposit(data);
      setSuccessMessage('¡Depósito realizado con éxito!');
      return response.data;
    } catch (err) {
      const errorMsg = err.response?.data?.message || 'Error al realizar el depósito';
      setError(errorMsg);
      console.error('Error making deposit:', err);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  const handleTransfer = useCallback(async (data) => {
    setLoading(true);
    setError(null);
    setSuccessMessage('');
    
    try {
      const response = await makeTransfer(data);
      setSuccessMessage('¡Transferencia realizada con éxito!');
      return response.data;
    } catch (err) {
      const errorMsg = err.response?.data?.message || 'Error al realizar la transferencia';
      setError(errorMsg);
      console.error('Error making transfer:', err);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  const handlePurchaseProduct = useCallback(async (productId, fromAccountId) => {
    setLoading(true);
    setError(null);
    setSuccessMessage('');
    
    try {
      const response = await apiPurchaseProduct({
        productId,
        fromAccountId
      });
      
      setSuccessMessage('¡Compra realizada con éxito!');
      return response.data;
    } catch (err) {
      const errorMsg = err.response?.data?.message || 'Error al realizar la compra';
      setError(errorMsg);
      console.error('Error purchasing product:', err);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    loading,
    error,
    successMessage,
    deposit: handleDeposit,
    transfer: handleTransfer,
    purchaseProduct: handlePurchaseProduct,
    setError,
    setSuccessMessage
  };
};