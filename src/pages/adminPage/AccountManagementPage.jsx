import React from 'react';
import { Container, Box, CircularProgress, Alert, Button } from '@mui/material';
import { useAccountManagement } from '../../shared/hooks/useAccountManagement';
import { 
  AccountTable, 
  AccountActionBar, 
  AccountForm, 
  AccountDeleteDialog,
  AccountDetailsDialog 
} from '../../components/admin/account';

export const AccountManagementPage = () => {
  const {
    accounts,
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
    // Nuevas propiedades para detalles
    isDetailsDialogOpen,
    selectedAccount,
    accountDetails,
    detailsLoading,
    detailsError,
    handleViewDetails,
    handleCloseDetailsDialog
  } = useAccountManagement();

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <AccountActionBar 
        onAddAccount={() => handleOpenForm()} 
        searchTerm={searchTerm}
        onSearchChange={handleSearchChange}
      />
      
      {error && (
        <Alert 
          severity="error" 
          sx={{ mb: 3 }}
          action={
            <Button onClick={fetchAccounts}>
              Reintentar
            </Button>
          }
        >
          {error}
        </Alert>
      )}
      
      <AccountTable 
        accounts={accounts} 
        onDelete={handleOpenDeleteDialog}
        onViewDetails={handleViewDetails}
      />
      
      <AccountForm 
        open={isFormOpen}
        onClose={handleCloseForm}
        userId={selectedUserId}
      />
      
      <AccountDeleteDialog 
        open={isDeleteDialogOpen}
        onClose={handleCloseDeleteDialog}
        onConfirm={handleDeleteAccount}
        account={accountToDelete}
        isDeleting={isDeleting}
      />
      
      <AccountDetailsDialog
        open={isDetailsDialogOpen}
        onClose={handleCloseDetailsDialog}
        account={selectedAccount}
        details={accountDetails}
        loading={detailsLoading}
        error={detailsError}
      />
    </Container>
  );
};