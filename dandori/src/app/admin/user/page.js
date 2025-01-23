
'use client'
import * as React from 'react';
import Grid from '@mui/material/Grid2';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import CustomizedDataGrid from '../components/CustomizedDataGrid';
import { getAllUsers } from '@/app/services/user';
import AddUser from '../components/addForms/AddUser'
import UpdateUser from '../components/updateForms/UpdateUser'
import DeleteItem from '../components/deleteForms/DeleteItem'
import { deleteUser } from '@/app/services/user';

export default function UserManagement() {
  const [action, setAction] = React.useState("read"); //create, read, update, delete
  const [selectedItem, setSelectedItem] = React.useState();
  const [usersData, setUsersData] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  const handleCRUD = () => { // Called after read, update, delete
    fetchUsers(); // Re-fetch data when a supermarket is added
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

  const fetchUsers = async () => {
    try {
      setLoading(true)
      const data = await getAllUsers(); // Llama al servicio para obtener los datos
      setUsersData(
        data.data.map((item) => ({
          id: item._id, // Asegúrate de que `item._id` sea único
          name: item.name,
          email: item.email,
          verified: item.verified,
          isAdmin: item.isAdmin,
          isActive: item.isActive,
          userTypeId: item.userTypeId,
          createdAt: item.createdAt,
          updatedAt: item.updatedAt,
        }))
      );
    } catch (error) {
      console.error("Error fetching users data:", error);
    } finally {
      setLoading(false); // Termina el estado de carga
    }
  };

  React.useEffect(() => {
    fetchUsers();
}, []);

  const columnsConfig = [
    { field: "id", headerName: "Id", flex: 1},
    { field: "name", headerName: "Nombre", flex: 1},
    { field: "email", headerName: "Correo electrónico", flex: 2},
    {
      field: "verified",
      headerName: "Verificado",
      flex: 1,
      renderCell: (params) => (
        <span style={{ color: params.value ? "green" : "red" }}>
          {params.value ? "Si" : "No"}
        </span>
      ),
    },
    {
      field: "isAdmin",
      headerName: "Administrador",
      flex: 1,
      renderCell: (params) => (
        <span style={{ color: params.value ? "green" : "red" }}>
          {params.value ? "Si" : "No"}
        </span>
      ),
    },
    { field: "userTypeId", headerName: "Id tipo de usuario", flex: 1},
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
        <h3 style={{ textAlign: "center" }}>{action == "read" && "Usuarios"}</h3>
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
        <AddUser onUserAdded={handleCRUD}/>
      ) : action == "update" ? (
        <UpdateUser onUserUpdated={handleCRUD} row={selectedItem}/>
      ) : action == "delete" ? (
        <DeleteItem onItemDeleted={handleCRUD} id={selectedItem} deleteService={deleteUser} title="Eliminar usuario"/>
      ) : (
        <Grid size={{ xs: 12, lg: 9 }}>
          <CustomizedDataGrid
            rows={usersData}
            columnsConfig={columnsConfig}
            UpdateForm={ChangeToUpdateForm}
            DeleteForm={ChangeToDeleteForm}
          />
        </Grid>
      )}
    </Box>
  );
}