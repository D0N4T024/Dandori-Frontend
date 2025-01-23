'use client'
import Link from "next/link"
import styles from "./product.module.css"
import Button from "@mui/material/Button"
import AdjustableDropdown from "@/components/AdjustableDropdown"
import NutritionData from "@/components/NutritionData"
import CostTrendChart from "@/components/CostTrendChart"
import ProductComparing from "@/components/ProductComparing"
import { useState, useEffect } from 'react'
import { getProductDetails, getProductDetailsByScannedCode } from "@/app/services/product"
import { showToast } from "@/components/CustomizedSnackbars";
import { useRouter } from "next/navigation"
import Loading from "@/app/(main)/loading"
import { addProductToShoppingList } from "@/app/services/shoppingList"

export default function Product({ searchParams }) {
    const [quantity, setQuantity] = useState(1);
    const options = [...Array(99).keys()].map(i => i + 1);

    const [productDetails, setProductDetails] = useState(null);
    const [loading, setLoading] = useState(true);

    const router = useRouter();

    const [storeId, setStoreId] = useState(null);
    const [productId, setProductId] = useState(null);
    const [isScannedCode, setIsScannedCode] = useState(false);
    const [isInitialComparation, setIsInitialComparation] = useState(false);

    let params = { ...searchParams };
    const search = params.query;

    useEffect(() => {
        // Check if 'scanned-code' exists and its value is truthy
        if (searchParams && searchParams['scanned-code']) {
            const scannedCodeValue = searchParams['scanned-code'];
            console.log("Scanned Code:", scannedCodeValue);
            

            if (scannedCodeValue === "true") {
                console.log("The scanned-code parameter is true!");
                setIsScannedCode(true);
            } else {
                console.log("The scanned-code parameter exists but is not true.");
            }
        } else {
            console.log("The scanned-code parameter is missing or falsy.");
        }

        // Check if 'initial-comparation' exists and its value is truthy
        if (searchParams && searchParams['initial-comparation']) {
            const initialComparation = searchParams['initial-comparation'];
            console.log("initialComparation:", initialComparation);
            
            if (initialComparation === "true") {
                console.log("The initial-comparation is true!");
                setIsInitialComparation(true);
            } else {
                console.log("The initial-comparation exists but is not true.");
            }
        } else {
            console.log("TThe initial-comparation parameter is missing or falsy.");
        }
        
        // Extract the path segments to get the IDs
        const pathname = router.asPath || window.location.pathname; // Obtener ruta
        const pathSegments = pathname.split('/');
        const extractedProductId = pathSegments[pathSegments.length - 1]; // Obtener 'productId'
        const extractedStoreId = pathSegments[pathSegments.length - 2]; // Obtener 'storeId'

        setStoreId(extractedStoreId);
        setProductId(extractedProductId);
    }, [router, search]);

    useEffect(() => {
        if (!storeId || !productId) return;

        const fetchDetails = async () => {
            setLoading(true);
            try {
                const data = isScannedCode ? await getProductDetailsByScannedCode(productId, storeId) : await getProductDetails(productId, storeId);
                setProductDetails(data.data);
            } catch (err) {
                router.push("/404")
                showToast(err.message || "Failed to fetch product details", "error", 5000);
            } finally {
                setLoading(false);
            }
        };

        fetchDetails();
    }, [storeId, productId]);

    if (loading) {
        return <Loading/>
    }

    if (!productDetails) {
        router.push("/404")
        showToast("No product details available", "error", 5000);
        return <Loading/>
    }

    const handleOptionSelection = (option) => {
        setQuantity(option)
        console.log("Opcion seleccionada: ", option)
    }

    const handleAddProduct = async () => {
        try {
            const userData = localStorage.getItem('user');
            const { userId } = userData ? JSON.parse(userData) : {};
            if (!userId) {
                showToast('Inicio de sesión requerido!', "error", 5000);
            }
            await addProductToShoppingList(userId, productId, storeId, quantity);
            if (quantity == 1) {
                showToast(`${quantity} Producto agregado al carrito`, "success", 5000);
            } else {
                showToast(`${quantity} Productos agregados al carrito`, "success", 5000);
            }
        } catch (err) {
            showToast(err.message, "error", 5000);
        }
    };

    return (
        <div className={styles.mainContainer}>
            <div className={styles.title}>
                <h3>{productDetails.name}</h3>
                <Link href={`/store/${productDetails.supermarketId}`}><p className={styles.supermarketTitle}>{"(Supermercado " + productDetails.supermarket + ")"}</p></Link>
            </div>

            <div className={styles.topInfo}>
                    <img 
                        src={productDetails.image}
                        width="30%"
                        alt={productDetails.name}
                        className={styles.topImage}/>
                <div className={styles.topDescriptionOptions}>
                    <div className={styles.topDescription}>
                        <p style={{ fontWeight: "300" }}>{productDetails.description}</p>
                    </div> 
                    <div className={styles.topOptions}>
                        <div className={styles.topCartOptions}>
                            <AdjustableDropdown value={quantity ? quantity : 1} options={options} onSelection={handleOptionSelection}/>
                            <Button 
                                variant="contained"
                                className={"font-semibold"}
                                sx={{background:"#FF9F1C", color: "#000000", borderRadius: "25px", fontFamily: "var(--font-poppins)", fontSize: "12px", padding: "10px"}}
                                onClick={handleAddProduct}>
                                Agregar al carrito
                            </Button>
                        </div>
                        <ProductComparing product={productDetails} openAtStart={isInitialComparation}/>
                    </div>  
                </div>
            </div>

            <div className={styles.bottomInfo}>
                <div className={styles.nutritionData}>
                    <NutritionData data={productDetails.nutritionalData} />
                </div>
                <div className={styles.CostTrendChart}>
                    <CostTrendChart history={productDetails.history}/>
                </div>
            </div>
        </div>
    )
}