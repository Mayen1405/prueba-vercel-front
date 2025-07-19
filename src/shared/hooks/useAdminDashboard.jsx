import { useState, useEffect, useCallback } from 'react';
import { 
    getUsers, 
    getAllAccounts, 
    getProducts, 
    getAllDeposits 
} from '../../services/api';
import toast from 'react-hot-toast';

export const useAdminDashboard = () => {
    const [stats, setStats] = useState({ userCount: 0, accountCount: 0, productCount: 0 });
    const [recentActivity, setRecentActivity] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const fetchData = useCallback(async () => {
        setIsLoading(true);
        try {
            // Se eliminó la llamada a `getAccountsByTransactionCount`
            const [usersRes, accountsRes, productsRes, depositsRes] = await Promise.all([
                getUsers(),
                getAllAccounts(),
                getProducts(),
                getAllDeposits()
            ]);

            // Procesar las estadísticas (KPIs)
            const activeUsers = usersRes.data.users.filter(u => u.status).length;
            setStats({
                userCount: activeUsers,
                accountCount: accountsRes.data.length,
                productCount: productsRes.data.length
            });

            // Se eliminó el procesamiento del gráfico

            // Usamos los depósitos más recientes como "Actividad Reciente"
            const formattedRecentActivity = depositsRes.data.deposits.slice(0, 4).map(dep => ({
                id: dep.tid,
                action: 'Depósito Recibido',
                details: `Q${dep.amount.toFixed(2)} a ${dep.toAccount?.user?.name || 'N/A'}`,
                timestamp: dep.createdAt,
                status: 'success'
            }));
            setRecentActivity(formattedRecentActivity);

        } catch (error) {
            console.error("Error al cargar los datos del panel de administración:", error);
            toast.error("No se pudieron cargar los datos del panel.");
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    // Se eliminó `topAccounts` de los datos retornados
    return { stats, recentActivity, isLoading, refresh: fetchData };
};