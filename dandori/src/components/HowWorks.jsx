'use client'
import styles from "./HowWorks.module.css";
import CustomizableModal from "./CustomizableModal"

const Content = () => {
    return (
        <div className={styles.mainContainer}>
            <h4 className={styles.title}>¿Cómo funciona?</h4>
            <div className={styles.content}>
                <div className={styles.steps}>
                    <img
                        src="/pruebaRegistro.jpg"
                        // src="/Dandori Icon.svg"
                        alt="Descripción de la imagen"
                        width={200}
                        height={200}
                        priority={true}
                    />
                    <h3 className={styles.firstStep}>Escanear</h3>
                    <h5 className={styles.description}>Escanea codigos de barras de productos alimenticios</h5>
                </div>
                <div className={styles.steps}>
                    <img
                        // src="/pruebaRegistro.jpg"
                        src="/Dandori Icon.svg"
                        // alt="Descripción de la imagen"
                        width={200}
                        height={200}
                        priority={true}
                    />
                    <h3 className={styles.secondStep}>Comparar</h3>
                    <h5 className={styles.description}>Compara precios, valores nutricionales y tendencia de costos</h5>
                </div>
                <div className={styles.steps}>
                    <img
                        src="/pruebaRegistro.jpg"
                        // src="/Dandori Icon.svg"
                        alt="Descripción de la imagen"
                        width={200}
                        height={200}
                        priority={true}
                    />
                    <h3 className={styles.thirdStep}>Presupuestar</h3>
                    <h5 className={styles.description}>Haz presupuesto de compras de diferentes tiendas</h5>
                </div>
            </div>
        </div>
    )
}

const TextTag = ({ design:design, text:text}) => {
    if (design === "slogan") {
        return(
            <h2
                style={{ fontSize: '40px', fontFamily: 'var(--font-poppins)', color:'#F71735' }}
            >{text}</h2>
        )
    } else if (design === "step1" || design === "step2" || design === "step3") {
        return(
            <h2
                style={{fontSize: '40px', fontFamily: 'var(--font-poppins)'}}
            >{text}</h2>
        )
    } else {
        return(
            <p
                style={{ color:'#F71735', fontSize: '1em', fontWeight: '300' }}
            >{text}</p>
        )
    }
}

function HowWorks ({ design:design, text:text }) {
    return (
        <CustomizableModal
            textTag={() => <TextTag design={design} text={text} />}
            content={() => <Content />}
        />
    )
}

export default HowWorks;