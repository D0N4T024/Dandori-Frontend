'use client'
import { useState, useEffect, Suspense, lazy } from 'react'
import styles from './store.module.css'
const LazyCarousel = lazy(() => import('@/components/Carousel'))
import { getSupermarketById } from '@/app/services/supermarket'
import { getProductBySupermarket } from '@/app/services/product'
import Loading from '../../loading'
import { useRouter } from 'next/navigation'
import { Skeleton } from '@mui/material'

export default function Store({ params }) {

    const [supermarket, setSupermarket] = useState(null);
    const [categories, setCategories] = useState([]);
    const [loadingSupermarket, setLoadingSupermarket] = useState(true);
    const [loadingCategories, setLoadingCategories] = useState(true);
    const [errorSupermarket, setErrorSupermarket] = useState(null);
    const [errorCategories, setErrorCategories] = useState(null);

    if (loadingCategories == false) {
        console.log("Cargo producto: ", categories[0].products[0].name)
    }

    const router = useRouter();

    useEffect(() => {
        // Fetch supermarket details
        const fetchSupermarketDetails = async () => {
            try {
                setLoadingSupermarket(true);
                const response = await getSupermarketById(params.StoreId);

                if (response.success && response.data) {
                    setSupermarket(response.data);
                    console.log("fetchSupermarketDetails: ", response.data)
                } else {
                    setErrorSupermarket('Supermarket details not found.');
                }
            } catch (err) {
                setErrorSupermarket(err.message || 'Failed to fetch supermarket details.');
            } finally {
                setLoadingSupermarket(false);
            }
        };

        // Fetch categories and products
        const fetchCategories = async () => {
            try {
                setLoadingCategories(true);
                const response = await getProductBySupermarket(params.StoreId);

                if (response.success && response.data.length > 0) {
                    // const supermarketData = response.data[0];
                    //Verifico si llegaron los datos
                    console.log("probanndo: ", response.data[0].categories)
                    await waitForCategories(response.data[0].categories);

                    setCategories(response.data[0].categories);
                    console.log("fetchCategories: ", response.data[0].categories)
                } else {
                    setErrorCategories('Categories and products not found.');
                }
            } catch (err) {
                setErrorCategories(err.message || 'Failed to fetch categories and products.');
            } finally {
                setLoadingCategories(false);
            }
        };

        fetchSupermarketDetails();
        fetchCategories();
    }, [params.storeId]);

    const waitForCategories = async (categories) => {
        while (!categories[0].products[0].name || categories[0].products.length === 0) {
            console.log("Waiting for categories...");
            await new Promise((resolve) => setTimeout(resolve, 100)); // Esperar 100 ms
        }
    };

    const LoadingSkeleton = () => {
        return(
            <div style={{ width: "100%", paddingInline: "2em"}}>
                <Skeleton variant="text" sx={{ fontSize: '2rem', width: "200px" }} />
                <Skeleton variant="rounded" height={280}/>
            </div>
        )
    }

    if (loadingSupermarket) {
        return <Loading />;
    }

    if (errorSupermarket || !supermarket) {
        router.push("/404")
    }

    return(
        <div className={styles.mainContainer}>
            <img
                src={supermarket.urlBusinessLogo}
                className={styles.frontImage}
            />
            <div className={styles.detailsContainer}>
                <img
                    src={supermarket.urlLogo}
                    alt={supermarket.name}
                    width="30%"
                    className={styles.logo}
                    />
                <div className={styles.textContainer}>
                    <h3>Supermercado {supermarket.name}</h3>
                    <p style={{ fontWeight: "300" }}>{supermarket.description}</p>
                </div>
            </div>

            { loadingCategories ?
            (
                <div className={styles.categories}>
                    <LoadingSkeleton />
                    <LoadingSkeleton />
                </div>
            ) :
            (<div className={styles.categories}>
                { categories.map((category, index)=>(
                    <Suspense
                        key={index}
                        fallback={<LoadingSkeleton />}
                    >
                        <div key={index}>
                            <h3 className={styles.categoriesTitles}>{category.categoryName}</h3>
                            <LazyCarousel products={category.products} carouselId={`carousel-${index}`} />
                        </div>
                    </Suspense>
                    
                ))}
            </div>)}
        </div>
    )
}