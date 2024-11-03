import Image from 'next/image'
import styles from './store.module.css'
import ProductCard from '@/components/ProductCard'
import Carousel from '@/components/Carousel'

export default function Store({ params }) {
    //JSON de ejemplo
    const store = {
        name: "Bravo",
        frontImage: "https://3.bp.blogspot.com/-_2LlFQTssfo/XBFcDhPQXNI/AAAAAAABNVM/RpXBAfDkXd8nnK3cFhHrSS_6yFGOj-MzACLcBGAs/s1600/Bravo1.jpg",
        logo: "https://idmphsmkuxkn.compat.objectstorage.us-ashburn-1.oraclecloud.com/cdn-bucket/uploads/2022/10/sirena-logo2-300x178.jpeg",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        categories: [
            {
                name: "Lacteos",
                products: [
                    {
                        name: "Leche - 500ml",
                        image: "https://th.bing.com/th/id/R.56056a9b9f59e5054a147ee2a4c7f86b?rik=PZv4xJ9ciBLoxg&pid=ImgRaw&r=0",
                        price: 85,
                    },
                    {
                        name: "Leche - 500ml",
                        image: "https://th.bing.com/th/id/R.56056a9b9f59e5054a147ee2a4c7f86b?rik=PZv4xJ9ciBLoxg&pid=ImgRaw&r=0",
                        price: 85,
                    },
                    {
                        name: "Leche - 500ml",
                        image: "https://th.bing.com/th/id/R.56056a9b9f59e5054a147ee2a4c7f86b?rik=PZv4xJ9ciBLoxg&pid=ImgRaw&r=0",
                        price: 85,
                    },
                    {
                        name: "Leche - 500ml",
                        image: "https://th.bing.com/th/id/R.56056a9b9f59e5054a147ee2a4c7f86b?rik=PZv4xJ9ciBLoxg&pid=ImgRaw&r=0",
                        price: 85,
                    },
                    {
                        name: "Leche - 500ml",
                        image: "https://th.bing.com/th/id/R.56056a9b9f59e5054a147ee2a4c7f86b?rik=PZv4xJ9ciBLoxg&pid=ImgRaw&r=0",
                        price: 85,
                    },
                    {
                        name: "Leche - 500ml",
                        image: "https://th.bing.com/th/id/R.56056a9b9f59e5054a147ee2a4c7f86b?rik=PZv4xJ9ciBLoxg&pid=ImgRaw&r=0",
                        price: 85,
                    },
                    {
                        name: "Leche - 500ml",
                        image: "https://th.bing.com/th/id/R.56056a9b9f59e5054a147ee2a4c7f86b?rik=PZv4xJ9ciBLoxg&pid=ImgRaw&r=0",
                        price: 85,
                    },
                    {
                        name: "Leche - 500ml",
                        image: "https://th.bing.com/th/id/R.56056a9b9f59e5054a147ee2a4c7f86b?rik=PZv4xJ9ciBLoxg&pid=ImgRaw&r=0",
                        price: 85,
                    },
                    {
                        name: "Leche - 500ml",
                        image: "https://th.bing.com/th/id/R.56056a9b9f59e5054a147ee2a4c7f86b?rik=PZv4xJ9ciBLoxg&pid=ImgRaw&r=0",
                        price: 85,
                    },
                    {
                        name: "Leche - 500ml",
                        image: "https://th.bing.com/th/id/R.56056a9b9f59e5054a147ee2a4c7f86b?rik=PZv4xJ9ciBLoxg&pid=ImgRaw&r=0",
                        price: 85,
                    },
                ],
            },
            {
                name: "Carnes y Pescados",
                products: [
                    { name: "Pechuga de Pollo - 1kg", image: "https://th.bing.com/th/id/R.47f2d34796659508feae255eb81ee4bd?rik=AytqSk%2fZzyrt1Q&riu=http%3a%2f%2flivingandtravel.com.mx%2fwp-content%2fuploads%2f2017%2f11%2fcarne-asada-comida.jpg&ehk=wie4uCkRMjDC6VnXHZtDPNWpM09zkMb169csNO8OUn8%3d&risl=&pid=ImgRaw&r=0", price: 250 },
                    { name: "Carne Molida de Res - 500g", image: "https://th.bing.com/th/id/R.47f2d34796659508feae255eb81ee4bd?rik=AytqSk%2fZzyrt1Q&riu=http%3a%2f%2flivingandtravel.com.mx%2fwp-content%2fuploads%2f2017%2f11%2fcarne-asada-comida.jpg&ehk=wie4uCkRMjDC6VnXHZtDPNWpM09zkMb169csNO8OUn8%3d&risl=&pid=ImgRaw&r=0", price: 180 },
                    { name: "Filete de Salmón - 200g", image: "https://th.bing.com/th/id/R.47f2d34796659508feae255eb81ee4bd?rik=AytqSk%2fZzyrt1Q&riu=http%3a%2f%2flivingandtravel.com.mx%2fwp-content%2fuploads%2f2017%2f11%2fcarne-asada-comida.jpg&ehk=wie4uCkRMjDC6VnXHZtDPNWpM09zkMb169csNO8OUn8%3d&risl=&pid=ImgRaw&r=0", price: 300 },
                    { name: "Camarones - 1kg", image: "https://th.bing.com/th/id/R.47f2d34796659508feae255eb81ee4bd?rik=AytqSk%2fZzyrt1Q&riu=http%3a%2f%2flivingandtravel.com.mx%2fwp-content%2fuploads%2f2017%2f11%2fcarne-asada-comida.jpg&ehk=wie4uCkRMjDC6VnXHZtDPNWpM09zkMb169csNO8OUn8%3d&risl=&pid=ImgRaw&r=0", price: 750 }
                ]
            },
            {
                name: "Frutas y Vegetales",
                products: [
                    { name: "Manzana Roja - 1kg", image: "https://th.bing.com/th/id/R.4b2a3910f26fde02d084e8e43e962c4b?rik=xqdwwzFAE1n9GQ&riu=http%3a%2f%2fmedia-cache-ak0.pinimg.com%2f1200x%2f74%2f20%2f93%2f742093b4cd90c9746616601a74c60593.jpg&ehk=Me5BxlzOJSTnYMgUeD7QXpmK10cWLOCW3IjAqhCIp68%3d&risl=&pid=ImgRaw&r=0", price: 120 },
                    { name: "Banana - Docena", image: "https://th.bing.com/th/id/R.4b2a3910f26fde02d084e8e43e962c4b?rik=xqdwwzFAE1n9GQ&riu=http%3a%2f%2fmedia-cache-ak0.pinimg.com%2f1200x%2f74%2f20%2f93%2f742093b4cd90c9746616601a74c60593.jpg&ehk=Me5BxlzOJSTnYMgUeD7QXpmK10cWLOCW3IjAqhCIp68%3d&risl=&pid=ImgRaw&r=0", price: 60 },
                    { name: "Papa - 1kg", image: "https://th.bing.com/th/id/R.4b2a3910f26fde02d084e8e43e962c4b?rik=xqdwwzFAE1n9GQ&riu=http%3a%2f%2fmedia-cache-ak0.pinimg.com%2f1200x%2f74%2f20%2f93%2f742093b4cd90c9746616601a74c60593.jpg&ehk=Me5BxlzOJSTnYMgUeD7QXpmK10cWLOCW3IjAqhCIp68%3d&risl=&pid=ImgRaw&r=0", price: 80 },
                    { name: "Lechuga Romana - Unidad", image: "https://th.bing.com/th/id/R.4b2a3910f26fde02d084e8e43e962c4b?rik=xqdwwzFAE1n9GQ&riu=http%3a%2f%2fmedia-cache-ak0.pinimg.com%2f1200x%2f74%2f20%2f93%2f742093b4cd90c9746616601a74c60593.jpg&ehk=Me5BxlzOJSTnYMgUeD7QXpmK10cWLOCW3IjAqhCIp68%3d&risl=&pid=ImgRaw&r=0", price: 45 }
                ]
            },
            {
                name: "Bebidas",
                products: [
                    { name: "Agua Embotellada - 1.5L", image: "https://www.losvinos.com.ar/wp-content/uploads/2019/10/Bebidas-Alcoholicas.jpg", price: 30 },
                    { name: "Jugo de Naranja - 1L", image: "https://www.losvinos.com.ar/wp-content/uploads/2019/10/Bebidas-Alcoholicas.jpg", price: 80 },
                    { name: "Vino Tinto - 750ml", image: "https://www.losvinos.com.ar/wp-content/uploads/2019/10/Bebidas-Alcoholicas.jpg", price: 450 },
                    { name: "Cerveza - 6 Pack", image: "https://www.losvinos.com.ar/wp-content/uploads/2019/10/Bebidas-Alcoholicas.jpg", price: 250 }
                ]
            },
            {
                name: "Panadería y Repostería",
                products: [
                    { name: "Baguette", image: "https://d100mj7v0l85u5.cloudfront.net/s3fs-public/WhatsApp-Image-2021-10-22-at-3.04.14-PM.jpeg", price: 80 },
                    { name: "Croissant", image: "https://d100mj7v0l85u5.cloudfront.net/s3fs-public/WhatsApp-Image-2021-10-22-at-3.04.14-PM.jpeg", price: 300 },
                    { name: "Pastel de Chocolate", image: "https://d100mj7v0l85u5.cloudfront.net/s3fs-public/WhatsApp-Image-2021-10-22-at-3.04.14-PM.jpeg", price: 500 },
                    
                ]
            }
        ]
    }

    return(
        <div className={styles.mainContainer}>
            <img
                src={store.frontImage}
                className={styles.frontImage}
            />
            <div className={styles.detailsContainer}>
                <img
                    src={store.logo}
                    width="30%"
                    className={styles.logo}
                    />
                <div className={styles.textContainer}>
                    <h3>Supermercado {store.name}</h3>
                    <p>{store.description}</p>
                </div>
            </div>

            <div className={styles.categories}>
                {store.categories.map((category, index)=>(
                    <div key={index}>
                        <h3 className={styles.categoriesTitles}>{category.name}</h3>
                        <Carousel products={category.products} carouselId={`carousel-${index}`} />
                    </div>
                ))}
            </div>
        </div>
    )
}