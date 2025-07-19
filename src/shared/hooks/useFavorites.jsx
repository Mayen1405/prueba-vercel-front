import { useState, useCallback, useEffect } from 'react';
import { getFavorites, addFavorite, removeFavorite } from '../../services/api';
import toast from 'react-hot-toast';

export const useFavorites = () => {
    const [favorites, setFavorites] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchFavorites = useCallback(async () => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await getFavorites();
            if (response.data?.success) {
                setFavorites(response.data.favorites || []);
            } else {
                throw new Error('No se pudieron cargar los favoritos.');
            }
        } catch (err) {
            const errorMsg = err.response?.data?.message || 'Error al cargar favoritos.';
            setError(errorMsg);
            // No mostramos toast de error aquí para no ser repetitivos.
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchFavorites();
    }, [fetchFavorites]);

    const handleAddFavorite = async (accountNumber, alias) => {
        setIsLoading(true);
        try {
            await addFavorite({ accountNumber, alias });
            toast.success('¡Favorito agregado con éxito!');
            await fetchFavorites(); // Recargamos la lista para mostrar el nuevo favorito.
        } catch (err) {
            const errorMsg = err.response?.data?.message || 'No se pudo agregar el favorito.';
            toast.error(errorMsg);
        } finally {
            setIsLoading(false);
        }
    };

    const handleRemoveFavorite = async (accountId) => {
        setIsLoading(true);
        try {
            await removeFavorite(accountId);
            toast.success('Favorito eliminado correctamente.');
            
            // CORRECCIÓN CLAVE:
            // En lugar de filtrar el estado local, volvemos a solicitar la lista actualizada.
            // Esto garantiza que la UI siempre refleje el estado real del servidor.
            await fetchFavorites();

        } catch (err) {
            const errorMsg = err.response?.data?.message || 'No se pudo eliminar el favorito.';
            toast.error(errorMsg);
        } finally {
            setIsLoading(false);
        }
    };

    return {
        favorites,
        isLoading,
        error,
        addFavorite: handleAddFavorite,
        removeFavorite: handleRemoveFavorite,
        refreshFavorites: fetchFavorites
    };
};