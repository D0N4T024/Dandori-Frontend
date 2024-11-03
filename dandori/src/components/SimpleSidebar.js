import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import Modal from '@mui/material/Modal';
import './Sidebar.css';

const drawerWidth = 240;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: '16px',
    transition: 'margin 0.3s ease',
    marginRight: open ? 0 : -drawerWidth,
  })
);

const Sidebar = ({ open, handleClose }) => (
  <div className="sidebar-content">
    <div className="sidebar-header">
      <IconButton onClick={handleClose}>
        <ChevronRightIcon />
      </IconButton>
    </div>
    <ul>
      {['Modo Oscuro/Modo Claro', 'Ingles/Espanol', 'Lector de Barra'].map((text, index) => (
        <li key={index}>{text}</li>
      ))}
    </ul>
    <hr />
    <ul>
      {['Prueba1', 'Prueba2', 'Prueba3'].map((text, index) => (
        <li key={index}>{text}</li>
      ))}
    </ul>
  </div>
);

export default function SidebarWithModal() {
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <div>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="end"
          onClick={handleDrawerOpen}
        >
          <MenuIcon />
        </IconButton>
      
      {/* Modal for Sidebar */}
      <Modal
        open={open}
        onClose={handleDrawerClose}
        aria-labelledby="modal-sidebar-title"
        aria-describedby="modal-sidebar-description"
      >
        <Box className="modal-box">
          <Sidebar open={open} handleClose={handleDrawerClose} />
        </Box>
      </Modal>
      </div>
  );
}