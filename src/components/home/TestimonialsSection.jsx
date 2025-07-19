import React from 'react';
import { Box, Container, Typography } from '@mui/material';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import TestimonialCard from './TestimonialCard';

const TestimonialsSection = ({ testimonials }) => {
  const testimonialSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    arrows: false,
    responsive: [
      {
        breakpoint: 900,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };

  return (
    <Box sx={{ py: 6, bgcolor: '#f9f9f9', position: 'relative' }}>
      <Container maxWidth="lg">
        <Typography 
          variant="h3" 
          align="center" 
          gutterBottom 
          fontWeight="bold"
          sx={{ mb: 6, color: '#002A45' }}
        >
          Lo que dicen nuestros clientes
        </Typography>
        
        <Box sx={{ position: 'relative', px: { xs: 0, md: 5 } }}>
          <Slider {...testimonialSettings}>
            {testimonials.map((testimonial, index) => (
              <TestimonialCard
                key={index}
                imageUrl={testimonial.imageUrl}
                name={testimonial.name}
                since={testimonial.since}
                testimonial={testimonial.quote}
              />
            ))}
          </Slider>
        </Box>
      </Container>
    </Box>
  );
};

export default TestimonialsSection;