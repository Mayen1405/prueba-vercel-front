import React from 'react';
import { Box, Container, Typography, Grid, Paper, Avatar } from '@mui/material';

import GroupsIcon from '@mui/icons-material/Groups';
import TrackChangesIcon from '@mui/icons-material/TrackChanges';
import VisibilityIcon from '@mui/icons-material/Visibility';
import HandshakeIcon from '@mui/icons-material/Handshake';
import LightbulbIcon from '@mui/icons-material/Lightbulb';
import PeopleIcon from '@mui/icons-material/People';

const headerImageUrl = 'https://res.cloudinary.com/dwc4ynoj9/image/upload/v1751089594/hands_lzpli8.jpg';

const teamMembers = [
  { 
    name: 'Ricardo Morales', 
    role: 'Director Ejecutivo (CEO)', 
    avatarUrl: 'https://res.cloudinary.com/dwc4ynoj9/image/upload/v1725373821/samples/man-portrait.jpg' 
  },
  { 
    name: 'Ana Sofía Paredes', 
    role: 'Directora de Operaciones (COO)', 
    avatarUrl: 'https://res.cloudinary.com/dwc4ynoj9/image/upload/v1725373822/samples/upscale-face-1.jpg' 
  },
  { 
    name: 'Carlos Valenzuela', 
    role: 'Director de Tecnología (CTO)', 
    avatarUrl: 'https://res.cloudinary.com/dwc4ynoj9/image/upload/v1725373813/samples/people/smiling-man.jpg' 
  },
];

export const AboutUsPage = () => {
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
            backgroundColor: 'rgba(0, 42, 69, 0.6)',
            zIndex: 1,
          },
          '> *': {
            position: 'relative',
            zIndex: 2,
          }
        }}
      >
        <Container maxWidth="md">
          <GroupsIcon sx={{ fontSize: 60, mb: 2, color: '#FFD915' }} />
          <Typography component="h1" variant="h2" fontWeight="bold" gutterBottom>
            Construyendo el Futuro de la Banca
          </Typography>
          <Typography variant="h5" sx={{ mt: 2, color: 'rgba(255, 255, 255, 0.9)' }}>
            Somos Bank CCI, una institución financiera nacida de la innovación y comprometida con tu desarrollo.
          </Typography>
        </Container>
      </Box>

      <Container sx={{ py: 8 }} maxWidth="lg">
        <Grid container spacing={6} alignItems="center">
          <Grid item xs={12} md={6}>
            <Box sx={{ textAlign: 'center' }}>
              <TrackChangesIcon sx={{ fontSize: 50, color: '#003F66', mb: 2 }} />
              <Typography variant="h4" fontWeight="bold" gutterBottom>
                Nuestra Misión
              </Typography>
            </Box>
            <Typography variant="body1" sx={{ fontSize: '1.1rem', textAlign: 'justify' }}>
              Facilitar el progreso financiero de cada guatemalteco a través de servicios bancarios accesibles, seguros y fáciles de usar, eliminando barreras tradicionales con herramientas digitales que empoderan.
            </Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box sx={{ textAlign: 'center' }}>
              <VisibilityIcon sx={{ fontSize: 50, color: '#003F66', mb: 2 }} />
              <Typography variant="h4" fontWeight="bold" gutterBottom>
                Nuestra Visión
              </Typography>
            </Box>
            <Typography variant="body1" sx={{ fontSize: '1.1rem', textAlign: 'justify' }}>
              Ser el banco digital líder en la región, reconocido por nuestra innovación constante, seguridad de clase mundial y por poner genuinamente los intereses de nuestros clientes en el centro de cada decisión.
            </Typography>
          </Grid>
        </Grid>
      </Container>
      
      <Box sx={{ bgcolor: '#f7f9fc', py: 8 }}>
        <Container maxWidth="lg">
          <Typography variant="h4" align="center" gutterBottom fontWeight="bold">
            Nuestros Valores Fundamentales
          </Typography>
          <Grid container spacing={4} sx={{ mt: 4 }} justifyContent="center">
            {[
              { icon: <HandshakeIcon sx={{ fontSize: 50, color: '#FFD915' }} />, title: 'Integridad', text: 'Actuamos con honestidad y transparencia. La confianza de nuestros clientes es nuestro activo más valioso.' },
              { icon: <LightbulbIcon sx={{ fontSize: 50, color: '#FFD915' }} />, title: 'Innovación', text: 'Desafiamos constantemente el status quo para crear soluciones más simples, rápidas y eficientes para ti.' },
              { icon: <PeopleIcon sx={{ fontSize: 50, color: '#FFD915' }} />, title: 'Enfoque en el Cliente', text: 'Escuchamos, entendemos y nos anticipamos a tus necesidades para superar siempre tus expectativas.' }
            ].map(value => (
              <Grid item xs={12} md={4} key={value.title}>
                <Paper elevation={3} sx={{ p: 4, textAlign: 'center', bgcolor: '#011B2F', color: 'white', height: '100%' }}>
                  {value.icon}
                  <Typography variant="h6" fontWeight="bold" sx={{ mt: 2 }}>{value.title}</Typography>
                  <Typography sx={{ mt: 1 }}>{value.text}</Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>
      
      <Container sx={{ py: 8 }} maxWidth="lg">
        <Typography variant="h4" align="center" gutterBottom fontWeight="bold">
          Conoce a Nuestro Equipo Directivo
        </Typography>
        <Grid container spacing={4} justifyContent="center" sx={{ mt: 4 }}>
          {teamMembers.map((member) => (
            <Grid item xs={12} sm={6} md={4} key={member.name}>
              <Paper elevation={2} sx={{ textAlign: 'center', p: 3, borderRadius: '16px' }}>
                <Avatar 
                  src={member.avatarUrl} // <-- Aquí usamos la URL individual
                  alt={member.name}
                  sx={{ width: 120, height: 120, margin: '0 auto', mb: 2 }}
                />
                <Typography variant="h6" fontWeight="bold">{member.name}</Typography>
                <Typography color="text.secondary">{member.role}</Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};