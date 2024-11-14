'use client'
import Link from "next/link"
import styles from "./product.module.css"
import Button from "@mui/material/Button"
import AdjustableDropdown from "@/components/AdjustableDropdown"
import NutritionData from "@/components/NutritionData"
import CostTrendChart from "@/components/CostTrendChart"
import ProductComparing from "@/components/ProductComparing"
import { useState } from 'react'

const product = {
    name: "Barra proteica - Natural Valley",
    image: "https://i.pinimg.com/originals/57/73/33/5773334ef57bc97b2c0836b2183ead9b.png",
    supermarket: "La Sirena",
    supermarketLogo: "https://th.bing.com/th/id/OIP.2zX3Z-V5CHLIZQaOLXAuEAHaET?rs=1&pid=ImgDetMain",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    nutritionData: [
        { label: 'Energía', value: '221,15 kcal' },
        { label: 'Proteínas', value: '15,13 g' },
        { label: 'Carbohidratos', value: '18,40 g' },
        { label: 'Fibra Alimentar', value: '5,83 g', subItem: true },
        { label: 'Azúcar', value: '4,88 g', subItem: true },
        { label: 'Gorduras Totais', value: '5,18 g' },
        { label: 'Gorduras Saturadas', value: '0,86 g', subItem: true },
        { label: 'Gorduras Trans', value: '0 g', subItem: true },
        { label: 'Colesterol', value: '0 mg' },
        { label: 'Sódio', value: '243,03 mg' },
        { label: 'Potássio', value: '291,85 mg' },
        { label: 'Cálcio', value: '49,02 mg' },
        { label: 'Ferro', value: '2,91 mg' },
        { label: 'Magnésio', value: '48,23 mg' },
        { label: 'Vitamina C', value: '29,49 mg' },
        { label: 'Vitamina D', value: '24,88 mg' },
        { label: 'Vitamina B6', value: '32,40 mg' },
    ],
    tendency: [
        { date: '25 Julio', cost: 120 },
        { date: '26 Julio', cost: 125 },
        { date: '27 Julio', cost: 122 },
        { date: '28 Julio', cost: 130 },
        { date: '29 Julio', cost: 122.45 },
        { date: '30 Julio', cost: 135 },
        { date: '31 Julio', cost: 139.9 },
    ]
}

export default function Product() {
    const [quantity1, setQuantity1] = useState();
    const options = [...Array(99).keys()].map(i => i + 1);

    return (
        <div className={styles.mainContainer}>
            <div className={styles.title}>
                <h3>{product.name}</h3>
                <Link href={`/store/${product.supermarket}`}><p className={styles.supermarketTitle}>{"(Supermercado " + product.supermarket + ")"}</p></Link>
            </div>

            <div className={styles.topInfo}>
                    <img 
                        src={product.image}
                        width="30%"
                        alt={product.name}
                        className={styles.topImage}/>
                <div className={styles.topDescriptionOptions}>
                    <div>
                        <p style={{ fontWeight: "300" }}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                    </div> 
                    <div className={styles.topOptions}>
                        <div className={styles.topCartOptions}>
                            <AdjustableDropdown value={quantity1 ? quantity1 : 1} options={options}/>
                            <Button variant="contained" className={"font-semibold"} sx={{background:"#FF9F1C", color: "#000000", borderRadius: "25px", fontFamily: "var(--font-poppins)", fontSize: "12px", padding: "10px"}}>
                                Agregar al carrito
                            </Button>
                        </div>
                        <ProductComparing product={product}/>
                    </div>  
                </div>
            </div>

            <div className={styles.bottomInfo}>
                <div className={styles.nutritionData}>
                    <NutritionData data={product.nutritionData} />
                </div>
                <div className={styles.CostTrendChart}>
                    <CostTrendChart tendency={product.tendency}/>
                </div>
            </div>
        </div>
    )
}