'use client'

import Link from "next/link";
import { useState, useEffect } from "react";
import styles from "./Categories.module.css";
import Avatar from '@mui/material/Avatar';
import Skeleton from '@mui/material/Skeleton';
import Button from "@mui/material/Button";
import { getAllSimpleCategories } from "@/app/services/category";

export default function Categories() {
    const [isExpanded, setIsExpanded] = useState(false);

    const toggleView = () => {
        setIsExpanded(!isExpanded);
    };

    const [categories, setCategories] = useState([]);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCategories = async () => {
        try {
            const response = await getAllSimpleCategories();
            setCategories(response.data); // Datos simplificados del backend
        } catch (err) {
            setError(err.message || 'Failed to fetch categories');
        } finally {
            setLoading(false);
        }
        };

        fetchCategories();
    }, []);

    const LoadingSkeleton = () => {
        return (
            <div className={styles.mainContainer}>      
                <div className={styles.categoriesGrid}>
                    <div>
                        <Skeleton variant="circular" className={styles.avatar} width={120} height={120} />
                        <Skeleton variant="text" sx={{ fontSize: '2rem', width: '120px' }} />
                    </div>
                    <div>
                        <Skeleton variant="circular" className={styles.avatar} width={120} height={120} />
                        <Skeleton variant="text" sx={{ fontSize: '2rem', width: '120px' }} />
                    </div>
                    <div>
                        <Skeleton variant="circular" className={styles.avatar} width={120} height={120} />
                        <Skeleton variant="text" sx={{ fontSize: '2rem', width: '120px' }} />
                    </div>
                    <div>
                        <Skeleton variant="circular" className={styles.avatar} width={120} height={120} />
                        <Skeleton variant="text" sx={{ fontSize: '2rem', width: '120px' }} />
                    </div>
                    <div>
                        <Skeleton variant="circular" className={styles.avatar} width={120} height={120} />
                        <Skeleton variant="text" sx={{ fontSize: '2rem', width: '120px' }} />
                    </div>
                    <div>
                        <Skeleton variant="circular" className={styles.avatar} width={120} height={120} />
                        <Skeleton variant="text" sx={{ fontSize: '2rem', width: '120px' }} />
                    </div>
                    <div>
                        <Skeleton variant="circular" className={styles.avatar} width={120} height={120} />
                        <Skeleton variant="text" sx={{ fontSize: '2rem', width: '120px' }} />
                    </div>
                    <div>
                        <Skeleton variant="circular" className={styles.avatar} width={120} height={120} />
                        <Skeleton variant="text" sx={{ fontSize: '2rem', width: '120px' }} />
                    </div>
                    <div>
                        <Skeleton variant="circular" className={styles.avatar} width={120} height={120} />
                        <Skeleton variant="text" sx={{ fontSize: '2rem', width: '120px' }} />
                    </div>
                    <div>
                        <Skeleton variant="circular" className={styles.avatar} width={120} height={120} />
                        <Skeleton variant="text" sx={{ fontSize: '2rem', width: '120px' }} />
                    </div>
                    <div>
                        <Skeleton variant="circular" className={styles.avatar} width={120} height={120} />
                        <Skeleton variant="text" sx={{ fontSize: '2rem', width: '120px' }} />
                    </div>
                    <div>
                        <Skeleton variant="circular" className={styles.avatar} width={120} height={120} />
                        <Skeleton variant="text" sx={{ fontSize: '2rem', width: '120px' }} />
                    </div>

                    <div>
                        <Skeleton variant="circular" className={styles.avatar} width={120} height={120} />
                        <Skeleton variant="text" sx={{ fontSize: '2rem', width: '120px' }} />
                    </div>
                    <div>
                        <Skeleton variant="circular" className={styles.avatar} width={120} height={120} />
                        <Skeleton variant="text" sx={{ fontSize: '2rem', width: '120px' }} />
                    </div>
                    <div>
                        <Skeleton variant="circular" className={styles.avatar} width={120} height={120} />
                        <Skeleton variant="text" sx={{ fontSize: '2rem', width: '120px' }} />
                    </div>
                </div>
            </div>
        )
    }

    if (loading) return <LoadingSkeleton />;
    if (error) return <p style={{ color: 'red' }}>{error}</p>;

    return (
        <div className={styles.mainContainer}>        
            <div className={`${styles.categoriesGrid} ${isExpanded ? styles.expanded : ""}`}>
                {/* Solo mapeamos el número de categorías controlado por el estado */}
                {categories.map((category) => (
                    <Link 
                        key={category.categoryId}
                        href={{
                            pathname: '/search',
                            query: { query: category.name }
                        }}
                        className={styles.categoryContainer}
                    >
                        <Avatar className={styles.avatar}
                            alt={category.name}
                            src={category.image}
                            sx={{ width: 160, height: 160 }}
                        />
                        <p style={{ textAlign: "center"}}>{category.name}</p>
                    </Link>
                ))}
            </div>
            {/* Mostramos el botón solo si no estamos mostrando todas las categorías */}
            <div className={styles.button}>
                    <Button onClick={toggleView} variant="contained" className={"font-semibold"} sx={{ background:"#54DEA7", color: "#000000", borderRadius: "25px", fontFamily: "var(--font-poppins)", fontSize: "12px"}}>
                        {isExpanded ? "Ver menos" : "Ver todo"}
                    </Button>
            </div>
            
            
        </div>
    );
}
