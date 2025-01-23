'use client'
import { useState, useEffect, forwardRef, useImperativeHandle } from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import CloseIcon from '@mui/icons-material/Close';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  maxWidth: '95vw',
  maxHeight: '80vh',
  borderRadius: '25px',
  overflowY: 'hidden',
  bgcolor: 'background.paper',
  boxShadow: 24,
};

const CustomizableModal= forwardRef(({ content, textTag, data, openAtStart, onClose }, ref) => {
  const [open, setOpen] = useState(false);
  const [modalKey, setModalKey] = useState(Date.now()); // Clave única para reiniciar el contenido

  const handleOpen = () => {
    setOpen(true);
    setModalKey(Date.now()); // Generar una nueva clave para resetear el contenido al abrir
  };

  const handleClose = () => {
    setOpen(false);
    if (onClose) { 
      onClose(); // Accion adicional al cerrar
    }
  };

  // Exponer métodos al componente padre usando useImperativeHandle
  useImperativeHandle(ref, () => ({
    handleClose,
  }));
  
  useEffect(() => {
    const Opening = async () => {
      if (openAtStart) { // Renderizar pagina con Popup abierto
        handleOpen();
      }
    };
    Opening()
  }, []);

  return (
    <div>
      <div onClick={handleOpen}>
        {textTag()}
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        sx={{ zIndex: 1000 }}
      >
        <Box sx={style}>
          <button onClick={handleClose} className='iconButton' style={{ position: 'fixed', top: '5px', right: '5px' }}>
            <CloseIcon />
          </button>
          <div
            style={{
              maxHeight: '75vh',
              overflowY: 'hidden',
              marginTop: '3em',
              marginLeft: '2em',
              paddingBottom: '2em',
              // paddingRight: '1em',
              marginRight: '2em',
            }}
          >
            {content({ data, key: modalKey })} {/* Pasar la nueva clave al contenido */}
          </div>
        </Box>
      </Modal>
    </div>
  );
});

export default CustomizableModal;