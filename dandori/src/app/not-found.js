import Image from "next/image"
import Link from "next/link";
import styles from "./notFound.module.css"

export default function NotFound() {
    return <section className={styles.mainContainer}>
        <div className={styles.imageContainer}>
            <h1 className={styles.error}>4</h1>
            <Image
                src="/Dandori Icon.svg"
                alt="Descripción de la imagen"
                width={200}
                height={200}
                priority={true}
                className={styles.logo}
            /> 
            <h1 className={styles.error}>4</h1>
        </div>
        <div className={styles.description}>
            <h1 style={{ fontFamily:"var(--font-poppins)" }}>Error.</h1>
            <h3 style={{ fontFamily:"var(--font-poppins)" }}>Página no encontrada.</h3>
            <Link href="/" style={{textDecoration: 'underline', color:"#F71735"}}><h3>Continuar viendo</h3></Link>
        </div>
    </section>
}