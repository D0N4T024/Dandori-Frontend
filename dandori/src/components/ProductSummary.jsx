'use client';  // Asegúrate de que tu componente se renderice en el cliente
import { useState, useEffect } from 'react';
import Image from "next/image";
import styles from "./ProductSummary.module.css";
import DeleteIcon from '@mui/icons-material/Delete';

function ProductSummary ({ supermarkets }) {
    console.log(supermarkets)
    const [selectedSupermarketIndex, setSelectedSupermarketIndex] = useState(0);

    useEffect(() => {
        // Leer el valor de localStorage y actualizar el índice
        const storedIndex = localStorage.getItem('cart');

        if (storedIndex !== null) {
            if (JSON.stringify(storedIndex) == "La Sirena"){
                setSelectedSupermarketIndex(0)
                console.log("Prueba1")
            }
            else if (JSON.stringify(storedIndex) == "Bravo"){
                setSelectedSupermarketIndex(1)
                console.log("Prueba2")

            }
            else if (JSON.stringify(storedIndex) == "Nacional"){
                setSelectedSupermarketIndex(2)
                console.log("Prueba3")

            }
            // setSelectedSupermarketIndex(2)
            // console.log(typeof(storedIndex))
            // console.log(JSON.stringify(storedIndex))

            // const index = parseInt(storedIndex, 10);
            // if (!isNaN(index) && index < supermarkets.length) {
            //     setSelectedSupermarketIndex(index);
            // }
        }
    }, [supermarkets]);

    return (
        <div className={styles.mainCointainer}>
            {supermarkets[selectedSupermarketIndex]?.products.map((product, index) => (
                <div key={index} className={styles.product}>
                    <div className={styles.leftSide}>
                        <Image
                            src="/pruebaRegistro.jpg"
                            alt="Imagen de producto"
                            width={155}
                            height={80}
                            priority={true}
                            style={{borderRadius: '8px'}}
                        />
                        <h4 className={styles.detail}>Un nombre largo para el producto{product.title}</h4>
                    </div>
                    <div className={styles.rightSide}>
                        <Image
                            src="/Horizontal Dandori Logo.svg"
                            alt="Logo de supermercado"
                            width={155}
                            height={80}
                            priority={true}
                            style={{borderRadius: '8px'}}
                        />
                        <h5 className={styles.detail}>{product.calories} calorias c/u</h5>
                        <h5 className={styles.detail}>${product.precio}</h5>
                        <h5 className={styles.detail}>{product.Cantidad}</h5>
                        <button className="iconButton"><DeleteIcon/></button>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default ProductSummary;