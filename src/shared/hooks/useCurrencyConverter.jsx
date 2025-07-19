import { useState } from 'react';
import { convertCurrency } from '../../services/api';

export const useCurrencyConverter = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [result, setResult] = useState(null);

    const convert = async (from, to, amount) => {
        try {
            setIsLoading(true);
            setError(null);
            const response = await convertCurrency(from, to, amount);
            setResult(response.data);
            return response.data;
        } catch (err) {
            setError(err.response?.data?.message || 'Error al realizar la conversión');
            return null;
        } finally {
            setIsLoading(false);
        }
    };

    const clearResult = () => setResult(null);

    return {
        convert,
        isLoading,
        error,
        result,
        clearResult
    };
};