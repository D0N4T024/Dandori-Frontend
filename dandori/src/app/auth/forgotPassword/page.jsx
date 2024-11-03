"use client"
import Link from "next/link"
import Image from "next/image"
import styles from "./forgotPassword.module.css"
import stylesAuth from "../stylesAuth.module.css"


import ThemeSwitch from "@/components/ThemeSwitch"
import { useForm, useController } from "react-hook-form";
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import LockIcon from '@mui/icons-material/Lock';
import TextFields from "@/components/TextFields"

import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';

const GradientButton = styled(Button)({
    background: "linear-gradient(to right, #F71735, #FF9F1C)", // Gradiente de fondo
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

function SignIn(){
    const { control, register, handleSubmit, formState:{errors}, reset, watch } = useForm();

    const onSubmit = handleSubmit((data) => {
        alert("Recuperacion de cuenta empezado")
        console.log(data);
        reset
    })

    return <div className={stylesAuth.mainContainer}>
        <div className={`${styles.imageContainer} ${stylesAuth.responsiveContainer}`}>
            <Link href='/'><p className={styles.title}>DANDORI</p></Link>
            <Link href='/' className={styles.prueba3}><p className={styles.title2}>OLVIDASTE TU CONTRASEÑA?</p></Link>
        </div>

        <div className={stylesAuth.formContainer}>
            <div className={stylesAuth.themeButton}><ThemeSwitch/></div>

            <div className={stylesAuth.CenterContainer}>
                <div className={stylesAuth.logoContainer}>
                    <Link href="/">
                        <Image
                            src="/Dandori Icon.svg"
                            alt="Descripción de la imagen"
                            width={200}
                            height={200}
                            priority={true}
                            style={{ borderRadius:"100%" }}
                        />
                    </Link>
                    <h1 className={stylesAuth.formTittle}>Recuperar Contraseña</h1>
                </div>
                
                <form onSubmit={onSubmit} className={stylesAuth.form}>
                    <div className={stylesAuth.field}>
                        <label htmlFor="email"><b>Correo electrónico</b></label>
                        <ControllerField
                            control={control}
                            name="email"
                            type="text"
                            bgcolor="#fcbac1"
                            icon={MailOutlineIcon}
                            placeholder="name@gmail.com"
                            rules={{
                                required: {
                                    value: true,
                                    message: "El correo es requerido",
                                },
                                pattern: {
                                    value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                                    message: "Correo inválido",
                                },
                            }}
                        />
                    </div>
                    
                    <div className={stylesAuth.field}> {/*Password fields*/}
                        <label htmlFor="password"><b>Contraseña</b></label>
                        <ControllerField
                            control={control}
                            name="password"
                            type="password"
                            placeholder="Password123#"
                            bgcolor="#fcbac1"
                            icon={LockIcon}
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
                            }}
                        />
                    </div>

                    <div className={stylesAuth.field}> {/*Password confirmation fields*/}
                        <label htmlFor="passwordConfirmation"><b>Confirmar Contraseña</b></label>
                        <ControllerField
                            control={control}
                            name="passwordConfirmation"
                            type="password"
                            placeholder="Password123#"
                            bgcolor="#fcbac1"
                            icon={LockIcon}
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
                        <h4 className={stylesAuth.buttonTitle}>Confirmar</h4>
                    </GradientButton>

                </form>
                <p className={stylesAuth.actionDescription}>Devuelta al <Link href="/auth/signIn" className={styles.links}>Inicio de sesión</Link></p>
            </div>
        </div>
    </div>
}

export default SignIn;