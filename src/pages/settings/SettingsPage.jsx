import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import {
    Box, Container, CircularProgress, Grid, Card, CardActionArea,
    Typography, useTheme, Paper, IconButton
} from '@mui/material';
import { useSettings } from '../../shared/hooks/useSettings';
import { useFavorites } from '../../shared/hooks/useFavorites';
import { SettingsHeader, ProfileForm, PasswordForm } from '../../components/settings';
import { AddFavoriteForm, FavoritesList } from '../../components/settings/Favorites';
import PersonIcon from '@mui/icons-material/Person';
import LockIcon from '@mui/icons-material/Lock';
import StarIcon from '@mui/icons-material/Star';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

export const SettingsPage = () => {
    const location = useLocation(); // Hook para leer el estado de la navegación
    const theme = useTheme();
    
    // El estado inicial de la sección activa depende de lo que se pase en la navegación
    const [activeSection, setActiveSection] = useState(location.state?.openSection || 'profile');
    
    const {
        profileData,
        passwordData,
        isLoading,
        isSubmitting,
        errors,
        handleProfileChange,
        handlePasswordChange,
        handleProfileSubmit,
        handlePasswordSubmit,
    } = useSettings();

    const {
        favorites,
        isLoading: favoritesLoading,
        addFavorite,
        removeFavorite
    } = useFavorites();
    
    // Este efecto se asegura de que la sección cambie si el usuario ya está en la página y hace clic en un enlace que lo lleva aquí de nuevo.
    useEffect(() => {
        if (location.state?.openSection) {
            setActiveSection(location.state.openSection);
        }
    }, [location.state]);


    if (isLoading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
                <CircularProgress />
            </Box>
        );
    }

    // Opciones de navegación del menú lateral
    const navigationOptions = [
        {
            id: 'profile',
            title: 'Actualizar Datos',
            icon: <PersonIcon fontSize="large" />,
            color: theme.palette.primary.main
        },
        {
            id: 'password',
            title: 'Cambiar Contraseña',
            icon: <LockIcon fontSize="large" />,
            color: theme.palette.secondary.main
        },
        {
            id: 'favorites',
            title: 'Cuentas Favoritas',
            icon: <StarIcon fontSize="large" />,
            color: theme.palette.warning.main
        }
    ];

    // Función que decide qué componente de formulario mostrar
    const renderContent = () => {
        switch (activeSection) {
            case 'profile':
                return (
                    <ProfileForm
                        profileData={profileData}
                        isSubmitting={isSubmitting}
                        handleProfileChange={handleProfileChange}
                        handleProfileSubmit={handleProfileSubmit}
                    />
                );
            case 'password':
                return (
                    <PasswordForm
                        passwordData={passwordData}
                        isSubmitting={isSubmitting}
                        errors={errors}
                        handlePasswordChange={handlePasswordChange}
                        handlePasswordSubmit={handlePasswordSubmit}
                    />
                );
            case 'favorites':
                return (
                    <>
                        <AddFavoriteForm
                            onAddFavorite={addFavorite}
                            isLoading={favoritesLoading || isSubmitting}
                        />
                        <FavoritesList
                            favorites={favorites}
                            onRemove={removeFavorite}
                        />
                    </>
                );
            default:
                return null;
        }
    };

    return (
        <Container maxWidth="lg" sx={{ py: 5 }}>
            <Box sx={{ mb: 4 }}>
                <SettingsHeader />
            </Box>

            <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 4 }}>
                {/* Menú de Navegación Lateral */}
                <Box sx={{ 
                    width: { xs: '100%', md: '270px' }, 
                    flexShrink: 0, 
                    display: 'flex', 
                    flexDirection: 'column', 
                    gap: 3
                }}>
                    {navigationOptions.map((option) => (
                        <Card 
                            key={option.id} 
                            elevation={activeSection === option.id ? 8 : 2}
                            sx={{ 
                                borderLeft: activeSection === option.id ? `6px solid ${option.color}` : 'none',
                                transition: 'all 0.3s ease'
                            }}
                        >
                            <CardActionArea 
                                onClick={() => setActiveSection(option.id)}
                                sx={{ 
                                    p: 2,
                                    backgroundColor: activeSection === option.id ? `${option.color}15` : 'transparent' 
                                }}
                            >
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                    <Box sx={{ 
                                        color: option.color,
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        p: 1,
                                        borderRadius: '50%',
                                        backgroundColor: `${option.color}15`
                                    }}>
                                        {option.icon}
                                    </Box>
                                    <Typography variant="h6" fontWeight={activeSection === option.id ? 'bold' : 'normal'}>
                                        {option.title}
                                    </Typography>
                                </Box>
                            </CardActionArea>
                        </Card>
                    ))}
                </Box>

                {/* Área de Contenido Principal */}
                <Paper 
                    elevation={3} 
                    sx={{ 
                        p: { xs: 2, md: 4 }, 
                        borderRadius: 2,
                        position: 'relative',
                        flexGrow: 1
                    }}
                >
                    <Box sx={{ 
                        display: 'flex', 
                        alignItems: 'center', 
                        mb: 3,
                        pb: 2,
                        borderBottom: `1px solid ${theme.palette.divider}`
                    }}>
                        <Typography variant="h5" fontWeight="bold">
                            {navigationOptions.find(opt => opt.id === activeSection)?.title}
                        </Typography>
                    </Box>
                    
                    {renderContent()}
                </Paper>
            </Box>
        </Container>
    );
};