import { useState, useCallback, useEffect } from 'react';
import { getUsers, deleteUser } from '../../services/api';
import toast from 'react-hot-toast';

export const useUserManagement = (openNewUserDialog = false) => {
    const [users, setUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedUser, setSelectedUser] = useState(null);
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [isConfirmOpen, setIsConfirmOpen] = useState(false);
    const [userToDelete, setUserToDelete] = useState(null);
    const [isDeleting, setIsDeleting] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');

    const fetchUsers = useCallback(async () => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await getUsers();
            if (response.data?.success) {
                setUsers(response.data.users);
            } else {
                setError(response.data?.message || 'Error al cargar los usuarios.');
                toast.error(response.data?.message || 'Error al cargar los usuarios.');
            }
        } catch (err) {
            setError(err.message || 'Error de conexión al servidor.');
            toast.error(err.message || 'Error de conexión al servidor.');
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchUsers();
    }, [fetchUsers]);

    useEffect(() => {
        if (openNewUserDialog) {
            handleOpenForm();
        }
    }, [openNewUserDialog]);

    const handleOpenForm = (user = null) => {
        setSelectedUser(user);
        setIsFormOpen(true);
    };

    const handleCloseForm = (shouldRefresh = false) => {
        setSelectedUser(null);
        setIsFormOpen(false);
        if (shouldRefresh) {
            fetchUsers();
        }
    };

    const handleOpenConfirm = (user) => {
        setUserToDelete(user);
        setIsConfirmOpen(true);
    };

    const handleCloseConfirm = () => {
        setUserToDelete(null);
        setIsConfirmOpen(false);
    };

    const handleDeleteUser = async () => {
        if (!userToDelete) return;
        
        setIsDeleting(true);
        try {
            await deleteUser(userToDelete.uid);
            toast.success(`Usuario ${userToDelete.username} desactivado con éxito.`);
            fetchUsers();
        } catch (err) {
            toast.error(err.response?.data?.message || 'Error al desactivar el usuario.');
        } finally {
            setIsDeleting(false);
            handleCloseConfirm();
        }
    };

    const handleSearchChange = (value) => {
        setSearchTerm(value);
    };

    // Filtrar usuarios basados en el término de búsqueda
    const filteredUsers = searchTerm 
        ? users.filter(user => 
            user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.email.toLowerCase().includes(searchTerm.toLowerCase()))
        : users;

    return {
        users: filteredUsers,
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
    };
};