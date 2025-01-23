'use client';
import styles from "./FilteredCart.module.css";
import { useState, useEffect } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ProductionQuantityLimitsRoundedIcon from '@mui/icons-material/ProductionQuantityLimitsRounded';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import { Skeleton } from "@mui/material";
import { showToast } from "@/components/CustomizedSnackbars";
import Link from "next/link";
import { getShoppingList, addProductToShoppingList, dropProductFromShoppingList } from "@/app/services/shoppingList";

function QuantityDropdown ({ quantity, userId, productId, storeId, onQuantityChange }) {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState(quantity);

    const toggleDropdown = () => setIsOpen(!isOpen);
    const options = [...Array(99).keys()].map(i => i + 1);

    // Agregar y editar cantidad de productos
    const handleAddProduct = async (option) => {
        setSelectedOption(option);
        setIsOpen(false);
        try {
            if (!userId || userId == "" || userId == "undefined") {
                showToast('Inicio de sesión requerido!', "error", 5000);
            }
            await addProductToShoppingList(userId, productId, storeId, option);
            showToast(`Cantidad cambiada a ${option}`, "success", 5000);
            onQuantityChange(option);
        } catch (err) {
            showToast(err.message, "error", 5000);
        }
    };
    
    
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
                                onClick={() => handleAddProduct(option)}
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

function Cart() {
    const [shoppingList, setShoppingList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isOpen, setIsOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState('');
    const [userId, setUserId] = useState("");

    console.log(shoppingList)

    const toggleDropdown = () => setIsOpen(!isOpen);

    // Al seleccionar tienda
    const handleOptionClick = (option) => {
        setSelectedOption(option);
        setIsOpen(false);
        localStorage.setItem("cart", option)
    };

    const fetchShoppingList = async (id) => {
      try {
        setLoading(true);
        const data = await getShoppingList(id, (""));
        console.log("data: ", data)

        setShoppingList(data.data.supermarkets);

        const supermarketsList = data.data.supermarkets
        setShoppingList(supermarketsList);

        // Seleccion carrito a mostrar
        const LastCart = localStorage.getItem('cart');
        if (LastCart !== null && LastCart !== undefined && LastCart !== '' && LastCart !== "undefined") {
            console.log("corriendo pruebva 25")

            console.log("LastCart: ", LastCart)
            setSelectedOption(LastCart);
        } else {
            for (let i of supermarketsList){
                if(i.products.length > 0) {
                    handleOptionClick(i.supermarket)
                    break;
                }
            }
        }
      } catch (err) {
        setError(err.message || "Failed to fetch shopping list.");
      } finally {
        setLoading(false);
      }
    };

    const updateProductQuantity = (productId, supermarketId, quantity) => {
        setShoppingList((prev) =>
            prev.map((supermarket) =>
                supermarket.supermarketId === supermarketId
                    ? {
                          ...supermarket,
                          products: supermarket.products.map((product) =>
                              product.productId === productId
                                  ? { ...product, quantity }
                                  : product
                          ),
                      }
                    : supermarket
            )
        );
    };

    const handleRemoveProduct = async (productId, supermarketId) => {
        try {
            await dropProductFromShoppingList(userId, productId, supermarketId);
            await updateProductQuantity(productId, supermarketId, 0); // Refresh the shopping list after removing
            showToast('1 Producto eliminado del carrito', "success", 5000);
        } catch (err) {
            showToast(err.message || 'Error eliminando producto', "error", 5000);
            console.error("Error removing product:", err.message);
        }
      };
  
    useEffect(() => {
        const userData = localStorage.getItem("user");
        if (userData) { 
            const parsedUser = JSON.parse(userData);
            setUserId(parsedUser?.userId || "");
            parsedUser?.userId && fetchShoppingList(parsedUser.userId);
        }
    }, []);

    const LoadingSkeleton = () => {
        return (
            <div className={styles.mainContainer}>
                <div className={styles.topContainer}>
                    <Skeleton variant="rounded" width={300} height={35} />
                    <Skeleton variant="rounded" width={200} height={45} />
                </div>
                
                <div className={styles.productsContainer}>
                    <Skeleton variant="rounded" width='100%' height={90} />
                    <Skeleton variant="rounded" width='100%' height={90} />
                    <Skeleton variant="rounded" width='100%' height={90} />
                </div>
                
                <div className={styles.result}><Skeleton variant="text" sx={{ fontSize: '1rem', width: '200px' }} /></div>
            </div>
        )
    }
  
    if (loading) return <LoadingSkeleton/>;
    if (error) return <p>{error}</p>;

    const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
    });

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
                            {shoppingList.map((supermarket, index) => (
                                <li
                                    key={index}
                                    className={styles.dropdownOption}
                                    onClick={() => handleOptionClick(supermarket.supermarket)}
                                >
                                    {supermarket.supermarket}
                                </li>
                            ))}
                        </ul>
                    </ClickAwayListener>
                )}
            </div>
        )
    }

    const supermarket = shoppingList.find(supermarket => supermarket.supermarket === selectedOption);

    let total = 0

    if (supermarket) {
        const products = supermarket.products

        for (const i of products) {
            if (i.quantity > 0) {
                total += i.quantity * i.price;
            }
        }
    }

    return (
        <div className={styles.mainContainer}>
            <div className={styles.topContainer}>
                <h3>Carrito de Presupuestos</h3>
                <Filter/>
            </div>
            
            <div className={styles.productsContainer}>
                {supermarket ? (
                    supermarket.products.map((product, index) => (
                        <div key={index}>
                            { product.quantity > 0 ? (
                                <div className={styles.product}>
                                    <div className={styles.leftSide}>
                                        <Link href={`/store/${supermarket.supermarketId}/${product.productId}`}>
                                            <img
                                                src={product.urlProductImage}
                                                alt={product.name}
                                                width={155}
                                                height={80}
                                                loading="lazy"
                                                style={{borderRadius: '8px', objectFit: "cover", height: "90px", width: "155px"}}
                                            />
                                        </Link>
                                        <Link href={`/store/${supermarket.supermarketId}/${product.productId}`}>
                                            <h4 className={styles.detail}>{product.name}</h4>
                                        </Link>
                                    </div>
                                    <div className={styles.rightSide}>
                                        <Link href={`/store/${supermarket.supermarketId}`}>
                                            <img
                                                src={supermarket.urlSupermarketImage}
                                                alt={supermarket.supermarket}
                                                width={50}
                                                height={50}
                                                loading="lazy"
                                                style={{borderRadius: '100%', objectFit: "cover", height: "50px", width: "50px"}}
                                            />
                                        </Link>
                                        <h5 className={styles.detail}>{product.calories}{product.quantity > 1 && " c/u"}</h5>
                                        <h5 className={styles.detail}>{formatter.format(product.price)}</h5>
                                        <QuantityDropdown
                                            quantity={product.quantity}
                                            userId={userId}
                                            productId={product.productId}
                                            storeId={supermarket.supermarketId}
                                            onQuantityChange={(newQuantity) =>
                                                updateProductQuantity(product.productId, supermarket.supermarketId, newQuantity)
                                            } />
                                        <button className="iconButton" onClick={() => handleRemoveProduct(product.productId, supermarket.supermarketId)}><DeleteIcon/></button>
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
            
            <div className={styles.result} style={ supermarket ? { display: "flex"} : { display: "none"}} >Costo Total: {formatter.format(total)}</div>
        </div>

    );
}

export default Cart;