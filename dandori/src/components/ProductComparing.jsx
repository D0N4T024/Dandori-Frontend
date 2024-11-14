"use client"
import { useState} from "react"
import CustomizableModal from "./CustomizableModal";
import Button from "@mui/material/Button";
import SyncAltIcon from '@mui/icons-material/SyncAlt';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import AdjustableDropdown from "@/components/AdjustableDropdown"
import styles from "./ProductComparing.module.css"

function Content({ data:data }) {
    const buttonStyle = {
        background:"#F79F1A",
        color: "#000000",
        borderRadius: "25px",
        m: "0.7em",
    }
    console.log(data)


    const [quantity, setQuantity] = useState();
    const options = [...Array(99).keys()].map(i => i + 1);

    return (
        <div className={styles.mainContainer}>
            <div className={styles.leftProduct}>
                <div className={styles.titleContainer}>
                    <h4>{data.name}</h4>
                    <img
                        width="50px"
                        height="50px"
                        src={data.supermarketLogo}
                        alt={data.name}
                        className={styles.logoSupermarket}
                    />

                </div>
                <img src={data.image}/>
                <div className={styles.priceAndOptions}>
                    <p style={{fontWeight: "300"}}>Precio: ${data.tendency.at(-1).cost}</p>
                    <div>
                        <AdjustableDropdown value={quantity ? quantity : 1} options={options}/>
                        <Button variant="contained" sx={buttonStyle}>
                            <ShoppingCartOutlinedIcon/>
                        </Button>
                    </div>
                </div>
                <div>
                    datos nutricionales
                </div>
                <img src="https://i.pinimg.com/originals/57/73/33/5773334ef57bc97b2c0836b2183ead9b.png"/>
                <img src="https://i.pinimg.com/originals/57/73/33/5773334ef57bc97b2c0836b2183ead9b.png"/>
                <img src="https://i.pinimg.com/originals/57/73/33/5773334ef57bc97b2c0836b2183ead9b.png"/>

            </div>
            <SyncAltIcon className={styles.comparationIcon}/>
            <div className={styles.rightProduct}>
                <div className={styles.titleContainer}>
                    <h4>Barra proteica - Natural Valley</h4>
                    <img
                        width="50px"
                        height="50px"
                        src={data.supermarketLogo}
                        
                        className={styles.logoSupermarket}
                    />

                </div>
                <img src="https://i.pinimg.com/originals/57/73/33/5773334ef57bc97b2c0836b2183ead9b.png"/>
                <div>
                    <p>Precio: $4,565</p>
                    <div>
                        <div>Dropdown</div>
                        <div>Carrito</div>
                    </div>
                </div>
                <div>
                    datos nutricionales
                </div>
            </div>
        </div>
    )
}

function ProductComparing({ product:product }) {

    return (
        <CustomizableModal
            content={Content}
            textTag={() => {return(
                <Button variant="contained" className={"font-semibold"} sx={{background:"#f71735", color: "#000000", borderRadius: "25px", fontFamily: "var(--font-poppins)", fontSize: "12px", padding: "10px"}}>
                    Comparar
                </Button>)}}
            data={product}
            
        />
    )
}

export default ProductComparing;