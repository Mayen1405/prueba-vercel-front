import React, { useRef } from 'react';
import { Box, Container, Typography, IconButton } from '@mui/material';
import { styled } from '@mui/material/styles';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import SecurityIcon from '@mui/icons-material/Security';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

import ProductCard from './ProductCard';

const SliderArrow = styled(IconButton)(({ theme }) => ({
  position: 'absolute',
  zIndex: 2,
  top: '50%',
  transform: 'translateY(-50%)',
  backgroundColor: theme.palette.background.paper,
  opacity: 0.9,
  '&:hover': {
    backgroundColor: theme.palette.background.paper,
    opacity: 1,
  },
}));

const ProductsSection = () => {
  const sliderRef = useRef();
  
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };

  const products = [
    {
      icon: AccountBalanceWalletIcon,
      title: "Cuentas de Ahorro",
      description: "Intereses competitivos, cero comisiones ocultas y acceso inmediato a tu dinero."
    },
    {
      icon: CreditCardIcon,
      title: "Tarjetas de Crédito",
      description: "Beneficios exclusivos, aceptación mundial y programas de recompensas."
    },
    {
      icon: TrendingUpIcon,
      title: "Inversiones",
      description: "Haz crecer tu patrimonio con planes de inversión personalizados."
    },
    {
      icon: SecurityIcon,
      title: "Seguros",
      description: "Protección completa para ti y tu familia con coberturas flexibles."
    }
  ];

  return (
    <Box sx={{ py: 6, bgcolor: '#f9f9f9', position: 'relative' }}>
      <Container maxWidth="lg" sx={{ textAlign: 'center' }}>
        <Typography 
          variant="h3" 
          align="center" 
          gutterBottom 
          fontWeight="bold"
          sx={{ mb: 6, color: '#002A45' }}
        >
          Nuestros Productos
        </Typography>
        
        <Box sx={{ position: 'relative', px: { xs: 0, md: 6 } }}>
          <SliderArrow
            onClick={() => sliderRef.current.slickPrev()}
            sx={{ left: { xs: '-5px', md: '-25px' } }}
          >
            <ArrowBackIosNewIcon fontSize="small" />
          </SliderArrow>
          
          <Slider ref={sliderRef} {...sliderSettings}>
            {products.map((product, index) => (
              <ProductCard 
                key={index}
                icon={product.icon}
                title={product.title}
                description={product.description}
              />
            ))}
          </Slider>
          
          <SliderArrow
            onClick={() => sliderRef.current.slickNext()}
            sx={{ right: { xs: '-5px', md: '-25px' } }}
          >
            <ArrowForwardIosIcon fontSize="small" />
          </SliderArrow>
        </Box>
      </Container>
    </Box>
  );
};

export default ProductsSection;