'use client'
import styles from "./search.module.css"
import { useSearchParams } from "next/navigation"
import ProductCard from "@/components/ProductCard";
import PaginationControls from "@/components/PaginationControls";
import { Button } from "@mui/material";


export default function Search({ searchParams }) {
    //JSON de ejemplo
    const foundProducts = [
        {
            image: "https://myplate-prod.azureedge.us/sites/default/files/styles/recipe_525_x_350_/public/2020-10/EasyGreekSalad527x323.jpg?itok=KInBpWEf",
            name: "Manzana Roja",
            supermarket: "Supermercado Sirenaravo",
            price: "1.50"
        },
        {
            image: "https://th.bing.com/th/id/R.4f1c126a17e9e20041148210d5795fa3?rik=ulJ%2bbZuSKapkXw&riu=http%3a%2f%2fimg.taste.com.au%2fQaDKlckA%2ftaste%2f2016%2f11%2ffresh-summer-vegetable-salad-91664-1.jpeg&ehk=tj7qLs2rAIGitkP7H44hpoWV8dVLz%2bbMDoFcImb8w9U%3d&risl=&pid=ImgRaw&r=0",
            name: "Leche Descremada probando nombre largo",
            supermarket: "Supermercado Sirena",
            price: "3.00"
        },
        {
            image: "https://www.garnishandglaze.com/wp-content/uploads/2021/03/easy-side-salad-6.jpg",
            name: "Pan Integral",
            supermarket: "Supermercado Jumbo",
            price: "2.25"
        },
        {
            image: "https://myplate-prod.azureedge.us/sites/default/files/styles/recipe_525_x_350_/public/2020-10/EasyGreekSalad527x323.jpg?itok=KInBpWEf",
            name: "arroz Blanco",
            supermarket: "Supermercado Sirenaravo",
            price: "0.90"
        },
        {
            image: "https://www.garnishandglaze.com/wp-content/uploads/2021/03/easy-side-salad-6.jpg",
            name: "Queso Cheddar",
            supermarket: "Supermercado Plaza Lama",
            price: "4.00"
        },
        {
            image: "https://myplate-prod.azureedge.us/sites/default/files/styles/recipe_525_x_350_/public/2020-10/EasyGreekSalad527x323.jpg?itok=KInBpWEf",
            name: "Manzana Roja",
            supermarket: "Supermercado Sirenaravo",
            price: "1.50"
        },
        {
            image: "https://myplate-prod.azureedge.us/sites/default/files/styles/recipe_525_x_350_/public/2020-10/EasyGreekSalad527x323.jpg?itok=KInBpWEf",
            name: "Leche Descremada",
            supermarket: "Supermercado Sirena",
            price: "3.00"
        },
        {
            image: "https://th.bing.com/th/id/R.4f1c126a17e9e20041148210d5795fa3?rik=ulJ%2bbZuSKapkXw&riu=http%3a%2f%2fimg.taste.com.au%2fQaDKlckA%2ftaste%2f2016%2f11%2ffresh-summer-vegetable-salad-91664-1.jpeg&ehk=tj7qLs2rAIGitkP7H44hpoWV8dVLz%2bbMDoFcImb8w9U%3d&risl=&pid=ImgRaw&r=0",
            name: "Pan Integral",
            supermarket: "Supermercado Jumbo",
            price: "2.25"
        },
        {
            image: "https://myplate-prod.azureedge.us/sites/default/files/styles/recipe_525_x_350_/public/2020-10/EasyGreekSalad527x323.jpg?itok=KInBpWEf",
            name: "arroz Blanco",
            supermarket: "Supermercado Sirenaravo",
            price: "0.90"
        },
        {
            image: "https://i.pinimg.com/originals/83/3c/88/833c88e97c73f758a1cfbea52793a2ce.jpg",
            name: "Queso Cheddar",
            supermarket: "Supermercado Plaza Lama",
            price: "4.00"
        }
    ];

    const page = searchParams['page'] ?? '1';
    const per_page = searchParams['per_page'] ?? '10';

    const start = (Number(page) - 1) * Number(per_page);
    const end = start + Number(per_page);
    
    const entries = foundProducts.slice(start, end)

    // const searchParams = useSearchParams();
    let params = { ...searchParams };
    const search = params.query;

    return(
        <div className={styles.mainContainer}>
            <h3>Resultados de buscar "{search}"</h3>
            <div className={styles.foundProducts}>
                {entries.map((product, index) => (
                    <ProductCard key={index} product={product}/>
                ))}
            </div>
            {/* <PaginationControls
                search={search}
                total={Math.ceil(foundProducts.length / 4)}
            /> */}
        </div>
    )
}