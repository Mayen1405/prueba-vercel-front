import React, { useState } from 'react';
import { 
  Box, Container, Typography, Grid, TextField, Button, Paper,
  Dialog, DialogTitle, DialogContent, DialogActions, CircularProgress,
  Alert, Snackbar
} from '@mui/material';

import SupportAgentIcon from '@mui/icons-material/SupportAgent'; 
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import SendIcon from '@mui/icons-material/Send';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

const headerImageUrl = 'https://res.cloudinary.com/dwc4ynoj9/image/upload/v1751089409/habilidades-call-center_e9bs3t.jpg';

export const ContactPage = () => {
  // Estado para los campos del formulario
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    subject: '',
    message: ''
  });

  // Estado para los errores de validación
  const [errors, setErrors] = useState({
    fullName: false,
    email: false,
    subject: false,
    message: false
  });

  // Estado para el envío del formulario
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState('');
  
  // Estado para el diálogo de agradecimiento
  const [thankYouOpen, setThankYouOpen] = useState(false);

  // Manejar cambios en los campos
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    
    // Limpiar error si el usuario comienza a escribir
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: false
      });
    }
  };

  // Validar el formulario
  const validateForm = () => {
    const newErrors = {
      fullName: !formData.fullName.trim(),
      email: !formData.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email),
      subject: !formData.subject.trim(),
      message: !formData.message.trim()
    };

    setErrors(newErrors);
    return !Object.values(newErrors).some(Boolean);
  };

  // Manejar envío del formulario
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validar el formulario
    if (!validateForm()) {
      return;
    }

    // Simular envío del formulario
    setIsSubmitting(true);
    setSubmitError('');
    
    // Simulación de una petición API
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitSuccess(true);
      setThankYouOpen(true);
      
      // Resetear el formulario
      setFormData({
        fullName: '',
        email: '',
        subject: '',
        message: ''
      });
    }, 1500);
  };

  // Cerrar diálogo de agradecimiento
  const handleCloseThankYou = () => {
    setThankYouOpen(false);
  };

  // Cerrar notificación de éxito
  const handleCloseSuccess = () => {
    setSubmitSuccess(false);
  };

  return (
    <Box>
      <Box 
        sx={{ 
          color: 'white', 
          py: 8, 
          textAlign: 'center',
          position: 'relative',
          backgroundImage: `url(${headerImageUrl})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 42, 69, 0.65)', 
            zIndex: 1,
          },
          '> *': {
            position: 'relative',
            zIndex: 2,
          }
        }}
      >
        <Container maxWidth="md">
          <SupportAgentIcon sx={{ fontSize: 60, mb: 2, color: '#FFD915' }} />
          <Typography component="h1" variant="h2" fontWeight="bold">
            Contáctanos
          </Typography>
          <Typography variant="h5" sx={{ mt: 2, color: 'rgba(255, 255, 255, 0.9)' }}>
            Estamos aquí para ayudarte. Resuelve tus dudas o envíanos tus comentarios.
          </Typography>
        </Container>
      </Box>

      <Container sx={{ py: 8 }} maxWidth="lg">
        <Grid container spacing={5} alignItems="flex-start">
          
          <Grid item xs={12} md={7}>
            <Paper elevation={3} sx={{ p: { xs: 2, md: 4 } }}>
              <Typography variant="h5" fontWeight="bold" gutterBottom>
                Envíanos un Mensaje
              </Typography>
              <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 3 }}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      autoComplete="name"
                      name="fullName"
                      required
                      fullWidth
                      id="fullName"
                      label="Nombre Completo"
                      autoFocus
                      value={formData.fullName}
                      onChange={handleInputChange}
                      error={errors.fullName}
                      helperText={errors.fullName ? "El nombre es obligatorio" : ""}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      id="email"
                      label="Correo Electrónico"
                      name="email"
                      autoComplete="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      error={errors.email}
                      helperText={errors.email ? "Introduce un correo electrónico válido" : ""}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      id="subject"
                      label="Asunto"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      error={errors.subject}
                      helperText={errors.subject ? "El asunto es obligatorio" : ""}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      name="message"
                      label="Tu Mensaje"
                      id="message"
                      multiline
                      rows={6}
                      value={formData.message}
                      onChange={handleInputChange}
                      error={errors.message}
                      helperText={errors.message ? "El mensaje es obligatorio" : ""}
                    />
                  </Grid>
                </Grid>
                
                {submitError && (
                  <Alert severity="error" sx={{ mt: 2 }}>
                    {submitError}
                  </Alert>
                )}
                
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  endIcon={isSubmitting ? <CircularProgress size={20} color="inherit" /> : <SendIcon />}
                  disabled={isSubmitting}
                  sx={{
                    mt: 3,
                    mb: 2,
                    py: 1.5,
                    bgcolor: '#FFD915',
                    color: '#011B2F',
                    '&:hover': { bgcolor: '#FFD358' }
                  }}
                >
                  {isSubmitting ? 'Enviando...' : 'Enviar Mensaje'}
                </Button>
              </Box>
            </Paper>
          </Grid>

          <Grid item xs={12} md={5}>
            <Box sx={{ p: { xs: 0, md: 2 }, mt: { xs: 4, md: 0 } }}>
              <Typography variant="h5" fontWeight="bold" gutterBottom>
                Nuestros Canales
              </Typography>
              <Typography variant="body1" sx={{ mb: 4 }}>
                También puedes comunicarte con nosotros directamente:
              </Typography>

              <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                <PhoneIcon sx={{ mr: 2, color: '#003F66', fontSize: 30 }} />
                <Box>
                  <Typography fontWeight="bold">Línea de Atención</Typography>
                  <Typography>+502 2233-4455</Typography>
                </Box>
              </Box>

              <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                <EmailIcon sx={{ mr: 2, color: '#003F66', fontSize: 30 }} />
                <Box>
                  <Typography fontWeight="bold">Correo Electrónico</Typography>
                  <Typography>atencion@bankcci.com.gt</Typography>
                </Box>
              </Box>

              <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                <LocationOnIcon sx={{ mr: 2, color: '#003F66', fontSize: 30 }} />
                <Box>
                  <Typography fontWeight="bold">Oficina Central</Typography>
                  <Typography>Av. Reforma 1-23, Zona 10, Edificio CCI, Nivel 15, Ciudad de Guatemala</Typography>
                </Box>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Container>

      {/* Diálogo de agradecimiento */}
      <Dialog 
        open={thankYouOpen} 
        onClose={handleCloseThankYou}
        PaperProps={{ 
          sx: { 
            borderRadius: 2,
            maxWidth: 450
          } 
        }}
      >
        <DialogTitle sx={{ pb: 1, textAlign: 'center' }}>
          <CheckCircleOutlineIcon 
            color="success" 
            sx={{ 
              fontSize: 80,
              mb: 2
            }} 
          />
          <Typography variant="h5" fontWeight="bold">
            ¡Gracias por contactarnos!
          </Typography>
        </DialogTitle>
        <DialogContent>
          <Typography align="center" sx={{ mb: 2 }}>
            Hemos recibido tu mensaje y nos pondremos en contacto contigo a la brevedad posible.
          </Typography>
          <Typography align="center" variant="body2" color="text.secondary">
            Referencia: {Math.floor(Math.random() * 1000000).toString().padStart(6, '0')}
          </Typography>
        </DialogContent>
        <DialogActions sx={{ pb: 3, px: 3, justifyContent: 'center' }}>
          <Button 
            onClick={handleCloseThankYou} 
            variant="contained"
            sx={{
              bgcolor: '#FFD915',
              color: '#011B2F',
              '&:hover': { bgcolor: '#FFD358' },
              minWidth: 120
            }}
          >
            Aceptar
          </Button>
        </DialogActions>
      </Dialog>

      {/* Notificación de éxito */}
      <Snackbar 
        open={submitSuccess && !thankYouOpen} 
        autoHideDuration={6000} 
        onClose={handleCloseSuccess}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert 
          onClose={handleCloseSuccess} 
          severity="success" 
          variant="filled"
          sx={{ width: '100%' }}
        >
          Mensaje enviado con éxito
        </Alert>
      </Snackbar>
    </Box>
  );
};