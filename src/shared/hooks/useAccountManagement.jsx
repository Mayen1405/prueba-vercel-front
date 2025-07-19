import { useState, useEffect, useCallback } from 'react';
import { getAllAccounts, deleteAccount, getAccountSummary } from '../../services/api';
import toast from 'react-hot-toast';

export const useAccountManagement = () => {
  const [accounts, setAccounts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [accountToDelete, setAccountToDelete] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUserId, setSelectedUserId] = useState(null);
    const [isDetailsDialogOpen, setIsDetailsDialogOpen] = useState(false);
  const [selectedAccount, setSelectedAccount] = useState(null);
  const [accountDetails, setAccountDetails] = useState(null);
  const [detailsLoading, setDetailsLoading] = useState(false);
  const [detailsError, setDetailsError] = useState(null);

  const fetchAccounts = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await getAllAccounts();
      setAccounts(response.data || []);
    } catch (err) {
      const errorMsg = err.response?.data?.message || 'Error al cargar las cuentas';
      setError(errorMsg);
      toast.error(errorMsg);
      console.error('Error fetching accounts:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAccounts();
  }, [fetchAccounts]);

  const handleOpenForm = (userId = null) => {
    setSelectedUserId(userId);
    setIsFormOpen(true);
  };

  const handleCloseForm = (shouldRefresh = false) => {
    setSelectedUserId(null);
    setIsFormOpen(false);
    
    if (shouldRefresh) {
      fetchAccounts();
    }
  };

  const handleOpenDeleteDialog = (account) => {
    setAccountToDelete(account);
    setIsDeleteDialogOpen(true);
  };

  const handleCloseDeleteDialog = () => {
    setAccountToDelete(null);
    setIsDeleteDialogOpen(false);
  };

  const handleDeleteAccount = async () => {
    if (!accountToDelete) return;
    
    setIsDeleting(true);
    try {
      await deleteAccount(accountToDelete.uid);
      toast.success('Cuenta desactivada con éxito');
      fetchAccounts();
    } catch (err) {
      const errorMsg = err.response?.data?.message || 'Error al desactivar la cuenta';
      toast.error(errorMsg);
      console.error('Error deleting account:', err);
    } finally {
      setIsDeleting(false);
      handleCloseDeleteDialog();
    }
  };

  const handleSearchChange = (value) => {
    setSearchTerm(value);
  };

  const handleViewDetails = async (account) => {
    setSelectedAccount(account);
    setIsDetailsDialogOpen(true);
    setDetailsLoading(true);
    setDetailsError(null);
    setAccountDetails(null);
    
    try {
      const response = await getAccountSummary(account.uid);
      if (response && response.data) {
        setAccountDetails({
          balance: response.data.balance,
          transactions: response.data.transactions || []
        });
      } else {
        throw new Error('No se pudieron cargar los detalles de la cuenta');
      }
    } catch (err) {
      const errorMsg = err.response?.data?.message || err.message || 'Error al cargar los detalles de la cuenta';
      setDetailsError(errorMsg);
      toast.error(errorMsg);
      console.error('Error fetching account details:', err);
    } finally {
      setDetailsLoading(false);
    }
  };

  const handleCloseDetailsDialog = () => {
    setSelectedAccount(null);
    setAccountDetails(null);
    setIsDetailsDialogOpen(false);
  };

  const filteredAccounts = searchTerm 
    ? accounts.filter(account => 
        account.numberAccount.toLowerCase().includes(searchTerm.toLowerCase()) ||
        account.typeAccount.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (account.user?.name && account.user.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (account.user?.email && account.user.email.toLowerCase().includes(searchTerm.toLowerCase()))
      )
    : accounts;

  return {
    accounts: filteredAccounts,
    loading,
    error,
    isFormOpen,
    isDeleteDialogOpen,
    accountToDelete,
    isDeleting,
    searchTerm,
    selectedUserId,
    fetchAccounts,
    handleOpenForm,
    handleCloseForm,
    handleOpenDeleteDialog,
    handleCloseDeleteDialog,
    handleDeleteAccount,
    handleSearchChange,
    isDetailsDialogOpen,
    selectedAccount,
    accountDetails,
    detailsLoading,
    detailsError,
    handleViewDetails,
    handleCloseDetailsDialog
  };
};