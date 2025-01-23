import React, { useState, useEffect } from "react";
import { Drawer, List, ListItem, ListItemIcon, ListItemText, IconButton, Typography, Box } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import HowWorks from "./HowWorks"
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import { useTheme } from 'next-themes'
import Link from "next/link";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { setTheme, resolvedTheme } = useTheme()
  
  // Cambia de fondo según el tema (puedes conectar esto con `useTheme` si usas un gestor de temas)
  const backgroundColor = "#2C3E50"; // Oscuro para modo dark
  const textColor = "white";

  return (
    <div>
      <IconButton
        onClick={() => setIsOpen(true)}
        color="inherit"
        aria-label="open drawer"
        edge="end"
      >
        <MenuIcon />
      </IconButton>

      
      <Drawer
        anchor="left"
        open={isOpen}
        onClose={() => setIsOpen(false)} // Cierra el sidebar al hacer clic fuera
        PaperProps={{
          sx: {
            width: 300,
            backgroundColor: backgroundColor,
            color: textColor,
          },
        }}
      >
        {/* Encabezado del Sidebar */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            p: 2,
          }}
        >
          <Typography variant="h6" sx={{ fontWeight: "bold" }}>
            Menu
          </Typography>
          <IconButton onClick={() => setIsOpen(false)} sx={{ color: textColor }}>
            <CloseIcon />
          </IconButton>
        </Box>

        {/* Lista de opciones */}
        <List>
          <ListItem
            button
            onClick={() => {
              setTheme(resolvedTheme === "dark" ? 'light' : "dark")
              setIsOpen(false)}
            }
          >
            <ListItemIcon sx={{ color: textColor }}>{resolvedTheme === "dark" ? <LightModeIcon /> : <DarkModeIcon />}</ListItemIcon>
            <ListItemText primary={resolvedTheme === "dark" ? "Modo claro" : "Modo oscuro"} />
          </ListItem>

          <Link href="/cart">
            <ListItem button>
              <ListItemIcon sx={{ color: textColor }}><ShoppingCartIcon/></ListItemIcon>
              <ListItemText primary="Carrito de presupuestos" />
            </ListItem>
          </Link>
        </List>

        {/* Sección final del sidebar */}
        
        <Box sx={{ mt: "auto", p: 2, borderTop: "1px solid gray" }}>
          <Typography variant="subtitle1" sx={{ fontWeight: "bold", mb: 1 }}>
            ¿Cómo funciona?
          </Typography>
          <Typography variant="body2" sx={{ mb: 1 }}>
            1. Escanea codigos
          </Typography>
          <Typography variant="body2" sx={{ mb: 1 }}>
            2. Compara productos
          </Typography>
          <Typography variant="body2">
            3. Presupuesta carritos
          </Typography>
        </Box>
      </Drawer>
    </div>
  );
};

export default Sidebar;
