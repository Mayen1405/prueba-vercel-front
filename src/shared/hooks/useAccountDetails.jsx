import { useState, useEffect, useCallback } from 'react';
import { getAccountSummary } from '../../services/api';
import toast from 'react-hot-toast';

export const useAccountDetails = (accountId) => {
  const [account, setAccount] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [balance, setBalance] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchAccountDetails = useCallback(async () => {
    if (!accountId) return;
    
    setLoading(true);
    setError(null);
    try {
      const response = await getAccountSummary(accountId);
      
      if (response && response.data) {
        // Extraer la información de la cuenta desde las transacciones
        let accountInfo = null;
        if (response.data.transactions && response.data.transactions.length > 0) {
          const transaction = response.data.transactions[0];
          if (transaction.fromAccount && transaction.fromAccount._id === accountId) {
            accountInfo = transaction.fromAccount;
          } else if (transaction.toAccount && transaction.toAccount._id === accountId) {
            accountInfo = transaction.toAccount;
          }
        }
        
        // Actualizar el estado con la información recuperada
        setAccount(accountInfo);
        setTransactions(response.data.transactions || []);
        setBalance(response.data.balance || 0);
      } else {
        throw new Error('Respuesta de API inválida');
      }
    } catch (err) {
      const errorMsg = err.message || 'Error al cargar detalles de cuenta';
      setError(errorMsg);
      toast.error(errorMsg);
      console.error('Error fetching account details:', err);
    } finally {
      setLoading(false);
    }
  }, [accountId]);

  useEffect(() => {
    fetchAccountDetails();
  }, [fetchAccountDetails]);

  const getTransactionTypeLabel = (type) => {
    const labels = {
      'DEPOSIT': 'Depósito',
      'IN_TRANSFER': 'Transferencia Recibida',
      'OUT_TRANSFER': 'Transferencia Enviada',
      'WITHDRAWAL': 'Retiro',
      'PURCHASE': 'Compra'
    };
    return labels[type] || type;
  };

  const refreshData = () => {
    fetchAccountDetails();
  };

  return {
    account,
    transactions,
    balance,
    loading,
    error,
    getTransactionTypeLabel,
    refreshData
  };
};