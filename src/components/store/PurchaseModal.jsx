import React, { useState, useEffect } from 'react';
import {
  Dialog, DialogTitle, DialogContent, DialogActions,
  Button, Typography, Box, FormControl, InputLabel,
  Select, MenuItem, CircularProgress, Alert,
  IconButton, Avatar, Divider
} from '@mui/material';
import {
  Close as CloseIcon,
  ShoppingCart as ShoppingCartIcon,
  AccountBalanceWallet as WalletIcon,
  CheckCircleOutline as CheckIcon
} from '@mui/icons-material';
import { useAccounts, useTransactions } from '../../shared/hooks';

const PurchaseModal = ({ open, onClose, product, onPurchaseComplete }) => {
  const [selectedAccountId, setSelectedAccountId] = useState('');
  const [accountsLoaded, setAccountsLoaded] = useState(false);
  
  const { 
    accounts, 
    loading: accountsLoading, 
    error: accountsError, 
    fetchUserAccounts 
  } = useAccounts();
  
  const { 
    purchaseProduct, 
    loading: purchaseLoading, 
    error: purchaseError, 
    successMessage,
    setSuccessMessage
  } = useTransactions();

  // Este efecto solo se ejecuta cuando el modal se abre (no en cada render)
  useEffect(() => {
    if (open && !accountsLoaded) {
      const loadAccounts = async () => {
        await fetchUserAccounts();
        setAccountsLoaded(true);
      };
      loadAccounts();
      
      setSuccessMessage && setSuccessMessage('');
    }
    
    if (!open) {
      setAccountsLoaded(false);
    }
  }, [open, fetchUserAccounts, setSuccessMessage, accountsLoaded]);

  // Seleccionar la primera cuenta cuando se cargan las cuentas
  useEffect(() => {
    if (accounts && accounts.length > 0 && !selectedAccountId) {
      setSelectedAccountId(accounts[0].uid);
    }
  }, [accounts, selectedAccountId]);

  const handlePurchase = async () => {
    if (!selectedAccountId || !product) return;
    
    const result = await purchaseProduct(product.uid, selectedAccountId);
    if (result) {
      setTimeout(() => {
        onPurchaseComplete();
      }, 1500);
    }
  };

  // ✅ [SOLUCIÓN] Se asegura de que 'accounts' sea siempre un array antes de usar .find()
  const selectedAccount = (accounts || []).find(acc => acc.uid === selectedAccountId);
  
  // Esta variable es solo para la alerta visual, no para deshabilitar el botón.
  const hasInsufficientFunds = selectedAccount && product && selectedAccount.balance < product.price;

  return (
    <Dialog 
      open={open} 
      onClose={purchaseLoading ? undefined : onClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 2,
          overflow: 'hidden'
        }
      }}
    >
      <DialogTitle 
        sx={{ 
          bgcolor: 'background.default',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          py: 2
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <ShoppingCartIcon sx={{ mr: 1, color: 'primary.main' }} />
          <Typography variant="h6">
            Comprar Producto
          </Typography>
        </Box>
        {!purchaseLoading && (
          <IconButton 
            edge="end" 
            color="inherit" 
            onClick={onClose} 
            aria-label="close"
            size="small"
          >
            <CloseIcon />
          </IconButton>
        )}
      </DialogTitle>
      
      <DialogContent dividers sx={{ p: 3 }}>
        {successMessage ? (
          <Box sx={{ 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center',
            py: 4
          }}>
            <Avatar 
              sx={{ 
                bgcolor: 'success.light',
                width: 80,
                height: 80,
                mb: 2
              }}
            >
              <CheckIcon sx={{ fontSize: 50, color: 'success.main' }} />
            </Avatar>
            <Typography variant="h5" sx={{ mb: 1, fontWeight: 'medium' }}>
              ¡Compra Exitosa!
            </Typography>
            <Typography variant="body1" textAlign="center" color="text.secondary">
              La transacción se ha completado correctamente.
              El producto ha sido añadido a su cuenta.
            </Typography>
          </Box>
        ) : product ? (
          <>
            <Box sx={{ mb: 3 }}>
              <Typography variant="h6" gutterBottom>
                {product.name}
              </Typography>
              <Typography variant="body2" color="text.secondary" paragraph>
                {product.descripcion}
              </Typography>
              <Box 
                sx={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: 1,
                  bgcolor: 'primary.light',
                  color: 'white',
                  p: 2,
                  borderRadius: 1
                }}
              >
                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                  Precio:
                </Typography>
                <Typography variant="h5" sx={{ fontWeight: 'bold', ml: 1 }}>
                  Q{product.price.toFixed(2)}
                </Typography>
              </Box>
            </Box>

            <Divider sx={{ my: 2 }} />
            
            <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 'medium' }}>
              Seleccione una cuenta para realizar el pago:
            </Typography>

            {accountsLoading ? (
              <Box sx={{ display: 'flex', justifyContent: 'center', py: 3 }}>
                <CircularProgress size={30} />
              </Box>
            ) : accountsError ? (
              <Alert severity="error" sx={{ mb: 2 }}>
                {accountsError}
              </Alert>
            ) : accounts && accounts.length === 0 ? (
              <Alert severity="warning" sx={{ mb: 2 }}>
                No tienes cuentas disponibles. Por favor contacta con un administrador.
              </Alert>
            ) : (
              <>
                <FormControl fullWidth sx={{ mb: 2 }}>
                  <InputLabel id="account-select-label">Cuenta</InputLabel>
                  <Select
                    labelId="account-select-label"
                    id="account-select"
                    value={selectedAccountId}
                    label="Cuenta"
                    onChange={(e) => setSelectedAccountId(e.target.value)}
                    startAdornment={
                      <Box sx={{ mr: 1, display: 'flex', alignItems: 'center' }}>
                        <WalletIcon sx={{ color: 'primary.main' }} />
                      </Box>
                    }
                    disabled={purchaseLoading}
                  >
                    {(accounts || []).map(account => (
                      <MenuItem key={account.uid} value={account.uid}>
                        <Box sx={{ display: 'flex', width: '100%', justifyContent: 'space-between' }}>
                          <Typography>
                            {account.numberAccount} - {account.typeAccount}
                          </Typography>
                          <Typography 
                            variant="subtitle2" 
                            sx={{ 
                              fontWeight: 'bold',
                              color: product && account.balance >= product.price ? 'success.main' : 'error.main'
                            }}
                          >
                            Q{account.balance.toFixed(2)}
                          </Typography>
                        </Box>
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>

                {/* ✨ [MEJORA UX] Alerta visual si no hay fondos suficientes */}
                {hasInsufficientFunds && (
                  <Alert severity="warning" sx={{ mb: 2 }}>
                    La cuenta seleccionada no tiene fondos suficientes. La transacción podría ser rechazada por el sistema.
                  </Alert>
                )}

                {purchaseError && (
                  <Alert severity="error" sx={{ mb: 2 }}>
                    {purchaseError}
                  </Alert>
                )}
              </>
            )}
          </>
        ) : (
          <Box sx={{ py: 2, textAlign: 'center' }}>
            <CircularProgress size={30} />
          </Box>
        )}
      </DialogContent>
      
      <DialogActions sx={{ px: 3, py: 2 }}>
        {!successMessage && (
          <>
            <Button onClick={onClose} color="inherit" disabled={purchaseLoading}>
              Cancelar
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={handlePurchase}
              disabled={
                purchaseLoading || 
                accountsLoading || 
                !accounts ||
                accounts.length === 0 || 
                !selectedAccountId
              }
              startIcon={purchaseLoading ? <CircularProgress size={20} color="inherit" /> : null}
            >
              {purchaseLoading ? "Procesando..." : "Confirmar Compra"}
            </Button>
          </>
        )}
      </DialogActions>
    </Dialog>
  );
};

export default PurchaseModal;