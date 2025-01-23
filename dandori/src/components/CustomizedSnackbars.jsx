"use client";
import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

let showToastCallback;

const Toast = () => {
  const [toast, setToast] = useState({
    open: false,
    message: "",
    severity: "info", // success, error, warning, info
    duration: 3000,
  });

  const [isMounted, setIsMounted] = useState(false); // Controlar si el componente está montado
  const [portalContainer, setPortalContainer] = useState(null); // Usar un contenedor dinámico

  // Inicializar el portal solo cuando el componente está montado
  useEffect(() => {
    setIsMounted(true);
    setPortalContainer(document.body); // Asignar el contenedor del portal
  }, []);

  showToastCallback = (message, severity = "info", duration = 3000) => {
    setToast({
      open: true,
      message,
      severity,
      duration,
    });
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      // No cerrar el Snackbar si el motivo es "clickaway"
      return;
    }
    setToast((prev) => ({ ...prev, open: false }));
  };

  if (!isMounted || !portalContainer) {
    // Evitar renderizar el portal en el lado del servidor o antes de que el componente esté montado
    return null;
  }

  return ReactDOM.createPortal(
    <Snackbar
      open={toast.open}
      autoHideDuration={toast.duration}
      onClose={handleClose}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
    >
      <Alert onClose={handleClose} severity={toast.severity} variant="filled">
        {toast.message}
      </Alert>
    </Snackbar>,
    portalContainer
  );
};

export const showToast = (message, severity = "info", duration = 3000) => {
  if (showToastCallback) {
    showToastCallback(message, severity, duration);
  } else {
    console.warn("Toast component is not initialized yet.");
  }
};

export default Toast;