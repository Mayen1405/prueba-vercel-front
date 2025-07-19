import { useState, useCallback } from 'react';
import { getUserAccounts, getAllAccounts, createAccount, deleteAccount } from '../../services/api';

export const useAccounts = () => {
  const [accounts, setAccounts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedAccount, setSelectedAccount] = useState(null);

  // Usar useCallback para estabilizar la función
  const fetchUserAccounts = useCallback(async () => {
    setLoading(true);
    try {
      const response = await getUserAccounts();
      setAccounts(response.data);
      setError(null);
      return response.data;
    } catch (err) {
      setError(err.response?.data?.message || 'Error al cargar cuentas');
      console.error('Error fetching accounts:', err);
      return [];
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchAllAccounts = useCallback(async () => {
    setLoading(true);
    try {
      const response = await getAllAccounts();
      setAccounts(response.data);
      setError(null);
      return response.data;
    } catch (err) {
      setError(err.response?.data?.message || 'Error al cargar todas las cuentas');
      console.error('Error fetching all accounts:', err);
      return [];
    } finally {
      setLoading(false);
    }
  }, []);

  const handleCreateAccount = useCallback(async (data) => {
    setLoading(true);
    try {
      const response = await createAccount(data);
      setAccounts(prev => [...prev, response.data]);
      return response.data;
    } catch (err) {
      setError(err.response?.data?.message || 'Error al crear cuenta');
      console.error('Error creating account:', err);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  const handleDeleteAccount = useCallback(async (id) => {
    setLoading(true);
    try {
      await deleteAccount(id);
      setAccounts(prev => prev.filter(account => account.id !== id));
      return true;
    } catch (err) {
      setError(err.response?.data?.message || 'Error al eliminar cuenta');
      console.error('Error deleting account:', err);
      return false;
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    accounts,
    loading,
    error,
    selectedAccount,
    setSelectedAccount,
    fetchUserAccounts,
    fetchAllAccounts,
    createAccount: handleCreateAccount,
    deleteAccount: handleDeleteAccount
  };
};