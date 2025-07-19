import { useState, useCallback } from 'react';
import { getAccountsByTransactionCount } from '../../services/api';
import toast from 'react-hot-toast';

export const useTransactionReport = () => {
    const [reportData, setReportData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchReport = useCallback(async (order) => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await getAccountsByTransactionCount(order);
            if (response.data.success) {
                // Mapeamos los datos para que sean más fáciles de usar en el gráfico
                const formattedData = response.data.accounts.map(item => ({
                    name: item.account.numberAccount,
                    count: item.count
                }));
                setReportData(formattedData);
            } else {
                throw new Error('No se pudo cargar el reporte.');
            }
        } catch (err) {
            const errorMsg = err.response?.data?.message || 'Error al cargar el reporte.';
            setError(errorMsg);
            toast.error(errorMsg);
        } finally {
            setIsLoading(false);
        }
    }, []);

    return {
        reportData,
        isLoading,
        error,
        fetchReport,
    };
};