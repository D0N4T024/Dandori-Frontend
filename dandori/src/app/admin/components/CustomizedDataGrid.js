import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Button from '@mui/material/Button';
import { columns as originalColumns, rows as initialRows } from '../internals/data/gridData';

export default function CustomizedDataGrid() {
  const [rows, setRows] = React.useState(initialRows);

  // Función para manejar la eliminación de filas
  const handleDelete = (id) => {
    setRows(rows.filter((row) => row.id !== id));
  };

  // Función para manejar la edición de filas
  const handleEdit = (id) => {
    const newName = prompt('Ingrese un nuevo nombre para la fila:');
    if (newName) {
      setRows(
        rows.map((row) =>
          row.id === id ? { ...row, name: newName } : row
        )
      );
    }
  };

  // Agregar columna de acciones
  const columns = [
    ...originalColumns,
    {
      field: 'actions',
      headerName: 'Acciones',
      width: 150,
      sortable: false,
      renderCell: (params) => (
        <div style={{ display: 'flex', gap: '8px' }}>
          <Button
            variant="outlined"
            size="small"
            onClick={() => handleEdit(params.id)}
          >
            Editar
          </Button>
          <Button
            variant="contained"
            color="error"
            size="small"
            onClick={() => handleDelete(params.id)}
          >
            Eliminar
          </Button>
        </div>
      ),
    },
  ];

  return (
    <DataGrid
      autoHeight
      rows={rows}
      columns={columns}
      getRowClassName={(params) =>
        params.indexRelativeToCurrentPage % 2 === 0 ? 'even' : 'odd'
      }
      initialState={{
        pagination: { paginationModel: { pageSize: 20 } },
      }}
      pageSizeOptions={[10, 20, 50]}
      disableColumnResize
      density="compact"
      slotProps={{
        filterPanel: {
          filterFormProps: {
            logicOperatorInputProps: {
              variant: 'outlined',
              size: 'small',
            },
            columnInputProps: {
              variant: 'outlined',
              size: 'small',
              sx: { mt: 'auto' },
            },
            operatorInputProps: {
              variant: 'outlined',
              size: 'small',
              sx: { mt: 'auto' },
            },
            valueInputProps: {
              InputComponentProps: {
                variant: 'outlined',
                size: 'small',
              },
            },
          },
        },
      }}
    />
  );
}
