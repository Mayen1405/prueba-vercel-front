import { useState, useCallback } from 'react';
import { getAccountSummary } from '../../services/api';

export const useTransactionHistory = () => {
  const [transactions, setTransactions] = useState([]);
  const [purchases, setPurchases] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  // Obtener el historial de una cuenta específica
  const fetchAccountTransactions = useCallback(async (accountId) => {
    if (!accountId) return;
    
    setLoading(true);
    setError(null);
    
    try {
      const response = await getAccountSummary(accountId);
      
      if (response.data && response.data.success) {
        const allTransactions = response.data.transactions || [];
        setTransactions(allTransactions);
        
        // Filtrar solo las compras (tipo PURCHASE)
        const purchaseTransactions = allTransactions.filter(
          transaction => transaction.type === 'PURCHASE'
        );
        
        setPurchases(purchaseTransactions);
        return { allTransactions, purchaseTransactions };
      } else {
        throw new Error(response.data?.message || 'Error al obtener transacciones');
      }
    } catch (err) {
      const errorMsg = err.response?.data?.message || err.message || 'Error al obtener transacciones';
      setError(errorMsg);
      console.error('Error fetching transactions:', err);
      return { allTransactions: [], purchaseTransactions: [] };
    } finally {
      setLoading(false);
    }
  }, []);
  
  // Obtener las compras de todas las cuentas del usuario
  const fetchAllPurchases = useCallback(async (accounts) => {
    if (!accounts || accounts.length === 0) {
      setError('No hay cuentas disponibles');
      return [];
    }
    
    setLoading(true);
    setError(null);
    
    try {
      // Obtener transacciones de todas las cuentas en serie para evitar sobrecarga
      let allTransactions = [];
      
      // Procesar cada cuenta una a una
      for (const account of accounts) {
        try {
          const response = await getAccountSummary(account.uid);
          
          if (response.data && response.data.success) {
            // Agregar información de la cuenta a cada transacción
            const accountTransactions = (response.data.transactions || []).map(transaction => ({
              ...transaction,
              accountNumber: account.numberAccount,
              accountType: account.typeAccount
            }));
            
            allTransactions = [...allTransactions, ...accountTransactions];
          }
        } catch (accountErr) {
          console.error(`Error fetching transactions for account ${account.uid}:`, accountErr);
          // Continuamos con otras cuentas incluso si una falla
        }
      }
      
      // Ordenar por fecha (más reciente primero)
      allTransactions.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      
      setTransactions(allTransactions);
      
      // Filtrar solo las compras (tipo PURCHASE)
      const purchaseTransactions = allTransactions.filter(
        transaction => transaction.type === 'PURCHASE'
      );
      
      setPurchases(purchaseTransactions);
      return purchaseTransactions;
    } catch (err) {
      const errorMsg = err.response?.data?.message || err.message || 'Error al obtener compras';
      setError(errorMsg);
      console.error('Error fetching all purchases:', err);
      return [];
    } finally {
      setLoading(false);
    }
  }, []);
  
  return {
    transactions,
    purchases,
    loading,
    error,
    fetchAccountTransactions,
    fetchAllPurchases
  };
};