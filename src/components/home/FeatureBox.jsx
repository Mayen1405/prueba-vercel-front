import React from 'react';
import { Box, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledFeatureBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'flex-start',
  padding: theme.spacing(3),
  backgroundColor: 'white',
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.shadows[2],
  height: '100%',
  transition: 'transform 0.3s',
  '&:hover': {
    transform: 'translateY(-5px)',
    boxShadow: theme.shadows[6],
  },
}));

const FeatureBox = ({ icon, title, description }) => {
  const renderIcon = () => {
    if (!icon) return null;
    
    if (React.isValidElement(icon)) {
      return icon;
    }
    
    const IconComponent = icon;
    return <IconComponent sx={{ fontSize: 45, color: '#003F66', mr: 2, mt: 0.5 }} />;
  };

  return (
    <StyledFeatureBox>
      {renderIcon()}
      <Box>
        <Typography variant="h5" fontWeight="bold" sx={{ mb: 1, color: '#002A45' }}>
          {title}
        </Typography>
        <Typography variant="body1">
          {description}
        </Typography>
      </Box>
    </StyledFeatureBox>
  );
};

export default FeatureBox;