"use client"
import { useState } from "react";
import styles from "../Forms.module.css"
import AddBusinessRoundedIcon from '@mui/icons-material/AddBusinessRounded';
import { useForm, useController } from "react-hook-form";
import TextFields from "@/components/TextFields";
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import { showToast } from "@/components/CustomizedSnackbars";
import CircularProgress from '@mui/material/CircularProgress';
import { createSupermarket } from "@/app/services/supermarket";

const GradientButton = styled(Button)({
    background: "linear-gradient(to right, #F71735, #FF9F1C)",
    borderRadius: "10px",
    color: "#000",
    padding: "14px 30px",
    fontSize: "18px",
    textTransform: "none",
    boxShadow: "0 5px 10px rgba(128, 128, 128, 0.4)",
    "&:hover": {
        boxShadow: "0 5px 10px rgba(128, 128, 128, 0.6)",
    },
    "&:active": {
        filter: "brightness(0.9)",
        boxShadow: "0 0 0 rgba(128, 128, 128, 0.4)",
    },
  });

// Se encarga de recibir las props y pasar las referencias y errores
function ControllerField({ control, name, rules, ...props }) {
    const {
      field,
      fieldState: { error },
    } = useController({
      name,
      control,
      rules,
    });
  
    return <TextFields {...field} errorMessage={error?.message} {...props} />;
}

export default function AddSupermarket({ onSupermarketAdded }) {
    const [loading, setLoading] = useState(false);

    const { control, handleSubmit, formState:{errors}, reset } = useForm({
        mode: "onSubmit",         // Valida solo al enviar
        shouldFocusError: false,   // No enfoca en el primer error
      });


    const onSubmit = handleSubmit( async (data) => {
        try {
            setLoading(true);
            const response = await createSupermarket(data); // Call the service
            if (response && response.success) {
                showToast("Supermercado agregado exitosamente", "success", 5000);
                reset(); // Reset the form fields
                if (onSupermarketAdded) {
                    onSupermarketAdded(); //Callback
                }
            } else {
                showToast(response.message || "No se pudo agregar el supermercado", "error", 5000);
            }
        } catch (error) {
            showToast(error.message || "Error al agregar supermercado", "error", 5000);
        } finally {
            setLoading(false);
        }
    })

    return(
        <div className={styles.bodyContainer}>
            <div className={styles.centerContainer}>
                <div className={styles.titleContainer}>
                    <h3 className={styles.titles}>Agregar tienda</h3>
                    <AddBusinessRoundedIcon fontSize="large"/>
                </div>

                <form onSubmit={onSubmit} className={styles.fieldsContainer}>
                    <div className={styles.field}> {/*Name fields*/}
                        <label htmlFor="name"><b>Nombre</b></label>
                        <ControllerField
                            control={control}
                            name="name"
                            type="text"
                            bgcolor="#ffffff"
                            rules={{
                                required: {
                                    value: true,
                                    message: "El nombre es requerido",
                                },
                                minLength: {
                                    value: 3,
                                    message: "El nombre debe tener al menos 3 caracteres",
                                },
                                maxLength: {
                                    value: 50,
                                    message: "El nombre no puede tener más de 50 caracteres",
                                },
                            }}
                        />
                    </div>

                    <div className={styles.field}> {/*Description fields*/}
                        <label htmlFor="description"><b>Descripción</b></label>
                        <ControllerField
                            control={control}
                            name="description"
                            type="text"
                            bgcolor="#ffffff"
                            rules={{
                                required: {
                                    value: true,
                                    message: "La descripción es requerida",
                                },
                                minLength: {
                                    value: 10,
                                    message: "La descripción debe tener al menos 10 caracteres",
                                },
                                maxLength: {
                                    value: 500,
                                    message: "La descripción no puede tener más de 500 caracteres",
                                },
                            }}
                        />
                    </div>

                    <div className={styles.field}> {/*UrlLogo fields*/}
                        <label htmlFor="urlLogo"><b>URL de Logo</b></label>
                        <ControllerField
                            control={control}
                            name="urlLogo"
                            type="text"
                            bgcolor="#ffffff"
                            // icon={LockIcon}
                            rules={{
                                required: {
                                    value: true,
                                    message: "La URL del logo es requerida",
                                },
                                pattern: {
                                    value: /^https:\/\/[a-zA-Z0-9\-._~:\/?#@!$&'()*+,;=%]+$/,
                                    message: "La URL debe ser válida y comenzar con https://",
                                },
                                validate: (value) => {
                                    try {
                                        const url = new URL(value);
                                        return url.protocol === "https:" || "La URL debe comenzar con https://";
                                    } catch (e) {
                                        return "La URL no es válida";
                                    }
                                },
                            }}
                        />
                    </div>

                    <div className={styles.field}> {/*urlPreviewLogo fields*/}
                        <label htmlFor="urlPreviewLogo"><b>URL de Logo de Vista Previa </b></label>
                        <ControllerField
                            control={control}
                            name="urlPreviewLogo"
                            type="text"
                            bgcolor="#ffffff"
                            // icon={LockIcon}
                            rules={{
                                required: {
                                    value: true,
                                    message: "La URL de logo de vista previa es requerida",
                                },
                                pattern: {
                                    value: /^https:\/\/[a-zA-Z0-9\-._~:\/?#@!$&'()*+,;=%]+$/,
                                    message: "La URL debe ser válida y comenzar con https://",
                                },
                                validate: (value) => {
                                    try {
                                        const url = new URL(value);
                                        return url.protocol === "https:" || "La URL debe comenzar con https://";
                                    } catch (e) {
                                        return "La URL no es válida";
                                    }
                                },
                            }}
                        />
                    </div>

                    <div className={styles.field}> {/*urlBusinessLogo field*/}
                        <label htmlFor="urlBusinessLogo"><b>URL de Logo Empresarial</b></label>
                        <ControllerField
                            control={control}
                            name="urlBusinessLogo"
                            type="text"
                            bgcolor="#ffffff"
                            // icon={LockIcon}
                            rules={{
                                required: {
                                    value: true,
                                    message: "La URL de logo empresarial es requerida",
                                },
                                pattern: {
                                    value: /^https:\/\/[a-zA-Z0-9\-._~:\/?#@!$&'()*+,;=%]+$/,
                                    message: "La URL debe ser válida y comenzar con https://",
                                },
                                validate: (value) => {
                                    try {
                                        const url = new URL(value);
                                        return url.protocol === "https:" || "La URL debe comenzar con https://";
                                    } catch (e) {
                                        return "La URL no es válida";
                                    }
                                },
                            }}
                        />
                    </div>

                    <div className={styles.field}> {/*Website field*/}
                        <label htmlFor="website"><b>URL de Sitio Web</b></label>
                        <ControllerField
                            control={control}
                            name="website"
                            type="text"
                            placeholder="https://example.com"
                            bgcolor="#ffffff"
                            rules={{
                                required: {
                                    value: true,
                                    message: "El sitio web es requerido",
                                },
                                pattern: {
                                    value: /^(https?:\/\/(www\.)?[a-zA-Z0-9-]+\.[a-zA-Z]{2,}.*)$/i, // Verifica que sea una URL válida
                                    message: "Debe ser una URL válida",
                                },
                                validate: (value) => {
                                    try {
                                        const url = new URL(value);
                                        return url.protocol === "https:" || "La URL debe comenzar con https://";
                                    } catch (e) {
                                        return "La URL no es válida";
                                    }
                                },
                                // pattern: {
                                //     value: RegExp('((?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\\W]).{6,64})'), // Todos los patrones combinados
                                //     message: "La contraseña debe de contener al menos una minúscula, mayúscula, número y simbolo",
                                // },
                            }}
                        />
                    </div>
                
                    <GradientButton type="submit" disableRipple disabled={loading}>
                        {loading
                            ? <CircularProgress sx={{ color:"#fcbac1" }} size="30px"/>
                            : <h4 className={styles.buttonTitle}>Confirmar</h4>}
                    </GradientButton>
                </form>
            </div>
        </div>
    )
}