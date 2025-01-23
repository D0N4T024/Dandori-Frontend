"use client";
import { useForm, useController } from "react-hook-form";
import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { verifyVerificationCode } from "@/app/services/auth";
import { showToast } from "@/components/CustomizedSnackbars";
import Loading from "@/app/(main)/loading"
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import TextFields from "@/components/TextFields";
import stylesAuth from "@/app/auth/stylesAuth.module.css";
import styles from "./verificateCode.module.css"
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import LockIcon from "@mui/icons-material/Lock";
import { useRouter } from "next/navigation";

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

function VerifyCodeContent() {
  const { control, handleSubmit, reset, setValue } = useForm();
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email");

  // Prellenar el campo de correo si se pasó como parámetro
  useEffect(() => {
    if (email) {
      setValue("email", email);
    }
  }, [email, setValue]);
  

  const onSubmit = handleSubmit(async (data) => {
    const { email, code } = data;

    try {
      const response = await verifyVerificationCode( email, code );
      if (response.success) {
        showToast("Cuenta registrada correctamente", "success");
        router.push("/auth/signIn");
      } else {
        showToast(response.message, "error");
      }
    } catch (error) {
      showToast("Ocurrió un error al verificar el código", "error");
      console.error(error);
    } finally {
      reset();
    }
  });

  return (
    <div className={stylesAuth.mainContainer} style={{display:"flex", justifyContent:"center"}}>
      <div className={stylesAuth.CenterContainer} style={{maxWidth:"600px"}}>
        <h1 className={stylesAuth.formTittle}>Verificar Código</h1>
        <div className={styles.fieldsContainer}>
            <form onSubmit={onSubmit} className={stylesAuth.form}>
                <div className={stylesAuth.field}>
                    <label htmlFor="email"><b>Correo electrónico</b></label>
                    <ControllerField
                    control={control}
                    name="email"
                    type="text"
                    placeholder="name@gmail.com"
                    bgcolor="#FFFFFF"
                    icon={MailOutlineIcon}
                    disabled={true}
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

                <div className={stylesAuth.field}>
                    <label htmlFor="code"><b>Código de Verificación</b></label>
                    <ControllerField
                    control={control}
                    name="code"
                    type="text"
                    placeholder="123456"
                    bgcolor="#FFFFFF"
                    icon={LockIcon}
                    rules={{
                        required: {
                            value: true,
                            message: "El código de verificación es requerido",
                        },
                        minLength: {
                            value: 6,
                            message: "El código debe ser de minimo 6 dígitos",
                        },
                        maxLength: {
                            value: 60,
                            message: "El código debe ser de maximo 60 dígitos",
                        },
                    }}
                    />
                </div>

                <GradientButton type="submit" disableRipple>
                    <h4 className={stylesAuth.buttonTitle}>Confirmar</h4>
                </GradientButton>
            </form>
        </div>
        
      </div>
    </div>
  );
}

export default function VerifyCode() {
  return (
      <Suspense fallback={<Loading />}>
        <VerifyCodeContent />
      </Suspense>
    );
  }