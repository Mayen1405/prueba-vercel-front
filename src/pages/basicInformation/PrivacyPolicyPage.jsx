import React from 'react';
import { Box, Container, Typography, Grid, Paper } from '@mui/material';

import PolicyIcon from '@mui/icons-material/Policy';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import DnsIcon from '@mui/icons-material/Dns';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import SecurityIcon from '@mui/icons-material/Security';
import GavelIcon from '@mui/icons-material/Gavel';
import AutorenewIcon from '@mui/icons-material/Autorenew';
import CampaignIcon from '@mui/icons-material/Campaign';
import ShareIcon from '@mui/icons-material/Share';
import LockIcon from '@mui/icons-material/Lock';
import ContactMailIcon from '@mui/icons-material/ContactMail';
import PublishedWithChangesIcon from '@mui/icons-material/PublishedWithChanges';

const headerImageUrl = 'https://res.cloudinary.com/dwc4ynoj9/image/upload/v1751089043/politica-de-privacidad-900x600_odav0n.png';

export const PrivacyPolicyPage = () => {
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
            backgroundColor: 'rgba(0, 42, 69, 0.7)', 
            zIndex: 1,
          },
          '> *': {
            position: 'relative',
            zIndex: 2,
          }
        }}
      >
        <Container maxWidth="md">
          <PolicyIcon sx={{ fontSize: 60, mb: 2, color: '#FFD915' }} />
          <Typography variant="h3" component="h1" gutterBottom fontWeight="bold">
            Política de Privacidad de Bank CCI
          </Typography>
          <Typography variant="subtitle1" sx={{ color: 'rgba(255, 255, 255, 0.9)' }}>
            Última actualización: 25 de junio de 2025
          </Typography>
        </Container>
      </Box>

      <Container maxWidth="md" sx={{ py: 8 }}>
        <Paper elevation={2} sx={{ p: { xs: 2, md: 4 } }}>
          <Typography paragraph sx={{ fontSize: '1.1rem', mb: 4 }}>
            Bienvenido a Bank CCI. Su privacidad es de suma importancia para nosotros. Este documento detalla cómo nuestra institución, Bank CCI, S.A. y sus afiliadas ("Bank CCI", "nosotros", "nuestro"), recopila, utiliza, protege y comparte su información personal cuando usted utiliza nuestros servicios.
          </Typography>

          <Box sx={{ my: 4 }}>
            <Typography variant="h5" component="h2" gutterBottom fontWeight="bold">
              1. Información que Recopilamos
            </Typography>
            <Grid container spacing={3} sx={{ mt: 2 }}>
              <Grid item xs={12} sx={{ display: 'flex', alignItems: 'center' }}>
                <AccountCircleIcon sx={{ mr: 2, color: '#003F66' }} />
                <Typography><b>Información de Identificación Personal:</b> Nombre completo, DPI, pasaporte, NIT, fecha de nacimiento, etc.</Typography>
              </Grid>
              <Grid item xs={12} sx={{ display: 'flex', alignItems: 'center' }}>
                <AttachMoneyIcon sx={{ mr: 2, color: '#003F66' }} />
                <Typography><b>Información Financiera:</b> Historial de transacciones, números de cuenta, saldos, historial crediticio, etc.</Typography>
              </Grid>
              <Grid item xs={12} sx={{ display: 'flex', alignItems: 'center' }}>
                <DnsIcon sx={{ mr: 2, color: '#003F66' }} />
                <Typography><b>Información Técnica y de Uso:</b> Dirección IP, tipo de dispositivo, sistema operativo, geolocalización, etc.</Typography>
              </Grid>
            </Grid>
          </Box>

          <Box sx={{ my: 4 }}>
            <Typography variant="h5" component="h2" gutterBottom fontWeight="bold">
              2. Cómo Utilizamos su Información
            </Typography>
            <Grid container spacing={2} sx={{ mt: 2 }}>
              {[
                { icon: <VpnKeyIcon />, title: "Para Proveer y Gestionar sus Servicios:", text: "Procesar transacciones, administrar sus cuentas, y responder a sus solicitudes y consultas." },
                { icon: <SecurityIcon />, title: "Para Fines de Seguridad:", text: "Verificar su identidad, prevenir fraudes, lavado de dinero y proteger la integridad de nuestros sistemas." },
                { icon: <GavelIcon />, title: "Para Cumplimiento Legal y Regulatorio:", text: "Cumplir con las leyes y regulaciones bancarias locales e internacionales." },
                { icon: <AutorenewIcon />, title: "Para Mejorar Nuestros Servicios:", text: "Analizar tendencias de uso para mejorar la experiencia del usuario y desarrollar nuevos productos." },
                { icon: <CampaignIcon />, title: "Para Fines de Marketing:", text: "Con su consentimiento, comunicarle ofertas y promociones. Puede optar por no recibirlas en cualquier momento." },
              ].map((item) => (
                <Grid container item xs={12} key={item.title} spacing={1} sx={{ mb: 1 }}>
                  <Grid item xs={12} sm={4} sx={{ display: 'flex' }}>
                    {React.cloneElement(item.icon, { sx: { mr: 1, color: '#003F66' } })}
                    <Typography fontWeight="bold">{item.title}</Typography>
                  </Grid>
                  <Grid item xs={12} sm={8}>
                    <Typography>{item.text}</Typography>
                  </Grid>
                </Grid>
              ))}
            </Grid>
          </Box>
          
          <Box sx={{ my: 4 }}>
            <Typography variant="h5" component="h2" gutterBottom fontWeight="bold">
              <ShareIcon sx={{ verticalAlign: 'middle', mr: 1, color: '#003F66' }} /> 3. Cómo Compartimos su Información
            </Typography>
            <Typography paragraph>No vendemos ni alquilamos su información. Solo la compartimos con proveedores de servicios bajo confidencialidad, por requerimiento legal o para prevenir daños.</Typography>
          </Box>

          <Box sx={{ my: 4 }}>
            <Typography variant="h5" component="h2" gutterBottom fontWeight="bold">
              <LockIcon sx={{ verticalAlign: 'middle', mr: 1, color: '#003F66' }} /> 4. Seguridad de los Datos
            </Typography>
            <Typography paragraph>Implementamos medidas de seguridad administrativas, técnicas y físicas de última generación para proteger su información contra acceso no autorizado, incluyendo encriptación y firewalls.</Typography>
          </Box>

          <Box sx={{ my: 4 }}>
            <Typography variant="h5" component="h2" gutterBottom fontWeight="bold">
              <PublishedWithChangesIcon sx={{ verticalAlign: 'middle', mr: 1, color: '#003F66' }} /> 5. Cambios a esta Política
            </Typography>
            <Typography paragraph>Nos reservamos el derecho de modificar esta Política. Cualquier cambio será publicado en esta página con una nueva fecha de "última actualización".</Typography>
          </Box>
          
          <Box sx={{ my: 4, p: 2, bgcolor: '#f7f9fc', borderRadius: 1 }}>
            <Typography variant="h5" component="h2" gutterBottom fontWeight="bold">
               <ContactMailIcon sx={{ verticalAlign: 'middle', mr: 1, color: '#003F66' }} /> 6. Contacto
            </Typography>
            <Typography>Si tiene preguntas, contáctenos en: <b>privacidad@bankcci.com.gt</b></Typography>
            <Typography><b>Dirección:</b> Av. Reforma 1-23, Zona 10, Edificio CCI, Nivel 15, Ciudad de Guatemala.</Typography>
          </Box>

        </Paper>
      </Container>
    </Box>
  );
};