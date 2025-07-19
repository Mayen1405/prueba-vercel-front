import axios from 'axios';

const apiClient = axios.create({
    baseURL: 'http://localhost:3001/cci/v1/',
    timeout: 10000,
    httpsAgent: false
});

apiClient.interceptors.request.use(
    (config) => {
        const userDetails = localStorage.getItem("usuario")

        if(userDetails){
            const token = JSON.parse(userDetails).token
            config.headers.Authorization = `Bearer ${token}`
        }
        return config
    },
    (e) => {
        return Promise.reject(e)
    }
);

apiClient.interceptors.response.use(
    response => response,
    error => {
        if (error.response && error.response.status === 401) {
            localStorage.removeItem('usuario');
            window.location.href = '/auth';
        }
        return Promise.reject(error);
    }
);

export const login = async (data) => {
    return await apiClient.post('/auth/login', data);
}

export const updateMe = async (data) => {
    console.log("API: Enviando datos de actualización:", data);
    
    const cleanData = {};
    
    if (data.name && data.name.trim() !== '') cleanData.name = data.name.trim();
    if (data.username && data.username.trim() !== '') cleanData.username = data.username.trim();
    if (data.address && data.address.trim() !== '') cleanData.address = data.address.trim();
    if (data.phone && data.phone.trim() !== '') cleanData.phone = data.phone.trim();
    if (data.workName && data.workName.trim() !== '') cleanData.workName = data.workName.trim();
    
    if (data.monthlyIncome !== undefined && data.monthlyIncome !== null && data.monthlyIncome !== '') {
        const numValue = Number(data.monthlyIncome);
        if (!isNaN(numValue)) { 
            cleanData.monthlyIncome = numValue;
        }
    }
    
    console.log("API: Datos limpios a enviar:", cleanData);
    
    if (Object.keys(cleanData).length === 0) {
        return { 
            data: { 
                success: true, 
                message: 'No changes to update' 
            } 
        };
    }
    
    try {
        const response = await apiClient.put('/user/me', cleanData);
        console.log("API: Respuesta recibida:", response.data);
        return response;
    } catch (error) {
        console.error("API: Error al actualizar usuario:", error.response?.data || error.message);
        throw error;
    }
}

export const updatePassword = async (data) => {
    return await apiClient.patch('/user/password', data);
}

export const getCurrentUser = async () => {
    try {
        return await apiClient.get('/user/me/information');
    } catch (error) {
        console.error('Error al obtener datos del usuario:', error);
        return {
            data: {
                success: false,
                message: 'Error al obtener datos del usuario'
            }
        };
    }
}

export const getUsers = async () => {
    return await apiClient.get('/user');
}

export const createUser = async (data) => {
    return await apiClient.post('/user', data);
}

export const updateUser = async (uid, data) => {
    return await apiClient.put(`/user/${uid}`, data);
}

export const deleteUser = async (uid) => {
    return await apiClient.delete(`/user/${uid}`);
}

// Products
export const getProducts = async () => {
    return await apiClient.get('/product/getProducts');
}

export const getProductById = async (id) => {
    return await apiClient.get(`/product/getProducts/${id}`);
}

export const createProduct = async (data) => {
    return await apiClient.post('/product/createProduct', data);
}

export const updateProduct = async (id, data) => {
    return await apiClient.put(`/product/updateProduct/${id}`, data);
}

export const deleteProduct = async (id) => {
    return await apiClient.delete(`/product/deleteProduct/${id}`);
}

// Accounts
export const getUserAccounts = async () => {
    return await apiClient.get('/account/getMyAccounts');
}

export const getAllAccounts = async () => {
    return await apiClient.get('/account/getAccounts');
}

export const createAccount = async (data) => {
    return await apiClient.post('/account/createAccount', data);
}

export const deleteAccount = async (id) => {
    return await apiClient.delete(`/account/deleteAccount/${id}`);
}

// Transactions
export const getAccountSummary = async (accountId) => {
    return await apiClient.get(`/transaction/summary/${accountId}`);
}

export const makeTransfer = async (data) => {
    return await apiClient.post('/transaction/transfer', data);
}

export const purchaseProduct = async (data) => {
    return await apiClient.post('/transaction/purchase', data);
}

export const makeDeposit = async (data) => {
    return await apiClient.post('/transaction/deposit', data);
};

export const modifyDeposit = async (data) => {
    return await apiClient.put('/transaction/deposit/modify', data);
}

export const revertDeposit = async (transactionId) => {
    return await apiClient.post('/transaction/deposit/revert', { transactionId });
}

export const getAccountsByTransactionCount = async (order = 'desc') => {
    return await apiClient.get(`/transaction/accounts-by-transaction-count?order=${order}`);
}

export const getAllDeposits = async () => {
    return await apiClient.get('/transaction/deposits');
}

export const convertCurrency = async (from, to, amount) => {
    return await apiClient.get(`/currency/convert?from=${from}&to=${to}&amount=${amount}`);
};

// Favorites
export const getFavorites = async () => {
    return await apiClient.get('/user/me/favorites');
}

export const removeFavorite = async (accountId) => {
    return await apiClient.delete(`/user/me/favorites/${accountId}`);
}

export const addFavorite = async (data) => {
    return await apiClient.post('/user/me/favorites', data);
}
