import React from 'react';
import { Card, CardContent, Typography, Box, Divider } from '@mui/material';

const NutritionData = ({ data, compareData = [] }) => {
    const getComparisonColor = (difference) => {
        if (difference < 0) return 'green'; // Si la diferencia es negativa, es menor (verde)
        if (difference > 0) return 'red';   // Si la diferencia es positiva, es mayor (rojo)
        return 'black'; // Sin cambios
      };
    
    const parseValue = (value) => {
        // Convertir valor a número ignorando unidades (e.g., "15,13 g" → 15.13)
        return parseFloat(value.replace(',', '.').replace(/[^\d.-]/g, ''));
    };

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

                {/* {data.map((item, index) => (
                    <Box key={index} display="flex" justifyContent="space-between" alignItems="center" mb={1}>
                        <Typography variant="body1" sx={{ fontWeight: item.subItem ? 'normal' : 'bold', ml: item.subItem ? 2 : 0 }}>
                            {item.label}
                        </Typography>
                        <Typography variant="body1">{item.value}</Typography>
                    </Box>
                ))} */}
                {data.map((item, index) => {
          const comparisonItem = compareData.find((comp) => comp.label === item.label);
          const comparisonValue = comparisonItem ? parseValue(comparisonItem.value) : null;
          const originalValue = parseValue(item.value);

          // Calcular diferencia
          const difference = comparisonValue !== null ? originalValue - comparisonValue : null;

          // Obtener color basado en la diferencia
          const color = difference !== null ? getComparisonColor(difference) : 'black';

          return (
            <Box key={index} display="flex" justifyContent="space-between" alignItems="center" mb={1}>
              <Typography
                variant="body1"
                sx={{ fontWeight: item.subItem ? 'normal' : 'bold', ml: item.subItem ? 2 : 0 }}
              >
                {item.label}
              </Typography>
              <Box display="flex" alignItems="center">
                {comparisonValue !== null && (
                  <Typography variant="body1" sx={{ color, mr: 1 }}>
                    ({difference > 0 ? '+' : ''}{difference.toFixed(2)})
                  </Typography>
                )}
                <Typography variant="body1">
                  {item.value}
                </Typography>
              </Box>
            </Box>
          );
        })}
            </CardContent>
        </Card>
    );
};

export default NutritionData;
