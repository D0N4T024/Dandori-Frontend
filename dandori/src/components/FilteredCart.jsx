'use client';
import styles from "./FilteredCart.module.css";
import { useState, useEffect } from 'react';
import Image from "next/image";
import DeleteIcon from '@mui/icons-material/Delete';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ProductionQuantityLimitsRoundedIcon from '@mui/icons-material/ProductionQuantityLimitsRounded';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Link from "next/link";

function QuantityDropdown ({ quantity:quantity }) {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState(quantity);

    const toggleDropdown = () => setIsOpen(!isOpen);

    const handleOptionClick = (option) => {
        setSelectedOption(option);
        setIsOpen(false);
    };
    
    const options = [...Array(99).keys()].map(i => i + 1);

    
    
    return(
        <div className={styles.dropdown}>
            <div className={styles.quantityDropdown} onClick={toggleDropdown}>
                <h5>{selectedOption}</h5>
                {isOpen ? <ExpandLessIcon /> : <ExpandMoreIcon />}
            </div>
            {isOpen && (
                <ClickAwayListener onClickAway={toggleDropdown}>

                    <ul className={styles.dropdownMenu}>
                        {options.map((option, index) => (
                            <li
                                key={index}
                                className={styles.dropdownOption}
                                onClick={() => handleOptionClick(option)}
                            >
                                {option}
                            </li>
                        ))}
                    </ul>
                </ClickAwayListener>
                
            )}
        </div>
    )
}


function FilteredCart({ supermarkets:supermarkets }) {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState('');

    const toggleDropdown = () => setIsOpen(!isOpen);

    const handleOptionClick = (option) => {
        setSelectedOption(option);
        setIsOpen(false);
        localStorage.setItem("cart", option)
    };
    
    useEffect(() => {
        const LastCart = localStorage.getItem('cart');
        if (LastCart !== null && LastCart !== undefined && LastCart !== '') {
            setSelectedOption(LastCart);
        } else {
            for (let i of supermarkets){
                if(i.products.length > 0) {
                    handleOptionClick(i.name)
                    break;
                }
            }
        }
    }, []);

    const Filter = () => {
        return(
            <div className={styles.dropdown}>
                <div className={styles.dropdownToggle} onClick={toggleDropdown}>
                    <h5>{selectedOption}</h5>
                    {isOpen ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                </div>
                {isOpen && (
                    <ClickAwayListener onClickAway={toggleDropdown}>

                        <ul className={styles.dropdownMenu}>
                            {supermarkets.map((supermarket, index) => (
                                <li
                                    key={index}
                                    className={styles.dropdownOption}
                                    onClick={() => handleOptionClick(supermarket.name)}
                                >
                                    {supermarket.name}
                                </li>
                            ))}
                        </ul>
                    </ClickAwayListener>
                    
                )}
            </div>
        )
    }

    const supermarket = supermarkets.find(market => market.name === selectedOption);

    let total = 0

    if (supermarket) {
        const prueba = supermarket.products

        for (const i of prueba) {
            if (i.cantidad > 0) {
                total += i.cantidad * i.precio;
            }
        }
    }

    const ProductSummary = () => {
        return (
            <div className={styles.productsContainer}>
                {supermarket ? (
                    supermarket.products.map((product, index) => (
                        <div key={index}>
                            { product.cantidad > 0 ? (
                                <div className={styles.product}>
                                    <div className={styles.leftSide}>
                                        <img
                                            src={product.image}
                                            alt={product.title}
                                            width="155"
                                            height="80"
                                            loading="lazy"
                                            style={{borderRadius: '8px', objectFit: "cover", height: "90px", width: "155px"}}
                                        />
                                        <h4 className={styles.detail}>{product.title}</h4>
                                    </div>
                                    <div className={styles.rightSide}>
                                        <img
                                            src="/Horizontal Dandori Logo.svg"
                                            alt="Logo de supermercado"
                                            width={155}
                                            height={80}
                                            loading="lazy"
                                            style={{borderRadius: '8px'}}
                                        />
                                        <h5 className={styles.detail}>{product.calories} calorias{product.cantidad > 1 && " c/u"}</h5>
                                        <h5 className={styles.detail}>${product.precio}</h5>
                                        <QuantityDropdown quantity={product.cantidad}/>
                                        <button className="iconButton"><DeleteIcon/></button>
                                    </div>
                            </div>
                        ) : (null)}
                        </div>
                    
                    ))
                ) : (
                    <div className={styles.emptyCartContainer}>
                        <ProductionQuantityLimitsRoundedIcon sx={{ fontSize: 200, color: '#BDBDBD' }} />
                        <h5 className={styles.emptyCartDescription}>Tu carrito esta vacio, haz click para <Link href="/" style={{textDecoration: 'underline'}}>continuar viendo</Link></h5>
                    </div>
                )}
            </div>
        );
    }

    return(
        <div className={styles.mainContainer}>
            <div className={styles.topContainer}>
                <h3>Carrito de Presupuestos</h3>
                <Filter/>
            </div>
            <ProductSummary supermarkets={supermarkets}/>
            <div className={styles.result} style={ supermarket ? { display: "flex"} : { display: "none"}} >Costo Total: ${total}</div>
        </div>
    )
}

export default FilteredCart;