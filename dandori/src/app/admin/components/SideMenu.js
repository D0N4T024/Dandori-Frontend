'use client'
import * as React from 'react';
import { styled } from '@mui/material/styles';
import Avatar from '@mui/material/Avatar';
import MuiDrawer, { drawerClasses } from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import MenuContent from './MenuContent';
import OptionsMenu from './OptionsMenu';
import { showToast } from "@/components/CustomizedSnackbars";
import { signout } from '@/app/services/auth';

const drawerWidth = 240;

const Drawer = styled(MuiDrawer)({
  width: drawerWidth,
  flexShrink: 0,
  boxSizing: 'border-box',
  mt: 10,
  [`& .${drawerClasses.paper}`]: {
    width: drawerWidth,
    boxSizing: 'border-box',
  },
});

export default function SideMenu() {
  const [user, setUser] = React.useState("");

  React.useEffect(() => {
    const userData = localStorage.getItem('user');

    if (userData) {
      const parsedUser = JSON.parse(userData);
      setUser(parsedUser?.user || "");
    }
  }, []);

  const handleSignOut = async () => {
    try {
        const response = await signout();
        if (response.success) {
            localStorage.removeItem('user');
            window.location.href = "/";
        } else {
            showToast(response.message || 'Error al cerrar sesión.', 'error', 5000);
        }
    } catch (error) {
        showToast(error.message, 'error', 5000);
    }
  };

  return (
    <Drawer
      variant="permanent"
      sx={{
        display: { xs: 'none', md: 'block' },
        [`& .${drawerClasses.paper}`]: {
          backgroundColor: 'background.paper',
        },
      }}
    >
      {/* <Box
        sx={{
          display: 'flex',
          mt: 'calc(var(--template-frame-height, 0px) + 4px)',
          p: 1.5,
        }}
      >
        <SelectContent />
      </Box> */}
      <Stack
        direction="row"
        sx={{
          p: 2,
          gap: 1,
          alignItems: 'center',
          borderTop: '1px solid',
          borderColor: 'divider'
        }}
      >
        <Avatar
          sizes="small"
          sx={{ width: 36, height: 36 }}
        >
          {user ? user[0]?.toUpperCase() || "?" : "?"}
        </Avatar>
        <Box sx={{ mr: 'auto', overflowX: 'hidden' }}>
          {/* <Typography variant="body2" sx={{ fontWeight: 500, lineHeight: '16px' }}>
            Riley Carter
          </Typography>
          <Typography variant="caption" sx={{ color: 'text.secondary', whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
            riley@email.comRiley.Carter@gmail.comRiley.Cart er@gmail.com
          </Typography> */}
          <Typography variant="body2" sx={{ fontWeight: 400, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
            {user}
          </Typography>
        </Box>
      </Stack>
      <Divider />
      <MenuContent />
      <Box sx={{ p: 1 }}>
        <Button variant="outlined" fullWidth startIcon={<LogoutRoundedIcon />} onClick={handleSignOut}>
          Cerrar sesión
        </Button>
      </Box>
      {/* <CardAlert /> */}
      
    </Drawer>
  );
}
