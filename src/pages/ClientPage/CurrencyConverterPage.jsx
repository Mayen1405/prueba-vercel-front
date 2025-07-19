import React from 'react';
import {
  Container,
  Typography,
  Box,
  Breadcrumbs,
  Link
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import { CurrencyConverter } from '../../components/common/CurrencyConverter';

export const CurrencyConverterPage = () => {
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ mb: 3 }}>
        <Breadcrumbs>
          <Link component={RouterLink} to="/client" underline="hover" color="inherit">
            Inicio
          </Link>
          <Typography color="text.primary">Conversión de Divisas</Typography>
        </Breadcrumbs>
      </Box>

      <Box
        sx={{
          borderRadius: 3,
          background: 'linear-gradient(90deg, #063160 0%, #034377 100%)',
          color: 'white',
          p: { xs: 3, sm: 4 },
          mb: 5,
          boxShadow: '0px 2px 12px 0px #01284A30',
          display: 'flex',
          alignItems: 'center'
        }}
      >
        <MonetizationOnIcon sx={{ fontSize: 42, mr: 2 }} />
        <Box>
          <Typography variant="h4" component="h1" sx={{ fontWeight: 'bold', mb: 0.5 }}>
            Conversión de Divisas
          </Typography>
          <Typography variant="body1" sx={{ opacity: 0.9 }}>
            Utilice esta herramienta para convertir entre diferentes monedas y calcular el valor equivalente.
          </Typography>
        </Box>
      </Box>

      {/* El conversor centrado debajo */}
      <Box sx={{ maxWidth: 600, mx: 'auto' }}>
        <CurrencyConverter />
      </Box>
    </Container>
  );
};