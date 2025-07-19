import { useState, useEffect, useCallback } from 'react';
import { getCurrentUser, updateMe, updatePassword as updatePasswordRequest } from '../../services/api';
import toast from 'react-hot-toast';

const initialProfileState = {
    name: '', username: '', email: '', dpi: '',
    address: '', phone: '', workName: '', monthlyIncome: ''
};

const initialPasswordState = {
    currentPassword: '', newPassword: '', confirmNewPassword: ''
};

export const useSettings = () => {
    const [profileData, setProfileData] = useState(initialProfileState);
    const [passwordData, setPasswordData] = useState(initialPasswordState);

    const [isLoading, setIsLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errors, setErrors] = useState({});

    const validatePassword = (password) => {
        if (!password) return false;
        const requirements = [
            password.length >= 6,
            /[a-z]/.test(password),
            /[A-Z]/.test(password),
            /\d/.test(password),
            /[!@#$%^&*(),.?":{}|<>]/.test(password)
        ];
        return requirements.every(req => req);
    };

    const fetchUser = useCallback(async () => {
        setIsLoading(true);
        try {
            const response = await getCurrentUser();
            if (response.data?.success && response.data.user) {
                const userData = response.data.user;
                setProfileData({
                    name: userData.name || '',
                    username: userData.username || '',
                    email: userData.email || '',
                    dpi: userData.dpi || '',
                    address: userData.address || '',
                    phone: userData.phone || '',
                    workName: userData.workName || '',
                    monthlyIncome: userData.monthlyIncome || ''
                });
            } else {
                toast.error(response.data?.message || 'No se pudieron cargar los datos.');
            }
        } catch (err) {
            console.error('Error al cargar datos:', err);
            toast.error('Ocurrió un error al cargar tus datos.');
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchUser();
    }, [fetchUser]);

    // Función mejorada para manejar cambios en los formularios
    const handleChange = useCallback((setState) => (e) => {
        // Verificación de seguridad para el evento
        if (!e || !e.target) {
            console.warn("handleChange recibió un evento inválido:", e);
            return;
        }

        const { name, value } = e.target;
        setState(prev => ({ ...prev, [name]: value }));
        
        // Limpia el error específico si existe
        if (errors[name]) {
            setErrors(prev => {
                const newErrors = { ...prev };
                delete newErrors[name];
                return newErrors;
            });
        }
    }, [errors]);

    const handleProfileSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            await updateMe(profileData);
            toast.success('¡Perfil actualizado con éxito!');
            await fetchUser(); // Recarga los datos para reflejar los cambios
        } catch (err) {
            console.error('Error al actualizar perfil:', err);
            toast.error(err.response?.data?.message || 'Error al actualizar el perfil.');
        } finally {
            setIsSubmitting(false);
        }
    };

    const handlePasswordSubmit = async (e) => {
        e.preventDefault();
        const newErrors = {};
        
        if (!validatePassword(passwordData.newPassword)) {
            newErrors.newPassword = 'La contraseña debe tener al menos 6 caracteres, incluir mayúsculas, minúsculas, números y caracteres especiales.';
        }
        if (passwordData.newPassword !== passwordData.confirmNewPassword) {
            newErrors.confirmNewPassword = 'Las contraseñas no coinciden.';
        }
        setErrors(newErrors);
        
        if (Object.keys(newErrors).length > 0) return;

        setIsSubmitting(true);
        try {
            await updatePasswordRequest({
                currentPassword: passwordData.currentPassword,
                newPassword: passwordData.newPassword,
            });
            toast.success('¡Contraseña actualizada con éxito!');
            setPasswordData(initialPasswordState); // Limpia el formulario tras el éxito
        } catch (err) {
            console.error('Error al cambiar contraseña:', err);
            toast.error(err.response?.data?.message || 'Error al cambiar la contraseña.');
        } finally {
            setIsSubmitting(false);
        }
    };

    // Creamos funciones específicas para cada formulario
    const handleProfileChange = useCallback((e) => {
        handleChange(setProfileData)(e);
    }, [handleChange]);

    const handlePasswordChange = useCallback((e) => {
        handleChange(setPasswordData)(e);
    }, [handleChange]);

    return {
        profileData,
        passwordData,
        isLoading,
        isSubmitting,
        errors,
        handleProfileChange,
        handlePasswordChange,
        handleProfileSubmit,
        handlePasswordSubmit,
    };
};