import { useState, useEffect, useCallback } from 'react';
import { getUserAccounts } from '../../services/api';
import toast from 'react-hot-toast';

export const useClientAccounts = () => {
  const [accounts, setAccounts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedAccount, setSelectedAccount] = useState(null);

  const fetchAccounts = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await getUserAccounts();
      setAccounts(response.data || []);
    } catch (err) {
      const errorMsg = err.response?.data?.message || 'Error al cargar las cuentas';
      setError(errorMsg);
      toast.error(errorMsg);
      console.error('Error fetching user accounts:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAccounts();
  }, [fetchAccounts]);

  const handleSelectAccount = (account) => {
    setSelectedAccount(account);
  };

  const getTotalBalance = () => {
    return accounts.reduce((sum, account) => sum + account.balance, 0);
  };

  return {
    accounts,
    loading,
    error,
    selectedAccount,
    fetchAccounts,
    handleSelectAccount,
    getTotalBalance
  };
};