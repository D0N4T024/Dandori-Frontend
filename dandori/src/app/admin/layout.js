import CommonLayout from "../layout";
import Toast from "@/components/CustomizedSnackbars";
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import AppNavbar from './components/AppNavbar';
import SideMenu from './components/SideMenu';

export const metadata = {
  title: "Dandori - Autentificacion",
  description: "Dandori - Autentificacion",
};

export default function AuthLayout({ children }) {
  return (
    <CommonLayout>
      {<Box sx={{ display: 'flex' }}>
        <SideMenu />
        <AppNavbar />
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            overflow: 'auto',
          }}
        >
          <Stack
            spacing={2}
            sx={{
              alignItems: 'center',
              mx: 3,
              mt: { xs: 8, md: 0 },
            }}
          >
            {/* <Header /> */}
            {children}
          </Stack>
        </Box>
      </Box>}
      <Toast/>
    </CommonLayout>
  );
}