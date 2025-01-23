'use client'
import styles from "./HowWorks.module.css";
import CustomizableModal from "./CustomizableModal"
import { Avatar } from "@mui/material";

const Content = () => {
    return (
        <div className={styles.mainContainer}>
            <h4 className={styles.title}>¿Cómo funciona?</h4>
            <div className={styles.content}>
                <div className={styles.steps}>
                    <img
                        src="https://cdn-icons-gif.flaticon.com/12147/12147208.gif"
                        data-src="https://cdn-icons-gif.flaticon.com/12147/12147208.gif"
                        alt="BarcodeScanning"
                        title="Escanear Codigo"
                        width={200}
                        height={200}
                        priority={true}
                        class="lzy lazyload--done"
                        srcset="https://cdn-icons-gif.flaticon.com/12147/12147208.gif 4x"/>
                    <h3 className={styles.firstStep}>Escanear</h3>
                    <h5 className={styles.description}>Escanea codigos de barras de productos alimenticios</h5>
                </div>
                <div className={styles.steps}>
                    <img 
                        src="https://cdn-icons-gif.flaticon.com/16767/16767023.gif"
                        data-src="https://cdn-icons-gif.flaticon.com/16767/16767023.gif"
                        alt="Comparing"
                        title="Comparar Comidas"
                        width={200}
                        height={200}
                        priority={true}
                        class="lzy lazyload--done"
                        srcset="https://cdn-icons-gif.flaticon.com/16767/16767023.gif 4x"/>

                    <h3 className={styles.secondStep}>Comparar</h3>
                    <h5 className={styles.description}>Compara precios, valores nutricionales y tendencia de costos</h5>
                </div>
                <div className={styles.steps}>
                    <img src="https://cdn-icons-gif.flaticon.com/15576/15576170.gif"
                        data-src="https://cdn-icons-gif.flaticon.com/15576/15576170.gif"
                        alt="Budget"
                        title="Presupuestar Compras"
                        width={200}
                        height={200}
                        priority={true}
                        class="lzy lazyload--done"
                        srcset="https://cdn-icons-gif.flaticon.com/15576/15576170.gif 4x"/>
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
    } else if (design === "steps") {
        return(
            <div className={styles.stepsDesign}>
                <h2 style={{textAlign: "center"}}>Cómo funciona?</h2>
                <div className={styles.steps2}>
                    <div className={styles.step2}>
                        {/* <h2><button><HowWorks design="slogan" text="Simplificando"/></button>&nbsp;tus decisiones de compras de supermercado</h2> */}
                        <Avatar sx={{ bgcolor:"#54DEA7", color:"#011627" }}>1</Avatar>
                        <h5>Escanear</h5>
                    </div>
                    <div className={styles.step2}>
                        <Avatar sx={{ bgcolor:"#F79F1A", color:"#011627" }}>2</Avatar>
                        <h5>Comparar</h5>
                    </div>
                    <div className={styles.step2}>
                        <Avatar sx={{ bgcolor:"#F71735", color:"#011627", p:"0.1em"}}>3</Avatar>
                        <h5>Presupuestar</h5>
                    </div>
                </div>
            </div>
        )
    } else if (design === "footerMobile") {
        return <button><h6 style={{fontSize: "12px", textAlign: "center", textDecoration: 'underline'}}>{text}</h6></button>
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