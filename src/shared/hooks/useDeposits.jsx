import { useState, useCallback, useEffect } from 'react';
import { makeDeposit, modifyDeposit, revertDeposit, getAllDeposits } from '../../services/api';
import toast from 'react-hot-toast';

export const useDeposits = () => {
    const [deposits, setDeposits] = useState([]);
    const [isLoading, setIsLoading] = useState(true); // Inicia en true para la carga inicial
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState(null);

    const fetchDeposits = useCallback(async () => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await getAllDeposits();
            if (response.data.success) {
                setDeposits(response.data.deposits || []);
            } else {
                throw new Error('No se pudieron cargar los depósitos.');
            }
        } catch (err) {
            const errorMsg = err.response?.data?.message || 'Error al cargar los depósitos.';
            setError(errorMsg);
            toast.error(errorMsg);
        } finally {
            setIsLoading(false);
        }
    }, []);

    // Descomentamos esto para que cargue los depósitos al iniciar
    useEffect(() => {
        fetchDeposits(); 
    }, [fetchDeposits]);

    const handleMakeDeposit = async (toNumberAccount, amount) => {
        setIsSubmitting(true);
        try {
            await makeDeposit({ toNumberAccount, amount });
            toast.success('¡Depósito realizado con éxito!');
            fetchDeposits(); // Actualizar la lista después de un nuevo depósito
            return true;
        } catch (err) {
            const errorMsg = err.response?.data?.message || 'Error al realizar el depósito.';
            toast.error(errorMsg);
            return false;
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleModifyDeposit = async (transactionId, newAmount) => {
        setIsSubmitting(true);
        try {
            await modifyDeposit({ transactionId, newAmount });
            toast.success('Depósito modificado con éxito.');
            fetchDeposits(); // Actualizar la lista
        } catch (err) {
            toast.error(err.response?.data?.message || 'Error al modificar el depósito.');
        } finally {
            setIsSubmitting(false);
        }
    };
    
    const handleRevertDeposit = async (transactionId) => {
        setIsSubmitting(true);
        try {
            await revertDeposit(transactionId);
            toast.success('Depósito revertido correctamente.');
            fetchDeposits(); // Actualizar la lista
        } catch (err) {
            toast.error(err.response?.data?.message || 'Error al revertir el depósito.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return {
        deposits,
        isLoading,
        isSubmitting,
        error,
        makeDeposit: handleMakeDeposit,
        modifyDeposit: handleModifyDeposit,
        revertDeposit: handleRevertDeposit,
    };
};