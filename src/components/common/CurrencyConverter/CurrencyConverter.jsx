import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
  CircularProgress,
  Alert,
  Card,
  CardContent,
  CardHeader,
  Divider,
  IconButton,
  Stack
} from '@mui/material';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import { useCurrencyConverter } from '../../../shared/hooks/useCurrencyConverter';

const CURRENCIES = [
  { code: 'USD', name: 'Dólar estadounidense' },
  { code: 'EUR', name: 'Euro' },
  { code: 'GBP', name: 'Libra esterlina' },
  { code: 'JPY', name: 'Yen japonés' },
  { code: 'CAD', name: 'Dólar canadiense' },
  { code: 'AUD', name: 'Dólar australiano' },
  { code: 'CHF', name: 'Franco suizo' },
  { code: 'CNY', name: 'Yuan chino' },
  { code: 'GTQ', name: 'Quetzal guatemalteco' },
  { code: 'MXN', name: 'Peso mexicano' }
];

export const CurrencyConverter = ({
  initialAmount = '',
  initialFrom = 'USD',
  initialTo = 'GTQ',
  autoConvert = false
}) => {
  const [amount, setAmount] = useState(initialAmount);
  const [from, setFrom] = useState(initialFrom);
  const [to, setTo] = useState(initialTo);
  const { convert, isLoading, error, result, clearResult } = useCurrencyConverter();

  useEffect(() => {
    if (autoConvert && amount && !isNaN(amount) && parseFloat(amount) > 0) {
      convert(from, to, amount);
    }
    // eslint-disable-next-line
  }, [autoConvert, from, to, amount]);

  const handleConvert = async () => {
    if (!amount || isNaN(amount) || parseFloat(amount) <= 0) return;
    await convert(from, to, amount);
  };

  const handleSwap = () => {
    setFrom(to);
    setTo(from);
    clearResult();
  };

  const handleAmountChange = (e) => {
    setAmount(e.target.value);
    clearResult();
  };

  const handleCurrencyChange = (setter) => (e) => {
    setter(e.target.value);
    clearResult();
  };

  return (
    <Card
      elevation={2}
      sx={{
        borderRadius: 3,
        maxWidth: 420,
        mx: 'auto',
        bgcolor: "#fff",
        boxShadow: "0px 2px 12px 0px #E3EAFD40"
      }}
    >
      <CardHeader
        avatar={
          <Box
            sx={{
              bgcolor: '#2196f3',
              p: 1.1,
              borderRadius: 2,
              display: 'flex',
              alignItems: 'center'
            }}
          >
            <MonetizationOnIcon sx={{ color: 'white', fontSize: 28 }} />
          </Box>
        }
        title={
          <Typography variant="h6" sx={{ fontWeight: 700, color: '#1976d2' }}>
            Conversor de Divisas
          </Typography>
        }
        sx={{
          borderBottom: '1px solid #f0f0f0',
          bgcolor: '#f7fafd',
          pb: 1,
          minHeight: 64
        }}
      />
      <CardContent sx={{ pt: 2 }}>
        <Stack spacing={2}>
          <TextField
            label="Cantidad"
            type="number"
            fullWidth
            size="small"
            value={amount}
            onChange={handleAmountChange}
            InputProps={{ inputProps: { min: 0, step: 0.01 } }}
            error={amount !== '' && (isNaN(amount) || parseFloat(amount) <= 0)}
            helperText={amount !== '' && (isNaN(amount) || parseFloat(amount) <= 0) ? "Ingrese una cantidad válida" : ""}
          />
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <FormControl fullWidth size="small" sx={{ mr: 1 }}>
              <InputLabel>De</InputLabel>
              <Select
                value={from}
                label="De"
                onChange={handleCurrencyChange(setFrom)}
              >
                {CURRENCIES.map((currency) => (
                  <MenuItem key={currency.code} value={currency.code}>
                    {currency.code} - {currency.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <IconButton
              onClick={handleSwap}
              sx={{
                mx: 1,
                bgcolor: '#e3eafc',
                color: '#1976d2',
                '&:hover': { bgcolor: '#1976d2', color: 'white' }
              }}
              aria-label="Intercambiar monedas"
            >
              <SwapHorizIcon />
            </IconButton>
            <FormControl fullWidth size="small" sx={{ ml: 1 }}>
              <InputLabel>A</InputLabel>
              <Select
                value={to}
                label="A"
                onChange={handleCurrencyChange(setTo)}
              >
                {CURRENCIES.map((currency) => (
                  <MenuItem key={currency.code} value={currency.code}>
                    {currency.code} - {currency.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
          <Button
            variant="contained"
            fullWidth
            sx={{
              bgcolor: '#1976d2',
              fontWeight: 700,
              fontSize: 16,
              py: 1.2,
              mt: 1,
              borderRadius: 2,
              boxShadow: 'none',
              '&:hover': { bgcolor: '#10549c' }
            }}
            onClick={handleConvert}
            disabled={isLoading || !amount || isNaN(amount) || parseFloat(amount) <= 0}
          >
            {isLoading ? <CircularProgress size={24} color="inherit" /> : "CONVERTIR"}
          </Button>
        </Stack>
        {error && (
          <Alert severity="error" sx={{ mt: 2 }}>
            {error}
          </Alert>
        )}
        {result && (
          <>
            <Divider sx={{ my: 2 }} />
            <Box
              sx={{
                background: '#f3faff',
                borderRadius: 2,
                py: 2,
                textAlign: 'center',
                mt: 2
              }}
            >
              <Typography variant="body1" sx={{ color: 'text.secondary', mb: 1 }}>
                {result.originalAmount} {result.from} =
              </Typography>
              <Typography
                variant="h4"
                sx={{
                  fontWeight: 'bold',
                  color: '#1976d2',
                  mb: 0.5,
                  fontSize: { xs: 28, md: 32 }
                }}
              >
                {result.convertedAmount.toFixed(2)} {result.to}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Tasa de cambio: 1 {result.from} = {(result.convertedAmount / result.originalAmount).toFixed(4)} {result.to}
              </Typography>
            </Box>
          </>
        )}
      </CardContent>
    </Card>
  );
};