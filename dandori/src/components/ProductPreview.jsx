'use client'
import styles from "./ProductPreview.module.css"
import Tooltip from '@mui/material/Tooltip';
import Zoom from '@mui/material/Zoom';

export default function ProductPreview({ data:data, onSelection }) {
    return(
        <div className={styles.mainContainer} onClick={() => onSelection({
            productId: data.productId,
            supermarketId: data.supermarketId
        })}>
            <img
                src={data.image}
                width="90px"
                height="90px"
                className={styles.productImage}/>
            <div className={styles.details}>
                <h4 className={styles.productName}>{data.name}</h4>
                <div className={styles.subDetails}>
                    <h5 className={styles.price}>${data.price}</h5>
                    <Tooltip title={data.supermarketName} enterDelay={500} TransitionComponent={Zoom} arrow>
                        <img
                            width="50px"
                            height="50px"
                            // src={data.supermarketLogo}
                            src={data.supermarketUrlPreviewLogo}
                            alt={data.name}
                            className={styles.supermarketLogo}
                        />
                    </Tooltip>
                </div>
            </div>
        </div>
    )
}