import { useState, useEffect, useCallback } from 'react';
import { getUserAccounts, getAccountSummary } from '../../services/api';
import toast from 'react-hot-toast';

export const useDashboard = () => {
    const [accounts, setAccounts] = useState([]);
    const [recentTransactions, setRecentTransactions] = useState([]);
    const [totalBalance, setTotalBalance] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchData = useCallback(async () => {
        setIsLoading(true);
        setError(null);
        try {
            // 1. Obtener las cuentas del usuario
            const accountsResponse = await getUserAccounts();
            const userAccounts = accountsResponse.data || [];
            setAccounts(userAccounts);

            // 2. Calcular el saldo total
            const total = userAccounts.reduce((sum, account) => sum + account.balance, 0);
            setTotalBalance(total);

            // 3. Obtener las transacciones de todas las cuentas
            let allTransactions = [];
            for (const account of userAccounts) {
                try {
                    const summaryRes = await getAccountSummary(account.uid);
                    if (summaryRes.data?.success && summaryRes.data.transactions) {
                        allTransactions.push(...summaryRes.data.transactions);
                    }
                } catch (summaryErr) {
                    console.error(`Error al obtener transacciones de la cuenta ${account.numberAccount}`, summaryErr);
                }
            }

            // 4. Ordenar por fecha y tomar las 5 más recientes
            allTransactions.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
            setRecentTransactions(allTransactions.slice(0, 5));

        } catch (err) { // Esta es la línea 43
            // CORRECCIÓN AQUÍ: Usamos la variable 'err' para el log.
            console.error("Error cargando los datos del panel:", err);
            const errorMsg = "No se pudieron cargar los datos del panel.";
            setError(errorMsg);
            toast.error(errorMsg);
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    return { accounts, totalBalance, recentTransactions, isLoading, error, refreshDashboard: fetchData };
};