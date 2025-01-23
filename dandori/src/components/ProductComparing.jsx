"use client"
import { useState, useEffect, Suspense, lazy} from "react"
import CustomizableModal from "./CustomizableModal";
import Button from "@mui/material/Button";
import SyncAltIcon from '@mui/icons-material/SyncAlt';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import AdjustableDropdown from "@/components/AdjustableDropdown"
import Tooltip from '@mui/material/Tooltip';
import Link from "next/link";
import Zoom from '@mui/material/Zoom';

import ProductPreview from "./ProductPreview";
const LazyProductPreview = lazy(() => import("./ProductPreview"));
import Skeleton from "@mui/material/Skeleton";

import NutritionData from "./NutritionData";
import styles from "./ProductComparing.module.css"
import KeyboardBackspaceRoundedIcon from '@mui/icons-material/KeyboardBackspaceRounded';
import { addProductToShoppingList } from "@/app/services/shoppingList"
import { searchProducts, getProductDetails } from "@/app/services/product";
import { showToast } from "@/components/CustomizedSnackbars";
import { useRouter } from "next/navigation";
import IconButton from '@mui/material/IconButton';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import PaginationControls from "@/components/PaginationControls";

function Content({ data:data }) {
    const [quantity1, setQuantity1] = useState(1);
    const [quantity2, setQuantity2] = useState(1);
    const options = [...Array(99).keys()].map(i => i + 1);
    // const [isItemSelected, setIsItemSelected] = useState(false);
    const [selectedItem, setSelectedItem] = useState({});
    const [products, setProducts] = useState([]);
    const [searchValue, setSearchValue] = useState(data.category);
    const [searchInput, setsearchInput] = useState("");
    const [pagination, setPagination] = useState({
        total: 0,
        page: 1,
        pages: 0,
      });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const limit = 15;

    const router = useRouter();

    const notFound = () => (
        <div className={styles.errorContainer}>
            <h3>No se han encontrado resultados</h3>
            <div className={styles.notFound}>
                <img
                    src="https://cdn-icons-gif.flaticon.com/17569/17569494.gif"
                    alt="Search"
                    title="Search"
                    width="100"
                    height="125"
                    style={{ filter: "grayscale(90%)" }}
                />
                <h5 style={{ textAlign: "center" }}>
                    Haz click para{" "}
                    <Link
                    href="/"
                    style={{
                        textDecoration: "underline",
                        textAlign: "center",
                        color: "red",
                        paddingBlock: "2em",
                        fontFamily: "var(--font-poppins)",
                    }}
                    >
                    continuar viendo
                    </Link>
                </h5>
            </div>
        </div>
    )

    const handleOption1Selection = (option) => {
        setQuantity1(option)
    }

    const handleOption2Selection = (option) => {
        setQuantity2(option)
    }

    async function handleSelection(data) {
        try {
            //Pasar del componente ProductPreviw los parametros para sacar los detalles del producto y ponerlos dentro del useState
            const response = await getProductDetails(data.productId, data.supermarketId);
            setSelectedItem(response.data);
            
            console.log("Data de prueba: ", response.data)
        } catch(err) {
            showToast("Failed to fetch product details", "error", 5000);
        }
    }

    // Handle page change
    const handlePageChange = (newPage) => {
        setPagination((prev) => ({ ...prev, page: newPage }));
        fetchProducts(searchValue, newPage)
    };

    const fetchProducts = async (search=searchValue, page=1) => {
        setLoading(true)
        try {
            console.log("searh: ", search, " page: ", page)
            const response = await searchProducts(search, page, limit); // Página 1, límite de 5 productos
            console.log("fetchProducts: ", response.data);
            setProducts(response.data);
            console.log("Seacrh: ", search)
            setSearchValue(search)
            console.log("datos de prueba: ", response.pagination)
            setPagination(response.pagination);
        } catch (err) {
            setError(err.message || 'Failed to fetch products');
        } finally {
            setLoading(false);
        }
    };
    
    useEffect(() => {
        fetchProducts();
    }, [selectedItem]);

    // if (loading) return <Loading/>;
    // if (error) return <p style={{ color: 'red' }}>{error}</p>;

    const handleSearch = () => {
        console.log("se busca: ", searchInput)
        if(searchInput !== ""){
            setError('')    
            setsearchInput('');
            fetchProducts(searchInput);
        }
      }

    const handleAddProduct = async (productId, storeId, quantity) => {
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

    const buttonStyle = {
        background:"#F79F1A",
        color: "#000000",
        borderRadius: "25px",
        m: "0.7em",
    }

    return (
        <div className={styles.mainContainer}>
            <div className={styles.leftProduct}>
                <div className={styles.titleContainer}>
                    <h4>{data.name}</h4>
                    <Tooltip title={data.supermarket} enterDelay={500} TransitionComponent={Zoom} arrow>
                        <img
                            width="50px"
                            height="50px"
                            src={data.urlPreviewLogo}
                            alt={data.supermarket}
                            className={styles.logoSupermarket}
                            onClick={() => router.push(`/store/${data.supermarketId}`)}
                        />
                    </Tooltip>
                </div>
                <img
                    src={data.image}
                    className={styles.mainImage}/>
                <div className={styles.priceAndOptions}>
                    <p style={{fontWeight: "300"}}>Precio: ${data.price}</p>
                    <div>
                        <AdjustableDropdown value={quantity1 ? quantity1 : 1} options={options} onSelection={handleOption1Selection}/>
                        <Button variant="contained" sx={buttonStyle} onClick={() => handleAddProduct(data.productId, data.supermarketId, quantity1)}>
                            <ShoppingCartOutlinedIcon/>
                        </Button>
                    </div>
                </div>
                <div>
                    <NutritionData 
                        data={data.nutritionalData} 
                        color={() => {
                            const selectedPrice = parseFloat(selectedItem.price);
                            const dataPrice = parseFloat(data.price);

                            if (selectedPrice < dataPrice) {
                                return "rgba(247, 23, 53, 0.2)";
                            } else if (selectedPrice > dataPrice) {
                                return "#f0fbf7";
                            } else {
                                return "#FFFFFF";
                            }
                        }}
                        decorationColor={() => {
                            const selectedPrice = parseFloat(selectedItem.price);
                            const dataPrice = parseFloat(data.price);

                            if (selectedPrice < dataPrice) {
                                return "rgb(247, 23, 53, 0.6)";
                            } else if (selectedPrice > dataPrice) {
                                return "#a7e5b0";
                            } else {
                                return "rgb(247, 159, 26, 0.6)";
                            }
                        }}/>
                </div>
            </div>

            <SyncAltIcon className={styles.comparationIcon}/>

            { Object.keys(selectedItem).length === 0 ?  
            (
                <div className={styles.rightProduct}>
                    {/* Searcher */}
                    <div className={styles.inputContainer}>
                        <InputBase
                            value={searchInput}
                            onChange={(e) => setsearchInput(e.target.value)}
                            onKeyDown={(e) => {e.key === 'Enter' && handleSearch()}}
                            sx={{ ml: 1, flex: 1 }}
                            placeholder="Buscar"
                            inputProps={{ 'aria-label': 'search' }}
                        />
                        <IconButton
                            type="button"
                            sx={{ p: '10px' }}
                            aria-label="search"
                            onClick={handleSearch}
                        >
                            <SearchIcon />
                        </IconButton>
                    </div>
                    {/* Previews de productos */}
                    

                    { loading ? (
                        <div style={{ display: "flex", flexDirection: "column", gap: "1em" }}> 
                            <h4>Seleccionar similar</h4>
                            {Array.from({ length: limit }).map((_, index) => (
                            <Skeleton 
                              key={index} 
                              variant="rounded" 
                              width="100%" 
                              height={98} 
                            />
                          ))}
                        </div>
                    ) : error ? (
                        notFound()
                    ) : (
                        <div style={{ display: "flex", flexDirection: "column", gap: "1em" }}>
                            <h4>Seleccionar similar</h4>
                            {products.map((product, index)=>(
                                    <ProductPreview key={index} data={product} onSelection={handleSelection} />
                            ))}

                            {/* Paginacion */}
                            <div>
                                <PaginationControls
                                page={pagination.page}
                                totalPages={pagination.pages}
                                onPageChange={handlePageChange}
                                />
                            </div>
                        </div>
                        
                    )}
                    
                </div>
            ) : (
                <div className={styles.rightProduct}>
                    <div className={styles.titleContainer}>
                        <Tooltip title="Volver" enterDelay={500} TransitionComponent={Zoom} arrow>
                            <button className='iconButton' onClick={() => setSelectedItem({})}>
                                <KeyboardBackspaceRoundedIcon/>
                            </button>
                        </Tooltip>
                        <h4>{selectedItem.name}</h4>
                        <Tooltip title={selectedItem.supermarket} enterDelay={500} TransitionComponent={Zoom} arrow>
                            <img
                                width="50px"
                                height="50px"
                                src={selectedItem.urlPreviewLogo}
                                alt={selectedItem.supermarket}
                                className={styles.logoSupermarket}
                                onClick={() => router.push(`/store/${selectedItem.supermarketId}`)}
                            />
                        </Tooltip>
                    </div>
                    <img
                        src={selectedItem.image}
                        className={styles.mainImage}
                        style={{ cursor: "pointer" }}
                        onClick={() => router.push(`/store/${selectedItem.supermarketId}/${selectedItem.productId}`)}/>
                    <div className={styles.priceAndOptions}>
                        <p style={{fontWeight: "300"}}>Precio: ${selectedItem.price}</p>
                        <div>
                            <AdjustableDropdown value={quantity2 ? quantity2 : 1} options={options} onSelection={handleOption2Selection}/>
                            <Button variant="contained" sx={buttonStyle} onClick={() => handleAddProduct(selectedItem.productId, selectedItem.supermarketId, quantity2)}>
                                <ShoppingCartOutlinedIcon/>
                            </Button>
                        </div>
                    </div>
                    <div>
                        <NutritionData 
                            data={selectedItem.nutritionalData}
                            color={() => {
                                const selectedPrice = parseFloat(selectedItem.price);
                                const dataPrice = parseFloat(data.price);

                                if(selectedPrice > dataPrice){return "rgba(247, 23, 53, 0.2)"}
                                else if(selectedPrice < dataPrice){return "#f0fbf7"}
                                else {return "#FFFFFF"}
                            }}
                            decorationColor={() => {
                                const selectedPrice = parseFloat(selectedItem.price);
                                const dataPrice = parseFloat(data.price);

                                if(selectedPrice > dataPrice){return "rgb(247, 23, 53, 0.6)"}
                                else if(selectedPrice < dataPrice){return "#a7e5b0"}
                                else {return "rgb(247, 159, 26, 0.6)"}
                            }}
                            compareData={data.nutritionalData}/>
                    </div>
                </div>
            )}
            
        </div>
    )
}

function ProductComparing({ product, openAtStart }) {
    return (
        <CustomizableModal
            content={Content}
            textTag={() => {return(
                <Button 
                    variant="contained"
                    className={"font-semibold"}
                    sx={{background:"#f71735", color: "#000000", borderRadius: "25px", fontFamily: "var(--font-poppins)", fontSize: "12px", padding: "10px", width: "100%"}}
                >
                    Comparar
                </Button>)}}
            data={product}
            openAtStart={openAtStart}
        />
    )
}

export default ProductComparing;