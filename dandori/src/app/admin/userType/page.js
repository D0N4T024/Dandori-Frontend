
'use client'
import * as React from 'react';
import Grid from '@mui/material/Grid2';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import Search from '../components/Search'
import CustomizedDataGrid from '../components/CustomizedDataGrid';
import Modal from '@mui/material/Modal';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function MainGrid() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  
  return (
    <Box sx={{ width: '100%', maxWidth: { sm: '100%', md: '1700px' } }}>
      {/* cards */}
      <Stack
      direction="row"
      sx={{
        display: { xs: 'flex', md: 'flex' },
        width: '100%',
        alignItems: { xs: 'flex-start', md: 'center' },
        justifyContent: 'space-between',
        maxWidth: { sm: '100%', md: '1700px' },
        pt: 1.5,
      }}
      spacing={2}
      >
        <Typography component="h2" variant="h6" sx={{ mb: 2 }}>
          Tipos de usuarios2
        </Typography>
        <Stack
          direction="row"
          spacing={2}
        >
          <Box sx={{ display: { xs: 'none', md: 'block' } }}>
            <Search/>
          </Box>
          <Button
            variant="contained"
            size="small"
            color="primary"
            endIcon={<AddIcon />}
            onClick={handleOpen}
            // fullWidth={isSmallScreen}
          >
            Agregar
          </Button>
          <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Text in a modal
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
          </Typography>
        </Box>
      </Modal>
        </Stack>
        
      </Stack>
        
      <Grid size={{ xs: 12, lg: 9 }}>
        <CustomizedDataGrid />
      </Grid>
    </Box>
  );
}
