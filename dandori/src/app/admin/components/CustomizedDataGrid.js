"use client"
import * as React from 'react';
import { DataGrid, GridToolbarQuickFilter, GridToolbarContainer, GridToolbarExport } from '@mui/x-data-grid';
import Button from '@mui/material/Button';

export default function CustomizedDataGrid({ rows, columnsConfig, UpdateForm, DeleteForm }) {
  const [localRows, setLocalRows] = React.useState(rows || []);

  // Función para manejar la eliminación de filas
  const handleDelete = (id) => {
    setLocalRows(localRows.filter((row) => row.id !== id));
  };

  console.log("rows: ", rows)
  console.log("columnsConfig: ", columnsConfig)

  const CustomToolbar = () => (
    <GridToolbarContainer
      sx={{
        display: "flex",
        justifyContent: "space-between", // Adds space between Quick Filter and Export Button
        alignItems: "center",
        padding: "8px",
      }}
    >
      <GridToolbarExport />
      <GridToolbarQuickFilter />
    </GridToolbarContainer>
  );

  // Agregar columna de acciones
  const columns = [
    ...columnsConfig.map((col) => ({
      ...col,
      flex: col.flex || 1,
      resizable: true,
    })),
    {
      field: "actions",
      headerName: "Actions",
      minWidth: 170,
      sortable: false,
      resizable: false,
      renderCell: (params) => (
        <div
          style={{
            display: "flex",
            gap: "8px",
            minWidth: "150px",
            justifyContent: "space-between",
          }}
        >
          <Button
            variant="outlined"
            size="small"
            onClick={() => UpdateForm(params.row)}
          >
            Editar
          </Button>
          <Button
            variant="contained"
            color="error"
            size="small"
            onClick={() => DeleteForm(params.id)}
          >
            Eliminar
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div>
      <DataGrid
        autoHeight
        rows={localRows}
        columns={columns}
        slots={{ toolbar: CustomToolbar }}
        getRowClassName={(params) =>
          params.indexRelativeToCurrentPage % 2 === 0 ? "even" : "odd"
        }
        initialState={{
          pagination: { paginationModel: { pageSize: 20 } },
        }}
        pageSizeOptions={[10, 20, 50]}
        // disableColumnResize
        density="compact"
        slotProps={{
          toolbar: {
            showQuickFilter: true,
          },
          filterPanel: {
            filterFormProps: {
              logicOperatorInputProps: {
                variant: "outlined",
                size: "small",
              },
              columnInputProps: {
                variant: "outlined",
                size: "small",
                sx: { mt: "auto" },
              },
              operatorInputProps: {
                variant: "outlined",
                size: "small",
                sx: { mt: "auto" },
              },
              valueInputProps: {
                InputComponentProps: {
                  variant: "outlined",
                  size: "small",
                },
              },
            },
          },
        }}
      />
    </div>
  );
}