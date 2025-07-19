import React from 'react';
import { Box, Typography, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { CurrencyConverter } from '../../common/CurrencyConverter';

export const CurrencyConversionSection = ({ accountBalance, accountCurrency = 'GTQ' }) => {
    return (
        <Accordion sx={{ mt: 3, mb: 2 }}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography variant="subtitle1">Convertir saldo a otras monedas</Typography>
            </AccordionSummary>
            <AccordionDetails>
                <Box sx={{ mb: 1 }}>
                    <Typography variant="body2" color="text.secondary">
                        Convierta su saldo actual a diferentes monedas para tener una referencia del valor equivalente.
                    </Typography>
                </Box>
                <CurrencyConverter 
                    initialAmount={accountBalance} 
                    initialFrom={accountCurrency} 
                    initialTo={accountCurrency === 'USD' ? 'GTQ' : 'USD'} 
                    autoConvert={true}
                />
            </AccordionDetails>
        </Accordion>
    );
};