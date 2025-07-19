import { useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode'; 

export const useUser = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [userRole, setUserRole] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuthStatus = () => {
      setIsLoading(true);
      try {
        const userDetails = localStorage.getItem('usuario');
        
        if (userDetails) {
          const user = JSON.parse(userDetails);
          const token = user.token;
          
          try {
            const decodedToken = jwtDecode(token);
            const currentTime = Date.now() / 1000;
            
            if (decodedToken.exp && decodedToken.exp > currentTime) {
              setIsLoggedIn(true);
              setUsername(user.username || '');
              setUserRole(user.role || '');
            } else {
              localStorage.removeItem('usuario');
              setIsLoggedIn(false);
            }
          } catch (e) {
            console.error("Error decoding token:", e);
            localStorage.removeItem('usuario');
            setIsLoggedIn(false);
            setUsername('');
            setUserRole('');
          }
        } else {
          setIsLoggedIn(false);
        }
      } catch (error) {
        console.error("Error checking auth status:", error);
        setIsLoggedIn(false);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuthStatus();
    
    const handleStorageChange = () => {
      checkAuthStatus();
    };
    
    window.addEventListener('storage', handleStorageChange);
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  const logout = () => {
    localStorage.removeItem('usuario');
    setIsLoggedIn(false);
    setUsername('');
    setUserRole('');
    window.location.href = '/auth';};

  return { isLoggedIn, username, userRole, isLoading, logout };
};