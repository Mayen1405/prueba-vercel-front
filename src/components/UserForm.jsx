import React, { useState } from 'react';
import {
    Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField,
    Grid, CircularProgress, Box, Alert, InputAdornment, IconButton
} from '@mui/material';
import { useUserForm } from '../shared/hooks/useUserForm';
import { PasswordStrengthValidator } from './PasswordStrengthValidator';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

export const UserForm = ({ open, onClose, user }) => {
    const { 
        formData, 
        isLoading, 
        isEditing, 
        errors, 
        serverErrorMessage, 
        handleChange, 
        handleSubmit,
        validatePassword 
    } = useUserForm(user, onClose);
    
    const [showPassword, setShowPassword] = useState(false);
    const handleClickShowPassword = () => setShowPassword(!showPassword);
    const handleMouseDownPassword = (event) => event.preventDefault();

    return (
        <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
            <DialogTitle>{isEditing ? 'Editar Usuario' : 'Añadir Nuevo Cliente'}</DialogTitle>
            <Box component="form" onSubmit={handleSubmit}>
                <DialogContent>
                    {serverErrorMessage && (
                        <Alert severity="error" sx={{ mb: 2 }}>
                            {serverErrorMessage}
                        </Alert>
                    )}
                    
                    {Object.keys(errors).length > 0 && (
                        <Alert severity="warning" sx={{ mb: 2 }}>
                            Por favor, corrige los errores en el formulario.
                        </Alert>
                    )}
                    
                    <Grid container spacing={2} sx={{ pt: 1 }}>
                        <Grid item xs={12} sm={6}>
                            <TextField 
                                fullWidth 
                                label="Nombre de usuario" 
                                name="username" 
                                value={formData.username} 
                                onChange={handleChange} 
                                required 
                                error={!!errors.username} 
                                helperText={errors.username} 
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField 
                                fullWidth 
                                label="Nombre Completo" 
                                name="name" 
                                value={formData.name} 
                                onChange={handleChange} 
                                required 
                                error={!!errors.name} 
                                helperText={errors.name} 
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField 
                                fullWidth 
                                label="Correo electrónico" 
                                name="email" 
                                type="email" 
                                value={formData.email} 
                                onChange={handleChange} 
                                required 
                                disabled={isEditing} 
                                error={!!errors.email} 
                                helperText={errors.email} 
                            />
                        </Grid>
                        {!isEditing && (
                        <Grid item xs={12}>
                            <TextField 
                            fullWidth 
                            label="Contraseña" 
                            name="password" 
                            type={showPassword ? "text" : "password"} 
                            value={formData.password} 
                            onChange={handleChange} 
                            required 
                            error={!!errors.password} 
                            helperText={errors.password}
                            InputProps={{
                                endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton
                                    onClick={handleClickShowPassword}
                                    onMouseDown={handleMouseDownPassword}
                                    edge="end"
                                    sx={{ 
                                        color: 'text.secondary',
                                        '&:hover': {
                                        color: 'primary.main',
                                        }
                                    }}
                                    >
                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                                ),
                                sx: {
                                pr: 1,
                                transition: 'all 0.2s',
                                '&.Mui-focused': {
                                    boxShadow: '0 0 0 2px rgba(0,127,255,0.2)',
                                }
                                }
                            }}
                            sx={{
                                '& label.Mui-focused': {
                                color: validatePassword(formData.password) ? 'success.main' : 'primary.main',
                                },
                                '& .MuiOutlinedInput-root': {
                                '&.Mui-focused fieldset': {
                                    borderColor: validatePassword(formData.password) ? 'success.main' : 'primary.main',
                                    borderWidth: '2px',
                                }
                                }
                            }}
                            />
                            {/* Componente validador de contraseña */}
                            <PasswordStrengthValidator password={formData.password} />
                        </Grid>
                        )}                
                        <Grid item xs={12} sm={6}>
                            <TextField 
                                fullWidth 
                                label="DPI" 
                                name="dpi" 
                                value={formData.dpi} 
                                onChange={handleChange} 
                                required 
                                disabled={isEditing} 
                                error={!!errors.dpi} 
                                helperText={errors.dpi || "Debe tener exactamente 13 dígitos"} 
                                inputProps={{ maxLength: 13 }}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField 
                                fullWidth 
                                label="Teléfono" 
                                name="phone" 
                                value={formData.phone} 
                                onChange={handleChange} 
                                required 
                                error={!!errors.phone} 
                                helperText={errors.phone} 
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField 
                                fullWidth 
                                label="Dirección" 
                                name="address" 
                                value={formData.address} 
                                onChange={handleChange} 
                                required 
                                error={!!errors.address} 
                                helperText={errors.address} 
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField 
                                fullWidth 
                                label="Lugar de trabajo" 
                                name="workName" 
                                value={formData.workName} 
                                onChange={handleChange} 
                                required 
                                error={!!errors.workName} 
                                helperText={errors.workName} 
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField 
                                fullWidth 
                                label="Ingresos Mensuales" 
                                name="monthlyIncome" 
                                type="number" 
                                value={formData.monthlyIncome} 
                                onChange={handleChange} 
                                required 
                                error={!!errors.monthlyIncome} 
                                helperText={errors.monthlyIncome} 
                                InputProps={{ inputProps: { min: 1 } }}
                            />
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions sx={{ p: '16px 24px' }}>
                    <Button onClick={onClose}>Cancelar</Button>
                    <Button 
                        type="submit" 
                        variant="contained" 
                        disabled={isLoading || (!isEditing && !validatePassword(formData.password))}
                    >
                        {isLoading ? <CircularProgress size={24} /> : (isEditing ? 'Guardar Cambios' : 'Crear Cliente')}
                    </Button>
                </DialogActions>
            </Box>
        </Dialog>
    );
};