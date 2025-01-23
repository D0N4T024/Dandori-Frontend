'use client'
import styles from "./SignInButton.module.css"
import Button from '@mui/material/Button';
import LoginIcon from '@mui/icons-material/Login';
import Link from 'next/link';

import * as React from 'react';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import IconButton from '@mui/material/IconButton';
import Settings from '@mui/icons-material/Settings';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import Logout from '@mui/icons-material/Logout';
import { signout } from "@/app/services/auth";
import { showToast } from "./CustomizedSnackbars";
import { useRouter } from "next/navigation";


export default function SignInButton(){
    const [logged, setLogged] = React.useState(false);
    const [user, setUser] = React.useState(null);
    const [isAdmin, setIsAdmin] = React.useState(false);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const router = useRouter();

    React.useEffect(() => {
        // Solo se ejecuta en el cliente
        const userData = localStorage.getItem("user");
        if (userData) {
            try {
                const parsedUser = JSON.parse(userData);
                setUser(parsedUser?.user || "");
                
                
                // Verifica si el token ha expirado
                const now = Math.floor(Date.now() / 1000);
                if (parsedUser.exp < now) {
                    setLogged(false);
                }
                else if (parsedUser?.user) {
                    setLogged(true);
                    setIsAdmin(parsedUser?.isAdmin || false);
                } else {
                    setLogged(false);
                }
            } catch (error) {
                console.error("Error parsing user data from localStorage:", error);
                setUser("");
            }
          } else {
                setUser("");
          }
    }, []);

    console.log("Prueba1: ", typeof(user))

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const handleChangeToAdmin = () => {
        localStorage.setItem("theme", "light")
        setAnchorEl(null);
    };

    const handleSignOut = async () => {
        try {
            const response = await signout();
            if (response.success) {
                localStorage.removeItem('user');
                localStorage.removeItem('cart')
                showToast('Sesión cerrada exitosamente.', 'success');
                setLogged(false);
                router.refresh();
            } else {
                showToast(response.message || 'Error al cerrar sesión.', 'error', 5000);
            }
        } catch (error) {
            showToast(error.message, 'error', 5000);
        }
    };

    return (
        <div>
            {logged ? (
                <React.Fragment>
                    <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
                        <IconButton
                            onClick={handleClick}
                            size="small"
                            sx={{ ml: 2}}
                            aria-controls={open ? 'account-menu' : undefined}
                            aria-haspopup="true"
                            aria-expanded={open ? 'true' : undefined}
                        >
                            <Avatar sx={{ width: 32, height: 32, bgcolor: "#ed2040" }}>
                                {user ? user[0]?.toUpperCase() || "?" : "?"}
                            </Avatar>
                            {/* <Avatar sx={{ width: 32, height: 32, background: 'rgb(255,159,28)', background: 'linear-gradient(180deg, rgba(255,159,28,1) 35%, rgba(247,23,53,1) 100%)' }}>D</Avatar> */}
                        </IconButton>
                    </Box>
                    <Menu
                        anchorEl={anchorEl}
                        id="account-menu"
                        open={open}
                        onClose={handleClose}
                        onClick={handleClose}
                        slotProps={{
                        paper: {
                            elevation: 0,
                            sx: {
                            overflow: 'visible',
                            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                            mt: 1.5,
                            '& .MuiAvatar-root': {
                                width: 32,
                                height: 32,
                                ml: -0.5,
                                mr: 1,
                            },
                            '&::before': {
                                content: '""',
                                display: 'block',
                                position: 'absolute',
                                top: 0,
                                right: 14,
                                width: 10,
                                height: 10,
                                bgcolor: 'background.paper',
                                transform: 'translateY(-50%) rotate(45deg)',
                                zIndex: 0,
                            },
                            },
                        },
                        }}
                        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                    >
                        <Link href="/account">
                            <MenuItem onClick={handleClose}>
                                <ListItemIcon>
                                    <Settings fontSize="small" />
                                </ListItemIcon>
                                Cuenta
                            </MenuItem>
                        </Link>
                        { isAdmin &&
                            <Link href="/admin/store">
                                <MenuItem onClick={handleChangeToAdmin}>
                                    <ListItemIcon>
                                        <AdminPanelSettingsIcon fontSize="small" />
                                    </ListItemIcon>
                                    Administración
                                </MenuItem>
                            </Link>
                        }
                        <MenuItem onClick={handleSignOut}>
                            <ListItemIcon>
                                <Logout fontSize="small" />
                            </ListItemIcon>
                            Cerrar Sesion
                        </MenuItem>
                    </Menu>
                </React.Fragment>
            ) : (
                <div>
                    <Link href='/auth/signIn' className={styles.largeSignInButton}>
                        <Button variant="contained" endIcon={<LoginIcon/>} sx={{ background:"#54DEA7", whiteSpace: "nowrap", color: "#000000", borderRadius: "25px", fontFamily: "var(--font-poppins)", fontSize: "14px", fontWeight: "600"}}>
                            Iniciar Sesion
                        </Button>
                    </Link>
                    <Link href='/auth/signIn'>
                        <button className={styles.button}>
                            <LoginIcon/>
                        </button>
                    </Link>
                </div>
            )}
        </div>
    )
}