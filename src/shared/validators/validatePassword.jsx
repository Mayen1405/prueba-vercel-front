export const validatePassword = (password) => {
    if (!password) return false;
    
    if (typeof password !== 'string') return false;
    
    const regex = /^\S{6,12}$/;
    return regex.test(password);
};

