// 'use client'
// import { useRouter, useSearchParams } from 'next/navigation';
// import Pagination from '@mui/material/Pagination';

// export default function PaginationControls({ search, total }) {
//   const router = useRouter();
//   const searchParams = useSearchParams();

//   const page = searchParams.get('page') ?? '1'
//   const per_page = searchParams.get('per_page') ?? '4'

//   const handleChange = (event, value) => {
//     router.push(`/search?query=${search}&page=${Number(value)}&per_page=${per_page}`)
//   };

//   return (
//     <div>
//       <Pagination count={total} page={Number(page)} onChange={handleChange}/>
//     </div>
//   )
// }


// import React from "react";
// import Pagination from "@mui/material/Pagination";
// import Stack from "@mui/material/Stack";

// const CustomPagination = ({ total= 40, page= 2, pages= 10, onPageChange }) => {
//   return (
//     <Stack spacing={2} alignItems="center">
//       <Pagination
//         count={pages}
//         page={page}
//         onChange={(event, value) => onPageChange(value)}
//         color="primary"
//         shape="rounded"
//         showFirstButton
//         showLastButton
//       />
//       <p>
//         Page {page} of {pages} | Total: {total} items
//       </p>
//     </Stack>
//   );
// };

// export default CustomPagination;



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