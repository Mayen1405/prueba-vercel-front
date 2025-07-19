import { useState, useCallback, useEffect } from 'react';
import { makeTransfer, getUserAccounts } from '../../services/api';
import toast from 'react-hot-toast';

export const useTransfers = () => {
    const [myAccounts, setMyAccounts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState(null);

    const fetchUserAccounts = useCallback(async () => {
        setIsLoading(true);
        try {
            const response = await getUserAccounts();
            setMyAccounts(response.data || []);
        } catch (err) { // Esta es la línea 17
            // CORRECCIÓN AQUÍ: Usamos la variable 'err'
            console.error("Error fetching user accounts:", err); 
            toast.error("No se pudieron cargar tus cuentas.");
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchUserAccounts();
    }, [fetchUserAccounts]);

    const handleTransfer = async (fromNumberAccount, toNumberAccount, amount) => {
        setIsSubmitting(true);
        setError(null);
        try {
            await makeTransfer({ fromNumberAccount, toNumberAccount, amount });
            toast.success('¡Transferencia realizada con éxito!');
            fetchUserAccounts(); // Refrescar saldos
            return true;
        } catch (err) {
            const errorMsg = err.response?.data?.message || 'Error al realizar la transferencia.';
            setError(errorMsg);
            toast.error(errorMsg);
            return false;
        } finally {
            setIsSubmitting(false);
        }
    };

    return {
        myAccounts,
        isLoading,
        isSubmitting,
        error,
        handleTransfer,
    };
};