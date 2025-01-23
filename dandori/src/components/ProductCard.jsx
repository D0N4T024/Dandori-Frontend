'use client'
import Link from "next/link"
import styles from "./ProductCard.module.css"
import { Button } from "@mui/material"
import SyncAltIcon from '@mui/icons-material/SyncAlt';
import Tooltip from '@mui/material/Tooltip';
import Zoom from '@mui/material/Zoom';
import { useRouter, usePathname } from 'next/navigation'

export default function ProductCard({ product:product }) {
    const router = useRouter()
    const pathname = usePathname()

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
        <div
            className={styles.card}
            onClick={() => product.supermarketName ? 
                router.push(`/store/${product.supermarketId}/${product.productId}`) 
                : router.push(`${pathname}/${product.productId}`)}
        >
            <div className={styles.imageContainer}>
                <img
                    src={product.image}
                    width="auto"
                    loading="lazy"
                    className={styles.image}
                />
                    <Link
                        href={product.supermarketName ? 
                            `/store/${product.supermarketId}/${product.productId}?initial-comparation=true` 
                            : `${pathname}/${product.productId}?initial-comparation=true`}
                        onClick={(e) => e.stopPropagation()}>

                        <Button variant="contained" sx={buttonStyle}>
                            <SyncAltIcon/>
                        </Button> 
                    </Link>
            </div>
            {product.supermarketName ? (
                <div className={styles.descriptionContainer}>
                    <div className={styles.upperDescription}>
                    <Tooltip title={product.name} enterDelay={500} TransitionComponent={Zoom} placement="top" arrow>
                        <h4 className={styles.productName1}>{product.name}</h4>
                    </Tooltip>
                    </div>
                    <div className={styles.lowerDescription}>
                        <Link 
                            href={`/store/${product.supermarketId}`}
                            onClick={(e) => e.stopPropagation()}
                            className={styles.details}
                            style={{textDecoration: 'underline', whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis"}}
                        >
                            {product.supermarketName}
                        </Link>
                        <h6 className={styles.details}>${product.price}</h6>
                    </div>
                </div>
            ) : (
                <div className={styles.descriptionContainer}>
                    <div className={styles.upperDescription}>
                        <Tooltip title={product.name} enterDelay={500} TransitionComponent={Zoom} placement="top" arrow>
                            <h4 className={styles.productName2}>{product.name}</h4>
                        </Tooltip>
                        <h6 className={styles.details}>${product.price}</h6>
                    </div>
                    <div className="swiper-lazy-preloader swiper-lazy-preloader-red"></div>
                </div>
            )}
        </div>
    )
}