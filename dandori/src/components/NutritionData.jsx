import React from 'react';
import { Card, CardContent, Typography, Box, Divider } from '@mui/material';

const NutritionData = ({ data }) => {
    return (
        <Card
            sx={{
                // maxWidth: 400,
                borderRadius: 3,
                padding: 2,
                backgroundColor: '#f0fbf7',
                border: '1px solid #d2e5df',
                margin: '0 auto',
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
                    Datos nutricionales
                </Typography>

                {data.map((item, index) => (
                    <Box key={index} display="flex" justifyContent="space-between" alignItems="center" mb={1}>
                        <Typography variant="body1" sx={{ fontWeight: item.subItem ? 'normal' : 'bold', ml: item.subItem ? 2 : 0 }}>
                            {item.label}
                        </Typography>
                        <Typography variant="body1">{item.value}</Typography>
                    </Box>
                ))}
            </CardContent>
        </Card>
    );
};

export default NutritionData;
