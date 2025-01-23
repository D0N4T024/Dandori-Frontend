"use client"
import { useState, useEffect } from "react";
import styles from "../Forms.module.css"
import PersonAddAltRoundedIcon from '@mui/icons-material/PersonAddAltRounded';
import { useForm, useController } from "react-hook-form";
import TextFields from "@/components/TextFields";
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import { showToast } from "@/components/CustomizedSnackbars";
import CircularProgress from '@mui/material/CircularProgress';
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { getAllUserTypes } from "@/app/services/userType";
import { createUser } from "@/app/services/user";

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

export default function AddUser({ onUserAdded }) {
    const [loading, setLoading] = useState(false);
    const [userTypes, setUserTypes] = useState([]);
    const [userTypesLoading, setUserTypesLoading] = useState(true);

    const { control, register, handleSubmit, formState:{errors}, reset } = useForm({
        mode: "onSubmit",         // Valida solo al enviar
        shouldFocusError: false,   // No enfoca en el primer error
      });

    useEffect(() => {
        const fetchUserTypes = async () => {
            try {
            const response = await getAllUserTypes();
            if (response.success) {
                setUserTypes(response.data);
            } else {
                showToast("No se pudieron cargar los tipos de usuario", "error");
            }
            } catch (error) {
            showToast(error.message || "Error al cargar los tipos de usuario", "error");
            } finally {
            setUserTypesLoading(false);
            }
        };

        fetchUserTypes();
    }, []);

    const onSubmit = handleSubmit( async (data) => {
        try {
            setLoading(true);
            const response = await createUser(data); // Call the service
            if (response && response.success) {
                showToast("Usuario agregado exitosamente", "success", 5000);
                reset();
                if (onUserAdded) {
                    onUserAdded(); //Callback
                }
            } else {
                showToast(response.message || "No se pudo agregar el usuario", "error", 5000);
            }
        } catch (error) {
            showToast(error.message || "Error al agregar usuario", "error", 5000);
        } finally {
            setLoading(false);
        }
    })

    if (userTypesLoading) {
        return (
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
                <CircularProgress />
            </div>
        );
    }

    return(
        <div className={styles.bodyContainer}>
            <div className={styles.centerContainer}>
                <div className={styles.titleContainer}>
                    <h3 className={styles.titles}>Agregar usuario</h3>
                    <PersonAddAltRoundedIcon fontSize="large"/>
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
                        <label htmlFor="email"><b>Correo electrónico                        </b></label>
                        <ControllerField
                            control={control}
                            name="email"
                            type="text"
                            placeholder="name@gmail.com"
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

                    <div className={styles.field}> {/*Password fields*/}
                        <label htmlFor="password"><b>Contraseña</b></label>
                        <ControllerField
                            control={control}
                            name="password"
                            type="password"
                            placeholder="Password123#"
                            bgcolor="#ffffff"
                            rules={{
                                required: {
                                    value: true,
                                    message: "La contraseña es requerida",
                                },
                                minLength: {
                                    value: 6,
                                    message: "La contraseña tiene que tener más de 6 dígitos",
                                },
                                pattern: {
                                    value: RegExp('((?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\\W]).{6,64})'), // Todos los patrones combinados
                                    message: "La contraseña debe de contener al menos una minúscula, mayúscula, número y simbolo",
                                },
                            }}
                        />
                    </div>

                    <div className={styles.field}>
                        <label htmlFor="userTypeId">
                            <b>Tipo de usuario</b>
                        </label>
                        <Select
                            {...register("userTypeId", {
                            required: "El tipo de usuario es requerido", // Mensaje de error
                            })}
                            fullWidth
                            defaultValue=""
                            error={!!errors.userTypeId}
                            sx={{
                                borderRadius: "10px",
                                "& .MuiInputBase-root": {
                                    backgroundColor: "#ffffff",
                                    borderRadius: "25px",
                                  "& fieldset": {
                                    border: errors.userTypeId ? "1px solid red" : "1px solid #E0E0E0",
                                    
                                  borderRadius: "25px",
                                  },
                                  "&.Mui-focused fieldset": {
                                        borderColor: errors.userTypeId ? "red" : "#E0E0E0", // Quita el color azul
                                    },
                                  "&:hover fieldset": {
                                    borderColor: errors.userTypeId ? "red" : "#A8A8A8",
                                  },
                                  "&.Mui-focused fieldset": {
                                    borderColor: errors.userTypeId ? "red" : "#A8A8A8",
                                  },
                                },
                                "& .MuiInputBase-input": {
                                    color: "#0F1111",
                                    backgroundColor: "#ffffff",
                                    borderRadius: "10px"
                                },
                              }}
                        >
                            <MenuItem value="" disabled>
                                Seleccione un tipo de usuario
                            </MenuItem>
                            {userTypes.map((type) => (
                                <MenuItem key={type._id} value={type._id}>
                                    {type.name}
                                </MenuItem>
                            ))}
                        </Select>
                        {/* Mensaje de error */}
                        {errors.userTypeId && (
                            <h6 style={{ color: "#d32f52", fontSize: "0.75rem", fontWeight: "400", marginLeft: "14px", marginTop: "-0.7em" }}>
                            {errors.userTypeId.message}
                            </h6>
                        )}
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