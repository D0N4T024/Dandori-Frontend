'use client'
import { useState } from 'react';
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
//   p: 2,
};


export default function CustomizableModal({ content, textTag, data:data }) {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

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
        >
            <Box sx={style}>
                <button onClick={handleClose} className='iconButton' style={{position: 'fixed', top: '5px', right: '5px'}}><CloseIcon/></button>
                <div 
                    style={{
                        maxHeight: '75vh',
                        overflowY: 'hidden',
                        marginTop: '3em',
                        marginLeft: '2em',
                        paddingBottom: '2em',
                        paddingRight: '1em',
                        marginRight: '0.5em',
                    }}
                >
                    {content({data:data})}
                </div>
            </Box>
        </Modal>
    </div>
  );
}