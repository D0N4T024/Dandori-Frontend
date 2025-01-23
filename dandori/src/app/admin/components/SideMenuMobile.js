import * as React from 'react';
import PropTypes from 'prop-types';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Drawer, { drawerClasses } from '@mui/material/Drawer';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';

import MenuButton from './MenuButton';
import MenuContent from './MenuContent';
import CardAlert from './CardAlert';
import { showToast } from "@/components/CustomizedSnackbars";
import { signout } from '@/app/services/auth';

function SideMenuMobile({ open, toggleDrawer }) {
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
      anchor="right"
      open={open}
      onClose={toggleDrawer(false)}
      sx={{
        zIndex: (theme) => theme.zIndex.drawer + 1,
        [`& .${drawerClasses.paper}`]: {
          backgroundImage: 'none',
          backgroundColor: 'background.paper',
          overflowX: "hidden"
        },
      }}
    >
      <Stack
        sx={{
          maxWidth: '70dvw',
          height: '100%',
        }}
      >
        <Stack direction="row" sx={{ p: 2, pb: 0, gap: 1 }}>
          <Stack
            direction="row"
            sx={{ gap: 1, alignItems: 'center', flexGrow: 1, p: 1, maxWidth: "65dvw" }}
          >
            <Avatar
              sizes="small"
              sx={{ width: 24, height: 24 }}
            >
              {user ? user[0]?.toUpperCase() || "?" : "?"}
            </Avatar>
            <Typography component="p" variant="h6" sx={{ whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
              {user}
            </Typography>
          </Stack>
        </Stack>
        <Divider />
        <Stack sx={{ flexGrow: 1 }}>
          <MenuContent />
          <Divider />
        </Stack>
        <Stack sx={{ p: 2 }}>
          <Button variant="outlined" fullWidth startIcon={<LogoutRoundedIcon />} onClick={handleSignOut}>
            Cerrar sesión
          </Button>
        </Stack>
      </Stack>
    </Drawer>
  );
}

SideMenuMobile.propTypes = {
  open: PropTypes.bool,
  toggleDrawer: PropTypes.func.isRequired,
};

export default SideMenuMobile;
