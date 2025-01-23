'use client'
import { useState, useEffect } from "react"
import Image from "next/image"
import styles from "./Footer.module.css"
import SignInButton from "./SignInButton"
import { Avatar } from "@mui/material"
import CustomizableModal from "./CustomizableModal"
import FrequentlyAskedQuestions from "./FrequentlyAskedQuestions"
import HowWorks from "./HowWorks"
import Link from "next/link"

export default function Footer() {
    const [logged, setLogged] = useState(false);
    

    useEffect(() => {
        // Solo se ejecuta en el cliente
        const userData = localStorage.getItem("user");
        if (userData) {

            try {
                const parsedUser = JSON.parse(userData);

                
                // Verifica si el token ha expirado
                const now = Math.floor(Date.now() / 1000);
                if (parsedUser.exp < now) {
                    setLogged(false);
                }
                else if (parsedUser?.user) {
                    setLogged(true);
                } else {
                    setLogged(false);
                }
            } catch (error) {
                console.error("Error parsing user data from localStorage:", error);
            }
        }
    }, []);

    return <footer className={styles.mainContainer}>
        <div className={styles.upperContainer}>
            <div className={styles.leftContainer}>
                <Link href="/">
                    <Image
                        src="/Horizontal Dandori Logo.svg"
                        alt="Descripción de la imagen"
                        width={150}
                        height={150}
                        priority={true}
                        // style={{ borderRadius:"100%" }}
                    />
                </Link>
                <p>Con nuestra plataforma, puedes comparar precios y valores nutricionales de una amplia variedad de productos en diferentes tiendas, asegurándote de tomar decisiones más conscientes, saludables y económicas. </p>
                <div className={styles.additionalOptions}>
                    <button><CustomizableModal textTag={() => {return <h6 style={{fontSize: "12px", textAlign: "center", textDecoration: 'underline'}}>Preguntas Frecuentes (FAQ)</h6>}} content={FrequentlyAskedQuestions}/></button>
                    <div className={styles.howWorks}>
                        <HowWorks design="footerMobile" text="Ver cómo funciona" />
                    </div>
                </div>
                

            </div>
            <div className={styles.rightContainer}>
                <HowWorks design="steps" text="Simplificando" />
                { logged ||
                    <div className={styles.promotion}>
                        <h2 style={{textAlign: "center"}}>Aprovecha al maximo la app</h2>
                        <SignInButton/>
                    </div>
                }
                
            </div>
        </div>
        <div className={styles.lowerContainer}>
            <p style={{fontSize: "12px", textAlign: "center"}}>Todos los derechos reservados de copyright por Dandori - 2024</p>
        </div>
    </footer>
}