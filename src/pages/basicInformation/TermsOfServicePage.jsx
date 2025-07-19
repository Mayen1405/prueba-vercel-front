import React from 'react';
import { Box, Container, Typography, Grid, Paper } from '@mui/material';

import GavelIcon from '@mui/icons-material/Gavel'; 
import DescriptionIcon from '@mui/icons-material/Description'; 
import SecurityIcon from '@mui/icons-material/Security'; 
import BlockIcon from '@mui/icons-material/Block'; 
import CopyrightIcon from '@mui/icons-material/Copyright'; 
import ReportProblemIcon from '@mui/icons-material/ReportProblem'; 
import AccountBalanceIcon from '@mui/icons-material/AccountBalance'; 
import ContactMailIcon from '@mui/icons-material/ContactMail'; 

const headerImageUrl = 'https://res.cloudinary.com/dwc4ynoj9/image/upload/v1751089225/terminosycondiciones_ku1ia3.jpg';

export const TermsOfServicePage = () => {
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
            backgroundColor: 'rgba(0, 42, 69, 0.75)', 
            zIndex: 1,
          },
          '> *': {
            position: 'relative',
            zIndex: 2,
          }
        }}
      >
        <Container maxWidth="md">
          <GavelIcon sx={{ fontSize: 60, mb: 2, color: '#FFD915' }} />
          <Typography variant="h3" component="h1" gutterBottom fontWeight="bold">
            Términos y Condiciones de Uso
          </Typography>
          <Typography variant="subtitle1" sx={{ color: 'rgba(255, 255, 255, 0.9)' }}>
            Última actualización: 25 de junio de 2025
          </Typography>
        </Container>
      </Box>

      <Container maxWidth="md" sx={{ py: 8 }}>
        <Paper elevation={2} sx={{ p: { xs: 2, md: 4 } }}>
          <Typography paragraph sx={{ fontSize: '1.1rem', mb: 4 }}>
            Estos Términos y Condiciones rigen el acceso y la utilización de todos los productos y servicios ofrecidos por Bank CCI. Al utilizar nuestros Servicios, usted confirma que ha leído, entendido y aceptado estar legalmente vinculado por estos Términos.
          </Typography>

          <Box sx={{ my: 4 }}>
            <Typography variant="h5" component="h2" gutterBottom fontWeight="bold">
              <DescriptionIcon sx={{ verticalAlign: 'middle', mr: 1, color: '#003F66' }} /> 1. Descripción de los Servicios
            </Typography>
            <Typography paragraph>
              Bank CCI ofrece una plataforma de banca digital que permite a los usuarios gestionar sus finanzas. Nos reservamos el derecho de modificar o suspender cualquier aspecto de los Servicios en cualquier momento.
            </Typography>
          </Box>

          <Box sx={{ my: 4 }}>
            <Typography variant="h5" component="h2" gutterBottom fontWeight="bold">
              <SecurityIcon sx={{ verticalAlign: 'middle', mr: 1, color: '#003F66' }} /> 2. Cuentas de Usuario y Seguridad
            </Typography>
            <Typography sx={{ mt: 2 }}><b>Elegibilidad:</b> Debe ser mayor de edad en Guatemala y cumplir con nuestros requisitos de verificación.</Typography>
            <Typography sx={{ mt: 2 }}><b>Responsabilidad de la Cuenta:</b> Usted es responsable de mantener la confidencialidad de sus credenciales y de toda actividad en su cuenta.</Typography>
            <Typography sx={{ mt: 2 }}><b>Información Precisa:</b> Se compromete a proporcionar información veraz y a mantenerla actualizada.</Typography>
          </Box>
          
          <Box sx={{ my: 4 }}>
            <Typography variant="h5" component="h2" gutterBottom fontWeight="bold">
              <BlockIcon sx={{ verticalAlign: 'middle', mr: 1, color: '#003F66' }} /> 3. Uso Aceptable y Conducta Prohibida
            </Typography>
            <Typography paragraph sx={{ mt: 2 }}>
              Usted se compromete a utilizar los Servicios solo para fines lícitos. Queda prohibido usar los servicios para actividades fraudulentas, intentar obtener acceso no autorizado o introducir material malicioso.
            </Typography>
          </Box>
          
          <Box sx={{ my: 4 }}>
            <Typography variant="h5" component="h2" gutterBottom fontWeight="bold">
              <CopyrightIcon sx={{ verticalAlign: 'middle', mr: 1, color: '#003F66' }} /> 4. Propiedad Intelectual
            </Typography>
            <Typography paragraph>
              Todo el contenido, logos, software y material de la plataforma son propiedad exclusiva de Bank CCI y están protegidos por las leyes de propiedad intelectual.
            </Typography>
          </Box>

           <Box sx={{ my: 4 }}>
            <Typography variant="h5" component="h2" gutterBottom fontWeight="bold">
              <ReportProblemIcon sx={{ verticalAlign: 'middle', mr: 1, color: '#003F66' }} /> 5. Limitación de Responsabilidad
            </Typography>
            <Typography paragraph>
              Bank CCI no será responsable por daños indirectos, incidentales o consecuentes que resulten del uso o la imposibilidad de uso de los Servicios.
            </Typography>
          </Box>

          <Box sx={{ my: 4 }}>
            <Typography variant="h5" component="h2" gutterBottom fontWeight="bold">
              <AccountBalanceIcon sx={{ verticalAlign: 'middle', mr: 1, color: '#003F66' }} /> 6. Legislación Aplicable
            </Typography>
            <Typography paragraph>
              Estos Términos se rigen por las leyes de la República de Guatemala. Cualquier disputa será sometida a los tribunales de la Ciudad de Guatemala.
            </Typography>
          </Box>
          
          <Box sx={{ my: 4, p: 2, bgcolor: '#f7f9fc', borderRadius: 1 }}>
            <Typography variant="h5" component="h2" gutterBottom fontWeight="bold">
              <ContactMailIcon sx={{ verticalAlign: 'middle', mr: 1, color: '#003F66' }} /> 7. Contacto
            </Typography>
            <Typography paragraph>
              Para cualquier pregunta sobre estos Términos, contáctenos en: <br />
              <b>Correo Electrónico:</b> legal@bankcci.com.gt
            </Typography>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};