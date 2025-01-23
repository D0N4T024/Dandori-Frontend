"use client"
import { useState } from "react";
import styles from "../Forms.module.css"
import { useForm, useController } from "react-hook-form";
import TextFields from "@/components/TextFields";
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import { showToast } from "@/components/CustomizedSnackbars";
import CircularProgress from '@mui/material/CircularProgress';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import { updateUserType } from "@/app/services/userType";

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
      rules
    });
  
    return <TextFields {...field} errorMessage={error?.message} {...props} />;
}

export default function UpdateUserType({ onUserTypeUpdated, row }) {
    const [loading, setLoading] = useState(false);

    const { control, register, handleSubmit, formState:{errors}, reset,  } = useForm({
        mode: "onSubmit",         // Valida solo al enviar
        shouldFocusError: false,   // No enfoca en el primer error
        defaultValues: row,
      });


    const onSubmit = handleSubmit( async (data) => {
        try {
            setLoading(true);
            const response = await updateUserType(row.id, data);
            if (response && response.success) {
                showToast("Tipo de usuario editado exitosamente", "success", 5000);
                reset();
                if (onUserTypeUpdated) {
                    onUserTypeUpdated() //Callback
                }
            } else {
                showToast(response.message || "No se pudo editar el tipo de usuario", "error", 5000);
            }
        } catch (error) {
            showToast(error.message || "Error al editar tipo de usuario", "error", 5000);
        } finally {
            setLoading(false);
        }
    })

    return(
        <div className={styles.bodyContainer}>
            <div className={styles.centerContainer}>
                <div className={styles.titleContainer}>
                    <h3 className={styles.titles}>Editar tipo de usuario</h3>
                    <EditRoundedIcon fontSize="medium"/>
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