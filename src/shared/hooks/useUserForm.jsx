import { useState, useEffect, useCallback } from 'react';
import { createUser, updateUser } from '../../services/api';
import toast from 'react-hot-toast';

const initialState = {
    username: '',
    name: '',
    email: '',
    password: '',
    dpi: '',
    address: '',
    phone: '',
    workName: '',
    monthlyIncome: ''
};

export const useUserForm = (user, onClose) => {
    const [formData, setFormData] = useState(initialState);
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState({});
    const isEditing = !!user;
    const [serverErrorMessage, setServerErrorMessage] = useState('');

    const resetForm = useCallback(() => {
        if (isEditing && user) {
            setFormData({
                username: user.username || '',
                name: user.name || '',
                email: user.email || '',
                password: '',
                dpi: user.dpi || '',
                address: user.address || '',
                phone: user.phone || '',
                workName: user.workName || '',
                monthlyIncome: user.monthlyIncome ? String(user.monthlyIncome) : ''
            });
        } else {
            setFormData(initialState);
        }
        setErrors({});
        setServerErrorMessage('');
    }, [user, isEditing]);

    useEffect(() => {
        resetForm();
    }, [resetForm]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({ ...prevState, [name]: value }));
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: null }));
        }
        setServerErrorMessage('');
    };

    const validatePassword = (password) => {
        if (!password) return false;
        
        const requirements = [
            password.length >= 6,           // Al menos 6 caracteres
            /[a-z]/.test(password),         // Al menos una minúscula
            /[A-Z]/.test(password),         // Al menos una mayúscula
            /\d/.test(password),            // Al menos un número
            /[!@#$%^&*(),.?":{}|<>]/.test(password)  // Al menos un símbolo
        ];
        
        return requirements.every(req => req);
    };

    const validateForm = () => {
        const newErrors = {};
        
        if (!formData.username.trim()) newErrors.username = "El nombre de usuario es obligatorio.";
        if (!formData.name.trim()) newErrors.name = "El nombre completo es obligatorio.";
        if (!formData.email.trim()) newErrors.email = "El correo es obligatorio.";
        
        if (!isEditing) {
            if (!formData.password) {
                newErrors.password = "La contraseña es obligatoria.";
            } else if (!validatePassword(formData.password)) {
                newErrors.password = "La contraseña no cumple con los requisitos de seguridad.";
            }
        }
        
        if (!formData.dpi.trim()) newErrors.dpi = "El DPI es obligatorio.";
        if (!formData.phone.trim()) newErrors.phone = "El teléfono es obligatorio.";
        if (!formData.address.trim()) newErrors.address = "La dirección es obligatoria.";
        if (!formData.workName.trim()) newErrors.workName = "El lugar de trabajo es obligatorio.";
        if (!formData.monthlyIncome.trim()) newErrors.monthlyIncome = "El ingreso mensual es obligatorio.";
        
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!validateForm()) {
            toast.error("Por favor, completa todos los campos obligatorios.");
            return;
        }

        setIsLoading(true);
        setServerErrorMessage('');

        try {
            const dataToSend = {
                username: formData.username.trim(),
                name: formData.name.trim(),
                email: formData.email.trim(),
                password: formData.password,
                dpi: formData.dpi.trim(),
                address: formData.address.trim(),
                phone: formData.phone.trim(),
                workName: formData.workName.trim(),
                monthlyIncome: parseFloat(formData.monthlyIncome) || 0
            };
            
            console.log("⚡ Datos que se enviarán al servidor:", JSON.stringify(dataToSend, null, 2));

            let response;
            
            if (isEditing) {
                delete dataToSend.password;
                delete dataToSend.dpi;
                delete dataToSend.email;
                
                response = await updateUser(user.uid, dataToSend);
            } else {
                response = await createUser(dataToSend);
            }
            
            console.log("✅ Respuesta exitosa:", response.data);
            toast.success(isEditing ? 'Usuario actualizado con éxito.' : 'Usuario creado con éxito.');
            onClose();
            
        } catch (err) {
            console.error("❌ Error completo:", err);
            
            const errorResponse = err.response?.data;
            const errorMessage = errorResponse?.message || 'Error al procesar la solicitud.';
            
            console.log("📌 Respuesta de error del servidor:", errorResponse);
            
            setServerErrorMessage(errorMessage);
            toast.error(errorMessage);
        } finally {
            setIsLoading(false);
        }
    };

    return {
        formData,
        isLoading,
        isEditing,
        errors,
        serverErrorMessage,
        handleChange,
        handleSubmit,
        resetForm,
        validatePassword  
    };
};