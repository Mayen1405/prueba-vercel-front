import React from 'react';
import { Box, Container, Typography, Button } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

const CallToAction = () => {
  return (
    <Box 
      sx={{ 
        bgcolor: '#011B2F', 
        color: 'white', 
        py: 8, 
        textAlign: 'center',
        backgroundImage: 'linear-gradient(to right, #011B2F, #003F66)'
      }}
    >
      <Container maxWidth="md">
        <Typography variant="h3" fontWeight="bold" gutterBottom>
          ¿Listo para empezar?
        </Typography>
        <Typography variant="h6" sx={{ mb: 5, maxWidth: '700px', mx: 'auto' }}>
          Únete a la nueva era de la banca y descubre por qué miles de personas confían en Bank CCI cada día.
        </Typography>
        <Button 
          component={RouterLink}
          to="/auth"
          variant="contained" 
          size="large"
          sx={{
            bgcolor: '#FFD915',
            color: '#011B2F',
            py: 2,
            px: 5,
            fontSize: '1.2rem',
            fontWeight: 'bold',
            '&:hover': { 
              bgcolor: '#FFD358',
              transform: 'scale(1.05)'
            },
            transition: 'all 0.3s',
            boxShadow: '0 4px 15px rgba(255,217,21,0.4)'
          }}
        >
          Únete a nuestro imperio
        </Button>
      </Container>
    </Box>
  );
};

export default CallToAction;