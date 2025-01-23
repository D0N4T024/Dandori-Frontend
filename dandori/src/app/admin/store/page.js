
'use client'
import * as React from 'react';
import Grid from '@mui/material/Grid2';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import CustomizedDataGrid from '../components/CustomizedDataGrid';
import { getAllSupermarkets } from '@/app/services/supermarket';
import AddSupermarket from '../components/addForms/AddSupermarket'
import UpdateSupermarket from '../components/updateForms/UpdateSupermarket'
import DeleteItem from '../components/deleteForms/DeleteItem'
import { deleteSupermarket } from "@/app/services/supermarket";

export default function StoreManagement() {
  const [action, setAction] = React.useState("read"); //create, read, update, delete
  const [selectedItem, setSelectedItem] = React.useState();
  const [supermarketsData, setSupermarketsData] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  const handleCRUD = () => { // Called after read, update, delete
    fetchSupermarkets(); // Re-fetch data when a supermarket is added
    setAction("read")
  }

  const ChangeToUpdateForm = (row) => {
    setSelectedItem(row)
    setAction("update")
  }

  const ChangeToDeleteForm = (id) => {
    setSelectedItem(id)
    setAction("delete")
  }

  const fetchSupermarkets = async () => {
    try {
      setLoading(true)
      const data = await getAllSupermarkets(); // Llama al servicio para obtener los datos
      setSupermarketsData(
        data.data.map((item) => ({
          id: item._id, // Asegúrate de que `item._id` sea único
          name: item.name,
          description: item.description,
          urlLogo: item.urlLogo,
          urlPreviewLogo: item.urlPreviewLogo,
          urlBusinessLogo: item.urlBusinessLogo,
          website: item.website,
          isActive: item.isActive,
          createdAt: item.createdAt,
          updatedAt: item.updatedAt
        }))
      );
    } catch (error) {
      console.error("Error fetching supermarkets data:", error);
    } finally {
      setLoading(false); // Termina el estado de carga
    }
  };

  React.useEffect(() => {
    fetchSupermarkets();
}, []);

  const columnsConfig = [
    { field: "id", headerName: "Id", flex: 1},
    { field: "name", headerName: "Nombre", flex: 1},
    {
      field: "urlLogo",
      headerName: "Logo",
      flex: 1,
      renderCell: (params) => (
        <a href={params.value} target="_blank" rel="noopener noreferrer">
          {params.value}
        </a>
      ),
    },
    {
      field: "urlPreviewLogo",
      headerName: "Logo de vista previa",
      flex: 1,
      renderCell: (params) => (
        <a href={params.value} target="_blank" rel="noopener noreferrer">
          {params.value}
        </a>
      ),
    },
    {
      field: "urlBusinessLogo",
      headerName: "Logo de negocio",
      flex: 1,
      renderCell: (params) => (
        <a href={params.value} target="_blank" rel="noopener noreferrer">
          {params.value}
        </a>
      ),
    },
    { field: "description", headerName: "Descripción", flex: 2},
    {
      field: "website",
      headerName: "Sitio web",
      flex: 1,
      renderCell: (params) => (
        <a href={params.value} target="_blank" rel="noopener noreferrer">
          {params.value}
        </a>
      ),
    },
    {
      field: "isActive",
      headerName: "Estado",
      flex: 1,
      renderCell: (params) => (
        <span style={{ color: params.value ? "green" : "red" }}>
          {params.value ? "Active" : "Inactive"}
        </span>
      ),
    },
    {
      field: "createdAt",
      headerName: "Creado en",
      flex: 1,
      renderCell: (params) =>
        new Date(params.value).toLocaleDateString("es-ES", {
          dateStyle: "medium",
        }),
    },
    {
      field: "updatedAt",
      headerName: "Actualizado en",
      flex: 1,
      renderCell: (params) =>
        new Date(params.value).toLocaleDateString("es-ES", {
          dateStyle: "medium",
        }),
    },
  ];

  if (loading) {
    return <div style={{ display: 'flex', alignItems: 'center', height: '100vh'}}>
      <p>Cargando datos...</p>
    </div>
  }
  
  return (
    <Box sx={{ minHeight: '100vh', width: '100%', maxWidth: { sm: '100%', md: '1700px' }, paddingBottom: '1.5em' }}>
      <Stack
        direction="row"
          sx={{
            display: { xs: 'flex', md: 'flex' },
            width: '100%',
            alignItems: { xs: 'center', md: 'center' },
            justifyContent: 'space-between',
            maxWidth: { sm: '100%', md: '1700px' },
            marginBlock: "16px",
            pt: 1.5,
        }}
        spacing={2}
      >
        <h3 style={{ textAlign: "center" }}>{action == "read" && "Tiendas"}</h3>
        { action == "read" ? (
          <Button
            variant="contained"
            size="small"
            color="primary"
            endIcon={<AddRoundedIcon />}
            onClick={() => setAction("create")}
          >
            Agregar
          </Button>
        ) : (
          <Button
            variant="contained"
            size="small"
            color="error"
            endIcon={<CloseRoundedIcon />}
            onClick={() => setAction("read")}
          >
            Cancelar
          </Button>
        )}
      </Stack>

      { action == "create" ? (
        <AddSupermarket onSupermarketAdded={handleCRUD}/>
      ) : action == "update" ? (
        <UpdateSupermarket onSupermarketUpdated={handleCRUD} row={selectedItem}/>
      ) : action == "delete" ? (
        <DeleteItem onItemDeleted={handleCRUD} id={selectedItem} title="Eliminar tienda" deleteService={deleteSupermarket}/>
      ) : (
        <Grid size={{ xs: 12, lg: 9 }}>
          <CustomizedDataGrid
            rows={supermarketsData}
            columnsConfig={columnsConfig}
            UpdateForm={ChangeToUpdateForm}
            DeleteForm={ChangeToDeleteForm}
          />
        </Grid>
      )}
    </Box>
  );
}