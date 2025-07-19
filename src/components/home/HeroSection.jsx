import React from 'react';
import { Box, Container, Typography, Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Link as RouterLink } from 'react-router-dom';

const VideoBackground = styled(Box)({
  position: 'relative',
  overflow: 'hidden',
  height: 'calc(100vh - 70px)', 
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 42, 69, 0.7)',
    zIndex: 1,
  },
});

const VideoElement = styled('video')({
  position: 'absolute',
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  zIndex: 0,
});

const HeroContent = styled(Box)({
  position: 'relative',
  zIndex: 2,
  textAlign: 'center',
  padding: '0 20px',
});

const HeroSection = ({ videoUrl }) => {
  return (
    <VideoBackground>
      <VideoElement autoPlay muted loop>
        <source src={videoUrl} type="video/mp4" />
        Tu navegador no soporta videos HTML5.
      </VideoElement>
      <HeroContent>
        <Container maxWidth="md">
          <Typography 
            component="h1" 
            variant="h2" 
            fontWeight="bold" 
            gutterBottom 
            sx={{ color: 'white', textShadow: '2px 2px 4px rgba(0,0,0,0.5)' }}
          >
            La banca digital que se adapta a ti
          </Typography>
          <Typography 
            variant="h5" 
            sx={{ 
              mb: 5, 
              color: '#FFD358',
              textShadow: '1px 1px 3px rgba(0,0,0,0.5)',
              maxWidth: '800px',
              mx: 'auto'
            }}
          >
            Abre una cuenta en minutos y maneja tus finanzas sin complicaciones,
            con la tecnología más avanzada y segura del mercado.
          </Typography>
          <Button 
            component={RouterLink}
            to="/auth"
            variant="contained" 
            size="large"
            sx={{
              bgcolor: '#FFD915',
              color: '#011B2F',
              py: 1.5,
              px: 4,
              fontSize: '1.1rem',
              fontWeight: 'bold',
              '&:hover': { 
                bgcolor: '#FFD358',
                transform: 'scale(1.05)'
              },
              transition: 'all 0.3s',
              boxShadow: '0 4px 10px rgba(0,0,0,0.25)'
            }}
          >
            Únete a nuestro imperio
          </Button>
        </Container>
      </HeroContent>
    </VideoBackground>
  );
};

export default HeroSection;