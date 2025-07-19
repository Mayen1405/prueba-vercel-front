import React from 'react';
import { 
  Box, Container, Typography, Paper, Grid, Button, Avatar, List, 
  ListItem, ListItemText, ListItemAvatar, CircularProgress
} from '@mui/material';
import { styled, useTheme } from '@mui/material/styles';
import { Link } from 'react-router-dom';
import { useAdminDashboard } from '../../shared/hooks/useAdminDashboard';

// --- ICONOS ---
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import InventoryIcon from '@mui/icons-material/Inventory';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import AddCardIcon from '@mui/icons-material/AddCard';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const ActionCard = styled(Paper)(({ theme, color }) => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  borderRadius: theme.shape.borderRadius * 1.5,
  padding: theme.spacing(3),
  transition: 'all 0.2s ease-in-out',
  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow: `0 8px 16px 0 ${color || theme.palette.primary.main}33`,
  },
}));

export const AdminPage = () => {
  const theme = useTheme();
  // El hook ahora no devuelve `topAccounts`
  const { stats, recentActivity, isLoading } = useAdminDashboard();

  const kpiData = [
    { title: 'Usuarios Activos', value: stats.userCount, icon: <PeopleAltIcon />, color: theme.palette.success.main },
    { title: 'Cuentas Totales', value: stats.accountCount, icon: <AccountBalanceWalletIcon />, color: theme.palette.primary.main },
    { title: 'Productos en Catálogo', value: stats.productCount, icon: <InventoryIcon />, color: theme.palette.info.main },
    { title: 'Volumen Transaccional', value: 'Q32,568', icon: <MonetizationOnIcon />, color: theme.palette.secondary.main },
  ];

  if (isLoading) {
    return <Box sx={{ display: 'flex', justifyContent: 'center', py: 10 }}><CircularProgress /></Box>;
  }

  return (
    <Box sx={{ py: 4, bgcolor: '#f4f6f8' }}>
      <Container maxWidth="xl">
        <Box sx={{ mb: 4 }}>
          <Typography variant="h4" fontWeight="bold">Panel de Administración</Typography>
          <Typography color="text.secondary">Vista general del sistema en tiempo real.</Typography>
        </Box>

        <Grid container spacing={3}>
          {/* --- COLUMNA IZQUIERDA --- */}
          <Grid item xs={12} lg={8}>
            <Paper variant="outlined" sx={{ p: {xs: 2, md: 3}, borderRadius: 2, height: '100%' }}>
              <Typography variant="h6" fontWeight="bold" sx={{ mb: 2 }}>Indicadores Clave (KPIs)</Typography>
              <Grid container spacing={3}>
                {kpiData.map((kpi) => (
                  <Grid item xs={12} sm={6} key={kpi.title}>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Avatar sx={{ bgcolor: `${kpi.color}20`, color: kpi.color, mr: 1.5 }}>{kpi.icon}</Avatar>
                        <Box>
                          <Typography variant="subtitle1" color="text.secondary">{kpi.title}</Typography>
                          <Typography variant="h5" fontWeight="bold">{kpi.value}</Typography>
                        </Box>
                      </Box>
                  </Grid>
                ))}
              </Grid>
            </Paper>
          </Grid>

          {/* --- COLUMNA DERECHA --- */}
          <Grid item xs={12} lg={4}>
            <Grid container spacing={3}>
              {/* Atajos Administrativos */}
              <Grid item xs={12}>
                <ActionCard variant="outlined" color={theme.palette.success.main}>
                    <Avatar sx={{ bgcolor: 'success.light', color: 'success.dark', mb: 1 }}><PersonAddIcon /></Avatar>
                    <Typography variant="h6" fontWeight="bold">Agregar Cliente</Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ flexGrow: 1, my: 1 }}>Crea nuevos perfiles de usuario en el sistema.</Typography>
                    <Button component={Link} to="/admin/users/new" variant="contained" color="success">Crear Cliente</Button>
                </ActionCard>
              </Grid>
              <Grid item xs={12}>
                 <ActionCard variant="outlined" color={theme.palette.warning.main}>
                    <Avatar sx={{ bgcolor: 'warning.light', color: 'warning.dark', mb: 1 }}><AddCardIcon /></Avatar>
                    <Typography variant="h6" fontWeight="bold">Administrar Depósitos</Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ flexGrow: 1, my: 1 }}>Realiza, modifica o revierte depósitos.</Typography>
                    <Button component={Link} to="/admin/deposits" variant="contained" color="warning">Administrar</Button>
                 </ActionCard>
              </Grid>

              {/* Log de Actividad Reciente */}
              <Grid item xs={12}>
                <Paper variant="outlined" sx={{ p: 2, borderRadius: 2 }}>
                  <Typography variant="h6" fontWeight="bold" sx={{ mb: 1, px: 1 }}>Actividad Reciente</Typography>
                  {recentActivity.length > 0 ? (
                    <List sx={{ p: 0 }}>
                      {recentActivity.map((activity) => (
                        <ListItem key={activity.id} secondaryAction={<ArrowForwardIosIcon fontSize="small" color="action" />}>
                          <ListItemAvatar>
                            <Avatar sx={{ bgcolor: 'success.light' }}><CheckCircleIcon color="success" /></Avatar>
                          </ListItemAvatar>
                          <ListItemText
                            primary={<Typography variant="body2" fontWeight="medium">{activity.action}</Typography>}
                            secondary={activity.details}
                          />
                        </ListItem>
                      ))}
                    </List>
                  ) : (
                    <Typography variant="body2" color="text.secondary" sx={{ p: 1 }}>No hay actividad reciente.</Typography>
                  )}
                </Paper>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};