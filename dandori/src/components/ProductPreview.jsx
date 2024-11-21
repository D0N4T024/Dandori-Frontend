'use client'
import styles from "./ProductPreview.module.css"

export default function ProductPreview({ data:data, onSelection }) {
    return(
        <div className={styles.mainContainer} onClick={() => onSelection(data)}>
            <img 
                src={data.image}
                width="90px"
                height="90px"
                className={styles.productImage}/>
            <div className={styles.details}>
                <h4 className={styles.productName}>{data.name}</h4>
                <div className={styles.subDetails}>
                    <img
                        width="50px"
                        height="50px"
                        src={data.supermarketLogo}
                        alt={data.name}
                        className={styles.supermarketLogo}
                    />
                    <h5 className={styles.price}>${data.price}</h5>
                </div>
            </div>
        </div>
    )
}