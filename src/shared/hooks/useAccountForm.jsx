import { useState, useEffect } from 'react';
import { createAccount, getUsers } from '../../services/api';
import toast from 'react-hot-toast';

export const useAccountForm = (onSuccess, initialUserId = null) => {
  const [formData, setFormData] = useState({
    user: initialUserId || '',
    typeAccount: 'AHORRO',
    balance: '0'  // Inicializar con 0
  });
  
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [usersLoading, setUsersLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadUsers = async () => {
      setUsersLoading(true);
      try {
        const response = await getUsers();
        if (response.data?.success) {
          // Filtrar solo usuarios activos
          const activeUsers = response.data.users.filter(user => user.status);
          setUsers(activeUsers);
        } else {
          toast.error('Error al cargar usuarios');
        }
      } catch (err) {
        console.error('Error loading users:', err);
        toast.error('No se pudieron cargar los usuarios');
      } finally {
        setUsersLoading(false);
      }
    };

    loadUsers();
  }, []);

  useEffect(() => {
    if (initialUserId) {
      setFormData(prev => ({ ...prev, user: initialUserId }));
    }
  }, [initialUserId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    const errors = {};
    if (!formData.user) errors.user = "Seleccione un usuario";
    if (!formData.typeAccount) errors.typeAccount = "Seleccione un tipo de cuenta";
    
    const balance = parseFloat(formData.balance);
    if (isNaN(balance) || balance < 0) {
      errors.balance = "El saldo inicial debe ser un número positivo o cero";
    }
    
    return {
      valid: Object.keys(errors).length === 0,
      errors
    };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const { valid, errors } = validateForm();
    if (!valid) {
      let errorMessage = "Por favor corrija los siguientes errores:\n";
      Object.values(errors).forEach(err => {
        errorMessage += `- ${err}\n`;
      });
      setError(errorMessage);
      return;
    }
    
    setLoading(true);
    setError(null);
    
    try {
      // Formatear los datos correctamente
      const accountData = {
        user: formData.user,
        typeAccount: formData.typeAccount,
        balance: parseFloat(formData.balance) || 0
      };
      
      console.log("Enviando datos al servidor:", accountData);
      
      const response = await createAccount(accountData);
      console.log("Respuesta del servidor:", response);
      
      toast.success("Cuenta creada con éxito");
      setFormData({
        user: '',
        typeAccount: 'AHORRO',
        balance: '0'
      });
      
      if (onSuccess) onSuccess(true);
      
    } catch (err) {
      console.error('Error creating account:', err);
      
      let errorMsg = "Error al crear la cuenta";
      
      if (err.response?.data) {
        errorMsg = err.response.data.message || errorMsg;
        
        // Mostrar detalles técnicos en la consola
        if (err.response.data.error) {
          console.error("Detalles del error:", err.response.data.error);
        }
        
        // Si es un error de clave duplicada
        if (err.response.data.error && err.response.data.error.includes('duplicate key')) {
          errorMsg = "Ya existe una cuenta con ese número. Por favor intente nuevamente.";
        }
      }
      
      setError(errorMsg);
      toast.error(errorMsg);
      
    } finally {
      setLoading(false);
    }
  };

  return {
    formData,
    users,
    loading,
    usersLoading,
    error,
    handleChange,
    handleSubmit,
    setFormData // Exportamos esta función para poder actualizar el form desde afuera
  };
};