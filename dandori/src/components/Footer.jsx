import Image from "next/image"
import styles from "./Footer.module.css"
import SignInButton from "./SignInButton"
import { Avatar } from "@mui/material"
import Link from "next/link"

export default function Footer() {
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
            </div>
            <div className={styles.rightContainer}>
                <div className={styles.steps}>
                    <div className={styles.step}>
                        <Avatar sx={{ bgcolor:"#54DEA7", color:"#011627" }}>1</Avatar>
                        <h5>Escanear</h5>
                    </div>
                    <div className={styles.step}>
                        <Avatar sx={{ bgcolor:"#F79F1A", color:"#011627" }}>2</Avatar>
                        <h5>Comparar</h5>
                    </div>
                    <div className={styles.step}>
                        <Avatar sx={{ bgcolor:"#F71735", color:"#011627", p:"0.1em"}}>3</Avatar>
                        <h5>Presupuestar</h5>
                    </div>
                </div>
                <div className={styles.promotion}>
                    <h2 style={{textAlign: "center"}}>Aprovecha al maximo la app</h2>
                    <SignInButton/>
                </div>
            </div>
        </div>
        <div className={styles.lowerContainer}>
            <p style={{fontSize: "12px", textAlign: "center"}}>Todos los derechos reservados de copyright por Dandori - 2024</p>
        </div>
    </footer>
}