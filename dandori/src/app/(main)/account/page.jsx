"use client"
import { useState } from "react";
import styles from "./account.module.css"
import Image from "next/image"
import PersonRoundedIcon from '@mui/icons-material/PersonRounded';
import KeyIcon from '@mui/icons-material/Key';
import { useForm, useController } from "react-hook-form";
import TextFields from "@/components/TextFields";
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';

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

export default function Account() {
    const [isExpanded, setIsExpanded] = useState(false);

    const account = {
        email: "donato.machadosantos@gmail.com",
        password: "Password123&",
        registrationDate: "17/8/2024"
    }

    const { control, register, handleSubmit, formState:{errors}, reset, watch } = useForm({
        mode: "onSubmit",         // Valida solo al enviar
        shouldFocusError: false,   // No enfoca en el primer error
      });

    const toggleView = () => {
        setIsExpanded(!isExpanded);
        reset();
    };

    

    const getUsername = (email) => {
        if (!email) return "usuario";
        const [localPart] = email.split("@");
        const username = localPart.includes(".")
          ? localPart.split(".")[0]
          : localPart;
        return username;
    };


    const onSubmit = handleSubmit((data) => {
        alert("Edicion de cuenta empezado")
        console.log(data);
        reset()
    })

    return(
        <div className={styles.mainContainer}>
            <div className={styles.imageContainer}>
                <Image
                    src="/pruebaRegistro.jpg"
                    alt="Descripción de la imagen"
                    width={200}
                    height={230}
                    priority={true}
                    className={styles.frontImage}
                />
                <div className={styles.frontTitle}>
                    <h2 className={styles.titles}>hola, {getUsername(account.email)}</h2>
                </div>
            </div>
            <div className={styles.bodyContainer}>
                <div className={styles.centerContainer}>
                    <div className={styles.titleContainer}>
                        <PersonRoundedIcon fontSize="large"/>
                        <h3 className={styles.titles}>Editar perfil</h3>
                    </div>

                    <div className={styles.fieldsContainer}>
                        <div className={styles.field}>
                            <label htmlFor="email"><b>Correo electrónico</b></label>
                            <TextFields
                                name="email"
                                type="text"
                                bgcolor="#ffffff"
                                value={account.email}
                                disabled={true}
                            />
                        </div>

                        <div className={styles.field}>
                            <label htmlFor="date"><b>Fecha de Registro</b></label>
                            <TextFields
                                name="date"
                                type="text"
                                bgcolor="#ffffff"
                                value={account.registrationDate}
                                disabled={true}
                            />
                        </div>

                        <button className={styles.passwordToggle} onClick={toggleView}>
                        <KeyIcon sx={{transform:"rotateZ(135deg)"}}/>
                        <p className={styles.links}>Cambiar Contraseña</p>
                        </button>

                        <form onSubmit={onSubmit} className={`${styles.formContainer} ${isExpanded ? styles.expanded : ""}`}>
                            <div className={styles.field}> {/*Password fields*/}
                                <label htmlFor="oldPassword"><b>Contraseña Actual</b></label>
                                <ControllerField
                                    control={control}
                                    name="oldPassword"
                                    type="password"
                                    bgcolor="#ffffff"
                                    // icon={LockIcon}
                                    rules={{
                                        required: {
                                            value: true,
                                            message: "La contraseña es requerida",
                                        },
                                        validate: (value) => value === account.password || "La contraseña no es válida",
                                    }}
                                />
                            </div>

                            <div className={styles.field}> {/*Password fields*/}
                                <label htmlFor="password"><b>Contraseña Nueva</b></label>
                                <ControllerField
                                    control={control}
                                    name="password"
                                    type="password"
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
                                            value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#]).{6,}$/, // Todos los patrones combinados
                                            message: "La contraseña debe de contener al menos una minúscula, mayúscula, número y simbolo",
                                        },
                                        validate: (value) => {
                                            if(value === watch("oldPassword")){
                                                return "La contraseña no puede ser la misma que la anterior"
                                            }
                                        }
                                        
                                    }}
                                />
                            </div>

                            <div className={styles.field}> {/*Password confirmation fields*/}
                                <label htmlFor="passwordConfirmation"><b>Confirmar Nueva Contraseña</b></label>
                                <ControllerField
                                    control={control}
                                    name="passwordConfirmation"
                                    type="password"
                                    bgcolor="#ffffff"
                                    rules={{
                                        required: {
                                            value: true,
                                            message: "Password confirmation is required",
                                        },
                                        validate: (value) => value === watch("password") || "Passwords must match",
                                    }}
                                />
                            </div>
                        
                            <GradientButton type="submit" disableRipple>
                                <h4 className={styles.buttonTitle}>Confirmar</h4>
                            </GradientButton>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}