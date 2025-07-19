import React from 'react';
import { 
    Paper, 
    Typography, 
    Box,
    useTheme
} from '@mui/material';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

export const TransactionReportChart = ({ data }) => {
    const theme = useTheme();

    return (
        <Paper elevation={3} sx={{ p: 3, borderRadius: 2 }}>
            <Typography variant="h6" fontWeight="bold" gutterBottom>
                Cuentas por Volumen de Transacciones
            </Typography>
            <Box sx={{ height: 400, mt: 3 }}>
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                        data={data}
                        layout="vertical"
                        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis type="number" />
                        <YAxis dataKey="name" type="category" width={100} />
                        <Tooltip
                            formatter={(value) => [`${value} transacciones`, 'Total']}
                            cursor={{ fill: 'rgba(238, 242, 255, 0.6)' }}
                        />
                        <Legend />
                        <Bar dataKey="count" name="No. de Transacciones" fill={theme.palette.primary.main} barSize={20} />
                    </BarChart>
                </ResponsiveContainer>
            </Box>
        </Paper>
    );
};