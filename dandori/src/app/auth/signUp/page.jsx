"use client"
import Link from "next/link"
import Image from "next/image"
import stylesAuth from "../stylesAuth.module.css"
import styles from "./signUp.module.css"
import ThemeSwitch from "@/components/ThemeSwitch"
import { useForm, useController } from "react-hook-form";
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import LockIcon from '@mui/icons-material/Lock';
import TextFields from "@/components/TextFields"
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { purple } from '@mui/material/colors';
import CustomizableModal from "@/components/CustomizableModal"
import TermsAndConditions from "@/components/TermsAndConditions"

const GradientButton = styled(Button)({
    background: "linear-gradient(to right, #54DEA7, #FF9F1C)",
    borderRadius: "10px",
    color: "#000",
    padding: "14px 30px",
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

function SignUp(){
    const { control, register, handleSubmit, formState:{errors}, reset, watch } = useForm();

    const onSubmit = handleSubmit((data) => {
        alert("Registro exitoso")
        console.log(data);
        reset
    })

    return <div className={stylesAuth.mainContainer}>
        <div className={`${styles.imageContainer} ${stylesAuth.responsiveContainer}`}>
            <Link href='/'><p className={styles.title}>DANDORI</p></Link>
            <Link href='/' className={styles.prueba3}><p className={styles.title2}>REGISTRATE EN LA APLICACIÓN</p></Link>
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
                    <h1 className={stylesAuth.formTittle}>Registrate</h1>
                </div>

                <form onSubmit={onSubmit} className={stylesAuth.form}>
                    <div className={stylesAuth.field}>
                        <label htmlFor="email"><b>Correo electrónico</b></label>
                        <ControllerField
                            control={control}
                            name="email"
                            type="text"
                            placeholder="name@gmail.com"
                            bgcolor="#D6FCE6"
                            icon={MailOutlineIcon}
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
                            bgcolor="#D6FCE6"
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
                            bgcolor="#D6FCE6"
                            icon={LockIcon}
                            rules={{
                                required: {
                                    value: true,
                                    message: "La confirmación de contraseña es requerida",
                                },
                                validate: (value) => value === watch("password") || "Las contraseñas deben coincidir",
                            }}
                        />
                    </div>
                    <GradientButton type="submit" disableRipple>
                        <h4 className={stylesAuth.buttonTitle}>Registrarse</h4>
                    </GradientButton>

                </form>
                <p className={stylesAuth.termsAndConditionsDescription}>Al continuar, aceptas los <button className={styles.links}><CustomizableModal textTag={() => {return <p>Términos y condiciones</p>}} content={TermsAndConditions}/></button></p>
                <p className={stylesAuth.actionDescription}>Ya tienes una cuenta? <Link href="/auth/signIn" className={styles.links}>Inicia Sesión</Link></p>
            </div>
        </div>
    </div>
}

export default SignUp;