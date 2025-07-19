import { Box, Typography, Stack, Fade, Grow } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import { styled } from '@mui/material/styles';

const StrengthBar = styled(Box)(({ theme }) => ({
  height: 8,
  flexGrow: 1,
  borderRadius: 20,
  background: theme.palette.grey[200],
  overflow: 'hidden',
  boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.1)',
  position: 'relative',
  marginBottom: theme.spacing(1.5),
  marginTop: theme.spacing(1)
}));

const StrengthIndicator = styled(Box)(({ width, color }) => ({
  height: '100%',
  width: `${width}%`,
  backgroundColor: color,
  borderRadius: 20,
  transition: 'width 0.4s ease-in-out, background-color 0.4s',
  boxShadow: '0 0 5px rgba(0,0,0,0.1)'
}));

const RequirementItem = styled(Box)(({ theme, isValid }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(1),
  padding: theme.spacing(0.5, 1),
  opacity: isValid ? 1 : 0.7,
  transition: 'opacity 0.2s, transform 0.2s',
  '&:hover': {
    transform: 'translateX(2px)'
  }
}));

const RequirementsContainer = styled(Box)(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
  gap: theme.spacing(0.5),
  padding: theme.spacing(1, 0),
  marginBottom: theme.spacing(1)
}));

export const PasswordStrengthValidator = ({ password = "" }) => {
  const validationCriteria = [
    { 
      label: "Al menos 6 caracteres", 
      valid: password.length >= 6,
      regex: /.{6,}/
    },
    { 
      label: "Al menos una letra minúscula", 
      valid: /[a-z]/.test(password),
      regex: /[a-z]/
    },
    { 
      label: "Al menos una letra mayúscula", 
      valid: /[A-Z]/.test(password),
      regex: /[A-Z]/
    },
    { 
      label: "Al menos un número", 
      valid: /\d/.test(password),
      regex: /\d/
    },
    { 
      label: "Al menos un símbolo", 
      valid: /[!@#$%^&*(),.?":{}|<>]/.test(password),
      regex: /[!@#$%^&*(),.?":{}|<>]/
    }
  ];

  const validCount = validationCriteria.filter(criterion => criterion.valid).length;
  const strengthPercentage = (validCount / validationCriteria.length) * 100;

  let strengthColor = "#f44336"; // error.main
  let strengthLabel = "Muy débil";

  if (strengthPercentage === 100) {
    strengthColor = "#4caf50"; // success.main
    strengthLabel = "Fuerte";
  } else if (strengthPercentage >= 60) {
    strengthColor = "#ff9800"; // warning.main
    strengthLabel = "Moderada";
  } else if (strengthPercentage >= 40) {
    strengthColor = "#ff7043"; // error.light
    strengthLabel = "Débil";
  }

  const displayPercentage = password.length > 0 ? Math.max(10, strengthPercentage) : 0;

  return (
    <Fade in={password.length > 0} timeout={300}>
      <Box sx={{ mt: 1, mb: 2, p: 1.5, borderRadius: 2, bgcolor: 'rgba(0,0,0,0.02)', border: '1px solid rgba(0,0,0,0.06)' }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
          <Typography variant="caption" sx={{ fontWeight: 500, color: 'text.secondary' }}>
            Fortaleza de la contraseña
          </Typography>
          <Typography 
            variant="caption" 
            sx={{ 
              fontWeight: 'bold', 
              color: strengthColor,
              bgcolor: `${strengthColor}15`,
              px: 1.5,
              py: 0.5,
              borderRadius: 10
            }}
          >
            {strengthLabel}
          </Typography>
        </Box>
        
        <StrengthBar>
          <StrengthIndicator width={displayPercentage} color={strengthColor} />
        </StrengthBar>
        
        <RequirementsContainer>
          {validationCriteria.map((criterion, index) => (
            <Grow 
              key={index} 
              in={true} 
              timeout={300 + (index * 100)}
              style={{ transformOrigin: '0 0 0' }}
            >
              <RequirementItem isValid={criterion.valid}>
                {criterion.valid ? (
                  <CheckCircleIcon sx={{ color: '#4caf50', fontSize: 18 }} />
                ) : (
                  <CancelIcon sx={{ color: 'rgba(0,0,0,0.3)', fontSize: 18 }} />
                )}
                <Typography 
                  variant="body2"
                  sx={{ 
                    color: criterion.valid ? 'text.primary' : 'text.secondary',
                    fontSize: '0.85rem',
                    fontWeight: criterion.valid ? 500 : 400
                  }}
                >
                  {criterion.label}
                </Typography>
              </RequirementItem>
            </Grow>
          ))}
        </RequirementsContainer>
      </Box>
    </Fade>
  );
};