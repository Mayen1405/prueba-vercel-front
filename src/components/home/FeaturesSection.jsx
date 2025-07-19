import React from 'react';
import { Box, Container, Typography } from '@mui/material';
import SecurityIcon from '@mui/icons-material/Security';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import SmartphoneIcon from '@mui/icons-material/Smartphone';
import FeatureBox from './FeatureBox';

const FeaturesSection = () => {
  const features = [
    {
      icon: SecurityIcon,
      title: "Seguridad de Vanguardia",
      description: "Protegemos tus datos y tu dinero con la tecnología de encriptación más avanzada del mercado."
    },
    {
      icon: SupportAgentIcon,
      title: "Atención 24/7",
      description: "Nuestro equipo de especialistas está disponible todos los días del año para asistirte."
    },
    {
      icon: SmartphoneIcon,
      title: "App Móvil Intuitiva",
      description: "Gestiona tus finanzas desde cualquier lugar con nuestra aplicación premiada."
    }
  ];

  return (
    <Box sx={{ py: 6 }}>
      <Container maxWidth="lg">
        <Typography 
          variant="h3" 
          align="center" 
          gutterBottom 
          fontWeight="bold"
          sx={{ mb: 4, color: '#002A45' }}
        >
          ¿Por qué elegir Bank CCI?
        </Typography>
        
        <Box sx={{ mt: 4, display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between' }}>
          {features.map((feature, index) => (
            <Box key={index} sx={{ width: { xs: '100%', md: '31%' }, mb: { xs: 3, md: 0 } }}>
              <FeatureBox
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
              />
            </Box>
          ))}
        </Box>
      </Container>
    </Box>
  );
};

export default FeaturesSection;