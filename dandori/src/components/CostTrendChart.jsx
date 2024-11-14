import React from 'react';
import { Card, CardContent, Typography, Box } from '@mui/material';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const CostTrendChart = ({ tendency:tendency }) => {
    return (
        <Card
            sx={{
                // maxWidth: 400,
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
                    ${tendency.at(-1).cost}
                </Typography>
                <ResponsiveContainer width="100%" height={180}>
                    <LineChart data={tendency}>
                        <XAxis dataKey="date" hide />
                        <YAxis domain={[120, 140]} tickFormatter={(value) => `$${value}`}  />
                        <Tooltip 
                            formatter={(value) => [`${value}$`, 'Costo']}
                            labelFormatter={(label) => `${label} 00:00`}
                            contentStyle={{ backgroundColor: 'white', borderRadius: 5 }}
                            labelStyle={{ color: 'gray' }}
                        />
                        <Line type="monotone" dataKey="cost" stroke="#6e44ff" strokeWidth={3} dot />
                    </LineChart>
                </ResponsiveContainer>
            </CardContent>
        </Card>
    );
};

export default CostTrendChart;