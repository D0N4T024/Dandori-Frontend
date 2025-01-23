"use client"
import Link from "next/link"
import Image from "next/image"
import stylesAuth from "../stylesAuth.module.css"
import styles from "./signIn.module.css"
import ThemeSwitch from "@/components/ThemeSwitch"
import { useState } from "react"
import { useForm, useController } from "react-hook-form";
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import LockIcon from '@mui/icons-material/Lock';
import TextFields from "@/components/TextFields"
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import CustomizableModal from "@/components/CustomizableModal"
import TermsAndConditions from "@/components/TermsAndConditions"
import { showToast } from "@/components/CustomizedSnackbars";
import { signin } from "@/app/services/auth"
import { decodeJwt } from "jose"
import CircularProgress from '@mui/material/CircularProgress';

const GradientButton = styled(Button)(({theme})=>({
    background: "linear-gradient(to right, #F71735, #FF9F1C)", // Gradiente de fondo
    borderRadius: "10px",
    color: "#000",
    padding: "14px 30px",
    textTransform: "none",
    boxShadow: "0 5px 10px rgba(128, 128, 128, 0.4)", // Sombra más pequeña
    // boxShadow: "0 8px 15px rgba(0, 0, 0, 0.1)", // Sombra inicial
    "&:hover": {
        boxShadow: "0 5px 10px rgba(128, 128, 128, 0.6)", // Sombra más pequeña
    },
    "&:active": {
        filter: "brightness(0.9)",
        boxShadow: "0 0 0 rgba(128, 128, 128, 0.4)", // Sombra más pequeña
    },
  }));

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
    const { control, handleSubmit, formState:{errors}, reset } = useForm();
    const [loading, setLoading] = useState(false);

    const onSubmit = handleSubmit(async (data) => {
        try {
            setLoading(true);
            const response = await signin(data.email, data.password);
            if (response.success) {
                const { userId, isAdmin, verified, exp } = decodeJwt(response.token)
                localStorage.setItem(
                    'user', 
                    JSON.stringify({registryDate: response.registryDate, user: response.user, userId: userId, isAdmin: isAdmin, verified: verified, exp: exp})
                )
                reset();
                setLoading(false);
                window.location.href = "/";
            } else {
                setLoading(false);
                showToast(response.message || "Error al iniciar sesión", "error", 5000);
            }
        } catch (error) {
            setLoading(false);
            showToast("Error al iniciar sesión. Verifica tus credenciales.", "error", 5000);
        }
    });

    return <div className={stylesAuth.mainContainer}>
        <div className={`${styles.imageContainer} ${stylesAuth.responsiveContainer}`}>
            <Link href='/'><p className={styles.title}>DANDORI</p></Link>
            <Link href='/' className={styles.prueba3}><p className={styles.title2} >INICIA SESIÓN EN LA APLICACIÓN</p></Link>
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
                    <h1 className={stylesAuth.formTittle}>Iniciar Sesión</h1>
                </div>
                
                <form onSubmit={onSubmit} className={stylesAuth.form}>
                    <div className={stylesAuth.field}>
                        <label htmlFor="email"><b>Correo electrónico</b></label>
                        <ControllerField
                            control={control}
                            name="email"
                            type="text"
                            placeholder="name@gmail.com"
                            bgcolor="#fcbac1"
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
                    <GradientButton type="submit" disableRipple disabled={loading}>
                        {loading
                            ? <CircularProgress sx={{ color:"#fcbac1" }} size="30px"/>
                            : <h4 className={stylesAuth.buttonTitle}>Confirmar</h4>}
                    </GradientButton>

                </form>
                <p className={stylesAuth.termsAndConditionsDescription}>Al continuar, aceptas los <button className={styles.links}><CustomizableModal textTag={() => {return <p>Términos y condiciones</p>}} content={TermsAndConditions}/></button></p>
                <div>
                    <p className={stylesAuth.actionDescription}>Olvidaste tu contraseña? <Link href="/auth/forgotPassword" className={styles.links}>Restablécela</Link></p>
                    <p className={stylesAuth.actionDescription}>No tienes cuenta? <Link href="/auth/signUp" className={styles.links}>Crea una cuenta</Link></p>
                </div>
            </div>
        </div>
    </div>
}

export default SignIn;