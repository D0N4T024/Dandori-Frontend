'use client'
import Link from "next/link"
import styles from "./ProductCard.module.css"
import { Button } from "@mui/material"
import SyncAltIcon from '@mui/icons-material/SyncAlt';
import { useRouter } from 'next/navigation'

export default function ProductCard({ product:product }) {
    const router = useRouter()

    const buttonStyle = {
        background:"#F79F1A",
        color: "#000000",
        borderRadius: "25px",
        position: "absolute",
        top: "0",
        right: "0",
        zIndex: "10",
        m: "0.7em",
    }

    return(
        <div className={styles.card} onClick={() => router.push('/')}>
            <div className={styles.imageContainer}>
                <img
                    src={product.image}
                    width="auto"
                    loading="lazy"
                    className={styles.image}
                />
                    <Link href="/search">
                        <Button variant="contained" sx={buttonStyle}>
                            <SyncAltIcon/>
                        </Button> 
                    </Link>
                    
            </div>
            {product.supermarket ? (
                <div className={styles.descriptionContainer}>
                    <div className={styles.upperDescription}>
                        <h4 className={styles.productName1}>{product.name}</h4>
                    </div>
                    <div className={styles.lowerDescription}>
                        <Link 
                            href="/store"
                            className={styles.details}
                            style={{textDecoration: 'underline', whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis"}}
                        >
                            {product.supermarket}
                        </Link>
                        <h6 className={styles.details}>${product.price}</h6>
                    </div>
                </div>
            ) : (

                <div className={styles.descriptionContainer}>
                    <div className={styles.upperDescription}>
                        <h4 className={styles.productName2}>{product.name}</h4>
                        <h6 className={styles.details}>${product.price}</h6>
                    </div>
                </div>
            )}
        </div>
    )
}