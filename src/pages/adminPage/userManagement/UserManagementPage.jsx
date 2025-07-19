import React from 'react';
import {
    Box, Container, CircularProgress, Alert
} from '@mui/material';
import { useUserManagement } from '../../../shared/hooks/useUserManagement';
import { UserTable, UserActionBar, UserDeleteDialog } from '../../../components/admin/user';
import { UserForm } from '../../../components/UserForm';

export const UserManagementPage = ({ openNewUserDialog = false }) => {
    const {
        users,
        isLoading,
        error,
        selectedUser,
        isFormOpen,
        isConfirmOpen,
        userToDelete,
        isDeleting,
        searchTerm,
        handleOpenForm,
        handleCloseForm,
        handleOpenConfirm,
        handleCloseConfirm,
        handleDeleteUser,
        handleSearchChange
    } = useUserManagement(openNewUserDialog);

    if (isLoading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
                <CircularProgress />
            </Box>
        );
    }

    if (error) {
        return (
            <Container maxWidth="lg" sx={{ py: 4 }}>
                <Alert severity="error">{error}</Alert>
            </Container>
        );
    }

    return (
        <Container maxWidth="lg" sx={{ py: 4 }}>
            {/* Barra de acciones */}
            <UserActionBar 
                onAddUser={() => handleOpenForm()} 
                searchTerm={searchTerm}
                onSearchChange={handleSearchChange}
            />
            
            {/* Tabla de usuarios */}
            <UserTable 
                users={users} 
                onEdit={handleOpenForm} 
                onDelete={handleOpenConfirm} 
            />
            
            {/* Formulario de usuario (modal) */}
            {isFormOpen && (
                <UserForm
                    open={isFormOpen}
                    onClose={() => handleCloseForm(true)}
                    user={selectedUser}
                />
            )}
            
            {/* Diálogo de confirmación para eliminar */}
            <UserDeleteDialog 
                open={isConfirmOpen}
                onClose={handleCloseConfirm}
                onConfirm={handleDeleteUser}
                user={userToDelete}
                isDeleting={isDeleting}
            />
        </Container>
    );
};