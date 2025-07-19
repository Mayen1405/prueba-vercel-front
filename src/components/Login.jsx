import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  Container
} from "@mui/material";
import {
  validatePassword,
  validatePasswordMessage,
} from "../shared/validators";
import { useLogin } from "../shared/hooks/useLogin";

export const Login = () => {
  const { login, isLoading } = useLogin();

  const [formState, setFormState] = useState({
    emailOrUsername: {
      value: "",
      isValid: false,
      showError: false,
    },
    password: {
      value: "",
      isValid: false,
      showError: false,
    },
  });

  const handleInputValueChange = (value, field) => {
    setFormState((prevState) => ({
      ...prevState,
      [field]: {
        ...prevState[field],
        value,
      },
    }));
  };

  const handleInputValidationOnBlur = (value, field) => {
    let isValid = false;
    switch (field) {
      case "emailOrUsername":
        isValid = value.trim().length > 0;
        break;
      case "password":
        isValid = validatePassword(value);
        break;
      default:
        break;
    }
    setFormState((prevState) => ({
      ...prevState,
      [field]: {
        ...prevState[field],
        isValid,
        showError: !isValid,
      },
    }));
  };

  const handleLogin = (event) => {
    event.preventDefault();
    login(formState.emailOrUsername.value, formState.password.value);
  };

  const isSubmitDisabled =
    isLoading || !formState.emailOrUsername.isValid || !formState.password.isValid;

  return (
    <Container maxWidth="sm" sx={{ mt: 8 }}>
      <Paper elevation={3} sx={{ 
        p: 4, 
        borderRadius: 1,
        boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
      }}>
        <Box sx={{ 
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'center',
          mb: 4
        }}>
          <Box 
            component="img"
            src="https://res.cloudinary.com/dwc4ynoj9/image/upload/v1751093545/banck_CCI_sinfondo-removebg_gdhpkm.png"
            alt="Bank CCI Logo"
            sx={{ height: 60, mb: 2 }}
          />
          <Typography variant="h5" component="h1" fontWeight="500">
            Iniciar sesión
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            Bienvenido, por favor inicia sesión para continuar
          </Typography>
        </Box>

        <Box component="form" onSubmit={handleLogin}>
          <TextField
            fullWidth
            margin="normal"
            label="Email o nombre de usuario"
            name="emailOrUsername"
            type="text"
            value={formState.emailOrUsername.value}
            onChange={(e) => handleInputValueChange(e.target.value, "emailOrUsername")}
            onBlur={(e) => handleInputValidationOnBlur(e.target.value, "emailOrUsername")}
            error={formState.emailOrUsername.showError}
            helperText={formState.emailOrUsername.showError ? "Este campo es obligatorio" : ""}
            sx={{ mb: 2 }}
          />
          
          <TextField
            fullWidth
            margin="normal"
            label="Contraseña"
            name="password"
            type="password"
            value={formState.password.value}
            onChange={(e) => handleInputValueChange(e.target.value, "password")}
            onBlur={(e) => handleInputValidationOnBlur(e.target.value, "password")}
            error={formState.password.showError}
            helperText={formState.password.showError ? validatePasswordMessage : ""}
            sx={{ mb: 3 }}
          />
          
          <Button
            type="submit"
            fullWidth
            variant="contained"
            disabled={isSubmitDisabled}
            sx={{
              py: 1.5,
              textTransform: 'none',
              fontWeight: 500,
              fontSize: '0.9rem'
            }}
          >
            {isLoading ? "Cargando..." : "Iniciar sesión"}
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};