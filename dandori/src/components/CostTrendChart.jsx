import React from 'react';
import { Card, CardContent, Typography, Box } from '@mui/material';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const CostTrendChart = ({ history }) => {
    // Extract prices and calculate dynamic Y domain
    const prices = history.map((entry) => parseFloat(entry.price));
    const minPrice = Math.floor(Math.min(...prices) * 0.9); // Add some padding below the minimum price
    const maxPrice = Math.ceil(Math.max(...prices) * 1.1); // Add some padding above the maximum price

    // Formatear en inglés (Estados Unidos) con símbolo de $
    const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
    });

    return (
        <Card
            sx={{
                borderRadius: 3,
                padding: 2,
                backgroundColor: '#f0fbf7',
                border: '1px solid #d2e5df',
            }}
        >
            <CardContent>
                <Box display="flex" justifyContent="center" alignItems="center" mb={2}>
                    <Box
                        sx={{
                            width: 40,
                            height: 5,
                            backgroundColor: '#a7e5b0',
                            borderRadius: '50px',
                        }}
                    />
                </Box>
                <Typography variant="h6" align="center" sx={{ fontWeight: 'bold', mb: 2 }}>
                    Tendencia de costo
                </Typography>
                <Typography variant="h4" sx={{ fontWeight: 600 }}>
                    RD{formatter.format(prices[prices.length - 1])} {/* Display the last price */}
                </Typography>
                <ResponsiveContainer width="100%" height={180}>
                    <LineChart data={history.map(({ price, timestamp }) => ({
                        price: parseFloat(price),
                        date: new Date(timestamp).toLocaleDateString(),
                    }))}>
                        <XAxis dataKey="date" hide />
                        <YAxis domain={[minPrice, maxPrice]} tickFormatter={(value) => `$${value}`} />
                        <Tooltip
                            formatter={(value) => [`${formatter.format(value)}`, 'Costo']}
                            labelFormatter={(label) => `${label}`}
                            contentStyle={{ backgroundColor: 'white', borderRadius: 5 }}
                            labelStyle={{ color: 'gray' }}
                        />
                        <Line type="monotone" dataKey="price" stroke="#6e44ff" strokeWidth={3} dot />
                    </LineChart>
                </ResponsiveContainer>
            </CardContent>
        </Card>
    );
};

export default CostTrendChart;