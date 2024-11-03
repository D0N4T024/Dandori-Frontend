'use client'

import Link from "next/link";
import { useState } from "react";
import styles from "./Categories.module.css";
import Avatar from '@mui/material/Avatar';
import Button from "@mui/material/Button";

export default function Categories({ categories }) {
    const [isExpanded, setIsExpanded] = useState(false);

    const toggleView = () => {
        setIsExpanded(!isExpanded);
    };

    return (
        <div className={styles.mainContainer}>        
            <div className={`${styles.categoriesGrid} ${isExpanded ? styles.expanded : ""}`}>
                {/* Solo mapeamos el número de categorías controlado por el estado */}
                {categories.map((category) => (
                    <Link 
                        key={category.id}
                        href={{
                            pathname: '/search',
                            query: { query: category.title }
                        }}
                        className={styles.categoryContainer}
                    >
                        <Avatar className={styles.avatar}
                            alt={category.title}
                            src={category.image}
                            sx={{ width: 160, height: 160 }}
                        />
                        <p style={{ textAlign: "center"}}>{category.title}</p>
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
