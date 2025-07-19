import React from 'react';
import { Box, Card, CardContent, Typography, Avatar } from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledTestimonialCard = styled(Card)(({ theme }) => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shorter,
  }),
  '&:hover': {
    transform: 'scale(1.03)',
    boxShadow: theme.shadows[4],
  },
}));

const TestimonialCard = ({ imageUrl, name, since, testimonial }) => {
  return (
    <Box sx={{ px: 2 }}>
      <StyledTestimonialCard elevation={3}>
        <Box 
          sx={{ 
            height: 200, 
            backgroundImage: `url(${imageUrl})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center top'
          }}
        />
        <CardContent sx={{ p: 3 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <Avatar 
              sx={{ bgcolor: '#FFD915', mr: 2, width: 50, height: 50 }}
              src={imageUrl}
            >
              {name.split(' ').map(n => n[0]).join('')}
            </Avatar>
            <Box>
              <Typography variant="h6" fontWeight="bold">{name}</Typography>
              <Typography variant="body2" color="text.secondary">Cliente desde {since}</Typography>
            </Box>
          </Box>
          <Typography variant="body1" fontStyle="italic">
            "{testimonial}"
          </Typography>
        </CardContent>
      </StyledTestimonialCard>
    </Box>
  );
};

export default TestimonialCard;