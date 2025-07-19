import React from 'react';
import { Box, Typography, Card } from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledProductCard = styled(Card)(({ theme }) => ({
  padding: theme.spacing(3),
  textAlign: 'center',
  borderRadius: '10px',
  boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.08)',
  margin: '0 15px',
  height: '280px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  maxWidth: '300px',
}));

const IconWrapper = styled(Box)({
  backgroundColor: '#003F66',
  width: 70,
  height: 70,
  borderRadius: '50%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  marginBottom: 16
});

const ProductCard = ({ icon, title, description }) => {
  // Renderizado condicional del icono
  const renderIcon = () => {
    if (!icon) return null;
    
    // Si el icono es un elemento JSX, devuélvelo directamente
    if (React.isValidElement(icon)) {
      return icon;
    }
    
    // Si es un componente (función o clase), renderízalo con los props adecuados
    const IconComponent = icon;
    return <IconComponent sx={{ fontSize: 35, color: 'white' }} />;
  };

  return (
    <Box>
      <StyledProductCard>
        <IconWrapper>
          {renderIcon()}
        </IconWrapper>
        <Typography variant="h5" fontWeight="bold" sx={{ mb: 2 }}>
          {title}
        </Typography>
        <Typography variant="body1" sx={{ color: '#555' }}>
          {description}
        </Typography>
      </StyledProductCard>
    </Box>
  );
};

export default ProductCard;