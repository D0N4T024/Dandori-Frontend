"use client";
import React from "react";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { useMediaQuery } from "@mui/material";

export default function PaginationControl({ page, totalPages, onPageChange }) {
  const handleChange = (event, value) => {
    onPageChange(value); // Call the parent handler with the selected page
  };

  // Cambia el tamaño de la paginación según el ancho de la pantalla
  const isSmallScreen = useMediaQuery("(max-width:632px)");

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <Stack spacing={2} alignItems="center">

        <Pagination
          count={totalPages}
          page={page}
          onChange={handleChange}
          // variant="outlined"
          color="error"
          size={isSmallScreen ? "small" : "medium"} // Cambia el tamaño dinámicamente
          // shape="rounded"
          // siblingCount={1}
          // boundaryCount={1}
        />
      </Stack>
    </div>
  );
}