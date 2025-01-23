import React from "react";
import { Card, CardContent, Typography, Box } from "@mui/material";

const NutritionData = ({ data, color, decorationColor, compareData = [] }) => {
  const getComparisonColor = (difference) => {
    if (difference < 0) return "green";
    if (difference > 0) return "red";
    return "black";
  };

  const parseValue = (value) => { // Convert the value to a float, ignoring units
    if (value === 0) return 0; // Explicitly handle the case for a numeric 0
    if (!value) return 0; // Handle null, undefined, or empty string
    return parseFloat(String(value).replace(",", ".").replace(/[^\d.-]/g, "")) || 0;
  };

  const renderNestedValues = (values) => {
    return values.map((item, index) => (
      <Box key={index} display="flex" justifyContent="space-between" alignItems="center" ml={2} mb={1}>
        <Typography variant="body2" sx={{ fontWeight: "normal" }}>
          {item.name}
        </Typography>
        <Typography variant="body2">{item.value}</Typography>
      </Box>
    ));
  };

  const orderedData = [
    ...compareData.map((compareItem) => {
      const matchingItem = data.find((dataItem) => dataItem.name === compareItem.name);
      return matchingItem || null;
    }).filter(Boolean),
    ...data.filter((dataItem) => !compareData.some((compareItem) => compareItem.name === dataItem.name)), // Add unmatched items
  ];

  return (
    <Card
      sx={{
        borderRadius: 3,
        padding: 2,
        backgroundColor: color ? color : "#f0fbf7",
        border: "1px solid #d2e5df",
        margin: "0 auto",
      }}
    >
      <CardContent>
        <Box display="flex" justifyContent="center" alignItems="center" mb={2}>
          <Box
            sx={{
              width: 40,
              height: 5,
              backgroundColor: decorationColor ? decorationColor : "#a7e5b0",
              borderRadius: "50px",
            }}
          />
        </Box>
        <Typography variant="h6" align="center" sx={{ fontWeight: "bold", mb: 2 }}>
          Datos nutricionales
        </Typography>
        {orderedData.map((item, index) => {
          const comparisonItem = compareData.find((comp) => comp.name === item.name);

          // If absoluteValue is an array, skip comparison
          if (Array.isArray(item.absoluteValue)) {
            return (
              <Box key={index} mb={2}>
                <Box display="flex" justifyContent="space-between" alignItems="center">
                  <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                    {item.name}
                  </Typography>
                  <Typography variant="body1">{item.absoluteValue ? "" : item.absoluteValue}</Typography>
                </Box>
                {renderNestedValues(item.absoluteValue)}
              </Box>
            );
          }

          const comparisonValue = comparisonItem ? parseValue(comparisonItem.relativeValue) : null;
          const originalValue = parseValue(item.relativeValue);

          const difference = comparisonValue !== null ? originalValue - comparisonValue : null;

          const color = difference !== null ? getComparisonColor(difference) : "black";

          return (
            <Box key={index} mb={2}>
              <Box display="flex" justifyContent="space-between" alignItems="center">
                <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                  {item.name}
                </Typography>
                <Box display="flex" alignItems="center">
                  {comparisonValue !== null && color !== "black" && (
                    <Typography variant="body1" sx={{ color, mr: 1 }}>
                      ({difference > 0 ? "+" : ""}
                      {difference.toFixed(2)})
                    </Typography>
                  )}
                  <Typography variant="body1">{item.absoluteValue}</Typography>
                </Box>
              </Box>
            </Box>
          );
        })}
      </CardContent>
    </Card>
  );
};

export default NutritionData;
