import React from 'react';
import { Box } from '@mui/material';
import {
  HeroSection,
  ProductsSection,
  FeaturesSection,
  TestimonialsSection,
  CallToAction
} from '../../components/home';

const videoUrl = 'https://res.cloudinary.com/dwc4ynoj9/video/upload/v1751090690/Video_Para_CCI_Homepage_fmiwag.mp4';
const lauraImageUrl = 'https://res.cloudinary.com/dwc4ynoj9/image/upload/v1725373822/samples/woman-on-a-football-field.jpg';
const marcoImageUrl = 'https://res.cloudinary.com/dwc4ynoj9/image/upload/v1725373812/samples/people/kitchen-bar.jpg';
const carlosImageUrl = 'https://res.cloudinary.com/dwc4ynoj9/image/upload/v1725373821/samples/man-portrait.jpg';

export const HomePage = () => {
  const testimonials = [
    {
      imageUrl: lauraImageUrl,
      name: "Laura Campos",
      since: "2023",
      quote: "Abrir mi cuenta fue increíblemente rápido y la app es muy fácil de usar. ¡El mejor banco digital!"
    },
    {
      imageUrl: marcoImageUrl,
      name: "Marco Antonio",
      since: "2022",
      quote: "La atención al cliente es excepcional. Resolvieron mi problema en minutos. Muy recomendado."
    },
    {
      imageUrl: carlosImageUrl,
      name: "Carlos Pérez",
      since: "2021",
      quote: "Las inversiones con Bank CCI han sido las mejores decisiones financieras que he tomado. Excelente asesoramiento."
    }
  ];

  return (
    <Box>
      <HeroSection videoUrl={videoUrl} />
      <ProductsSection />
      <FeaturesSection />
      <TestimonialsSection testimonials={testimonials} />
      <CallToAction />
    </Box>
  );
};

export default HomePage;