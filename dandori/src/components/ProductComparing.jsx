"use client"
import { useState} from "react"
import CustomizableModal from "./CustomizableModal";
import Button from "@mui/material/Button";
import SyncAltIcon from '@mui/icons-material/SyncAlt';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import AdjustableDropdown from "@/components/AdjustableDropdown"
import ProductPreview from "./ProductPreview";
import NutritionData from "./NutritionData";
import styles from "./ProductComparing.module.css"

function Content({ data:data }) {
    const searchedData = [
        {
            name: "Barra proteica - Natural Valley1",
            image: "https://i.pinimg.com/originals/57/73/33/5773334ef57bc97b2c0836b2183ead9b.png",
            supermarket: "La Sirena",
            price: 166,
            supermarketLogo: "https://th.bing.com/th/id/OIP.8I6AZX5QGeKanXF_GlqYXwHaHa?rs=1&pid=ImgDetMain",
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
            ]
        },
        {
            name: "Salami - Artesanal Bravov veregeggegrgrege2",
            image: "https://th.bing.com/th/id/OIP.Cjx3irrgSgFp6RBtz-_IpgHaFc?rs=1&pid=ImgDetMain",
            supermarket: "La Sirena",
            price: 134,
            supermarketLogo: "https://th.bing.com/th/id/OIP.8I6AZX5QGeKanXF_GlqYXwHaHa?rs=1&pid=ImgDetMain",
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
            ]
        },
        {
            name: "Barra proteica - Natural Valley3",
            image: "https://i.pinimg.com/originals/57/73/33/5773334ef57bc97b2c0836b2183ead9b.png",
            supermarket: "La Sirena",
            price: 166,
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
            ]
        },
        {
            name: "Barra proteica - Natural Valley4",
            image: "https://i.pinimg.com/originals/57/73/33/5773334ef57bc97b2c0836b2183ead9b.png",
            supermarket: "La Sirena",
            price: 166,
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
            ]
        },
        {
            name: "Barra proteica - Natural Valley5",
            image: "https://i.pinimg.com/originals/57/73/33/5773334ef57bc97b2c0836b2183ead9b.png",
            supermarket: "La Sirena",
            price: 166,
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
            ]
        },
        {
            name: "Barra proteica - Natural Valley6",
            image: "https://i.pinimg.com/originals/57/73/33/5773334ef57bc97b2c0836b2183ead9b.png",
            supermarket: "La Sirena",
            price: 166,
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
            ]
        },
        {
            name: "Barra proteica - Natural Valley7",
            image: "https://i.pinimg.com/originals/57/73/33/5773334ef57bc97b2c0836b2183ead9b.png",
            supermarket: "La Sirena",
            price: 166,
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
            ]
        },
        {
            name: "Barra proteica - Natural Valley8",
            image: "https://i.pinimg.com/originals/57/73/33/5773334ef57bc97b2c0836b2183ead9b.png",
            supermarket: "La Sirena",
            price: 166,
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
            ]
        },
    ]

    const compareNutritionInfo = [
        { label: 'Energía', value: '200,00 kcal' },
        { label: 'Proteínas', value: '18,00 g' },
        { label: 'Carbohidratos', value: '19,00 g' },
        { label: 'Fibra Alimentar', value: '4,50 g' },
        { label: 'Azúcar', value: '6,00 g' },
        { label: 'Gorduras Totais', value: '5,50 g' },
        { label: 'Sódio', value: '250,00 mg' },
        { label: 'Grasas Saturadas', value: '1,00 g' },
      ];

    const buttonStyle = {
        background:"#F79F1A",
        color: "#000000",
        borderRadius: "25px",
        m: "0.7em",
    }


    const [quantity, setQuantity] = useState();
    const options = [...Array(99).keys()].map(i => i + 1);
    // const [isItemSelected, setIsItemSelected] = useState(false);
    const [selectedItem, setSelectedItem] = useState({});

    function handleSelection(data) {
        // setIsItemSelected(true)
        setSelectedItem(data)
    }

    return (
        <div className={styles.mainContainer}>
            <div className={styles.leftProduct}>
                <div className={styles.titleContainer}>
                    <h4>{data.name}</h4>
                    <img
                        width="50px"
                        height="50px"
                        src={data.supermarketLogo}
                        alt={data.name}
                        className={styles.logoSupermarket}
                    />
                </div>
                <img
                    src={data.image}
                    className={styles.mainImage}/>
                <div className={styles.priceAndOptions}>
                    <p style={{fontWeight: "300"}}>Precio: ${data.tendency.at(-1).cost}</p>
                    <div>
                        <AdjustableDropdown value={quantity ? quantity : 1} options={options}/>
                        <Button variant="contained" sx={buttonStyle}>
                            <ShoppingCartOutlinedIcon/>
                        </Button>
                    </div>
                </div>
                <div>
                    <NutritionData data={data.nutritionData}/>
                </div>

            </div>
            <SyncAltIcon className={styles.comparationIcon}/>
            { Object.keys(selectedItem).length === 0 ?  
            (
                <div className={styles.rightProduct}>
                    <h4>Seleccionar similar</h4>
                    {searchedData.map((data, index)=>(
                        <ProductPreview key={index} data={data} onSelection={handleSelection} />
                    ))}
                </div>
            ) : (
                <div className={styles.leftProduct}>
                    <div className={styles.titleContainer}>
                        <h4>{data.name}</h4>
                        <img
                            width="50px"
                            height="50px"
                            src={data.supermarketLogo}
                            alt={data.name}
                            className={styles.logoSupermarket}
                        />
                    </div>
                    <img
                        src={data.image}
                        className={styles.mainImage}/>
                    <div className={styles.priceAndOptions}>
                        <p style={{fontWeight: "300"}}>Precio: ${data.tendency.at(-1).cost}</p>
                        <div>
                            <AdjustableDropdown value={quantity ? quantity : 1} options={options}/>
                            <Button variant="contained" sx={buttonStyle}>
                                <ShoppingCartOutlinedIcon/>
                            </Button>
                        </div>
                    </div>
                    <div>
                        <NutritionData data={compareNutritionInfo} compareData={data.nutritionData}/>
                    </div>

                </div>
            
            )}
            
        </div>
    )
}

function ProductComparing({ product:product }) {

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
            
        />
    )
}

export default ProductComparing;