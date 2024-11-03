import Image from "next/image";
import styles from "./page.module.css";
import Categories from "@/components/Categories";
import HowWorks from "@/components/HowWorks";
import CustomizableModal from "@/components/CustomizableModal";

//Json de ejemplo
const categories = [
  {id: 1, title: "Palabra algo larga", image: "https://d1uz88p17r663j.cloudfront.net/original/f6cf6c49aa4731bc3736b82add57e572_Salsas10.jpg"},
  {id: 2, title: "Pollo Horneado", image: "https://d1uz88p17r663j.cloudfront.net/original/f6cf6c49aa4731bc3736b82add57e572_Salsas10.jpg"},
  {id: 3, title: "Pollo Horneado", image: "https://d1uz88p17r663j.cloudfront.net/original/f6cf6c49aa4731bc3736b82add57e572_Salsas10.jpg"},
  {id: 4, title: "Pollo Horneado", image: "https://d1uz88p17r663j.cloudfront.net/original/f6cf6c49aa4731bc3736b82add57e572_Salsas10.jpg"},
  {id: 5, title: "Pollo Horneado", image: "https://d1uz88p17r663j.cloudfront.net/original/f6cf6c49aa4731bc3736b82add57e572_Salsas10.jpg"},
  {id: 6, title: "Pollo Horneado", image: "https://d1uz88p17r663j.cloudfront.net/original/f6cf6c49aa4731bc3736b82add57e572_Salsas10.jpg"},
  {id: 7, title: "Sopa", image: "https://d1uz88p17r663j.cloudfront.net/original/f6cf6c49aa4731bc3736b82add57e572_Salsas10.jpg"},
  {id: 8, title: "Sopa", image: "https://d1uz88p17r663j.cloudfront.net/original/f6cf6c49aa4731bc3736b82add57e572_Salsas10.jpg"},
  {id: 9, title: "Sopa", image: "https://d1uz88p17r663j.cloudfront.net/original/f6cf6c49aa4731bc3736b82add57e572_Salsas10.jpg"},
  {id: 10, title: "Leche", image: "https://images.ecestaticos.com/VR8NedfEpTVzadPw3Nj6HWbTcWY=/344x137:2069x1430/1200x900/filters:fill(white):format(jpg)/f.elconfidencial.com%2Foriginal%2Fca5%2Fbc7%2F722%2Fca5bc77220eff15f92037b9e45d6c356.jpg"},
  {id: 11, title: "Leche", image: "https://images.ecestaticos.com/VR8NedfEpTVzadPw3Nj6HWbTcWY=/344x137:2069x1430/1200x900/filters:fill(white):format(jpg)/f.elconfidencial.com%2Foriginal%2Fca5%2Fbc7%2F722%2Fca5bc77220eff15f92037b9e45d6c356.jpg"},
  {id: 12, title: "Leche", image: "https://images.ecestaticos.com/VR8NedfEpTVzadPw3Nj6HWbTcWY=/344x137:2069x1430/1200x900/filters:fill(white):format(jpg)/f.elconfidencial.com%2Foriginal%2Fca5%2Fbc7%2F722%2Fca5bc77220eff15f92037b9e45d6c356.jpg"},
  {id: 13, title: "Cereal", image: "https://s1.eestatic.com/2018/11/06/ciencia/nutricion/Cereales-Nutricion-Alimentacion-Nutricion_351228002_104730645_1706x1706.jpg"},
  {id: 14, title: "Cereal", image: "https://s1.eestatic.com/2018/11/06/ciencia/nutricion/Cereales-Nutricion-Alimentacion-Nutricion_351228002_104730645_1706x1706.jpg"},
  {id: 15, title: "Cereal", image: "https://s1.eestatic.com/2018/11/06/ciencia/nutricion/Cereales-Nutricion-Alimentacion-Nutricion_351228002_104730645_1706x1706.jpg"},
  {id: 16, title: "Cereal", image: "https://s1.eestatic.com/2018/11/06/ciencia/nutricion/Cereales-Nutricion-Alimentacion-Nutricion_351228002_104730645_1706x1706.jpg"},
  {id: 17, title: "Cereal", image: "https://s1.eestatic.com/2018/11/06/ciencia/nutricion/Cereales-Nutricion-Alimentacion-Nutricion_351228002_104730645_1706x1706.jpg"},
  {id: 18, title: "Cereal", image: "https://s1.eestatic.com/2018/11/06/ciencia/nutricion/Cereales-Nutricion-Alimentacion-Nutricion_351228002_104730645_1706x1706.jpg"},
  {id: 19, title: "Pollo Horneado", image: "https://d1uz88p17r663j.cloudfront.net/original/f6cf6c49aa4731bc3736b82add57e572_Salsas10.jpg"},
  {id: 20, title: "Pollo Horneado", image: "https://d1uz88p17r663j.cloudfront.net/original/f6cf6c49aa4731bc3736b82add57e572_Salsas10.jpg"},
  {id: 21, title: "Pollo Horneado", image: "https://d1uz88p17r663j.cloudfront.net/original/f6cf6c49aa4731bc3736b82add57e572_Salsas10.jpg"},
  {id: 22, title: "Pollo Horneado", image: "https://d1uz88p17r663j.cloudfront.net/original/f6cf6c49aa4731bc3736b82add57e572_Salsas10.jpg"},
  {id: 23, title: "Pollo Horneado", image: "https://d1uz88p17r663j.cloudfront.net/original/f6cf6c49aa4731bc3736b82add57e572_Salsas10.jpg"},
  {id: 24, title: "Pollo Horneado", image: "https://d1uz88p17r663j.cloudfront.net/original/f6cf6c49aa4731bc3736b82add57e572_Salsas10.jpg"},
  {id: 25, title: "Sopa", image: "https://d1uz88p17r663j.cloudfront.net/original/f6cf6c49aa4731bc3736b82add57e572_Salsas10.jpg"},
  {id: 26, title: "Sopa", image: "https://d1uz88p17r663j.cloudfront.net/original/f6cf6c49aa4731bc3736b82add57e572_Salsas10.jpg"},
  {id: 27, title: "Sopa", image: "https://d1uz88p17r663j.cloudfront.net/original/f6cf6c49aa4731bc3736b82add57e572_Salsas10.jpg"},
  {id: 28, title: "Leche", image: "https://images.ecestaticos.com/VR8NedfEpTVzadPw3Nj6HWbTcWY=/344x137:2069x1430/1200x900/filters:fill(white):format(jpg)/f.elconfidencial.com%2Foriginal%2Fca5%2Fbc7%2F722%2Fca5bc77220eff15f92037b9e45d6c356.jpg"},
  {id: 29, title: "Leche", image: "https://images.ecestaticos.com/VR8NedfEpTVzadPw3Nj6HWbTcWY=/344x137:2069x1430/1200x900/filters:fill(white):format(jpg)/f.elconfidencial.com%2Foriginal%2Fca5%2Fbc7%2F722%2Fca5bc77220eff15f92037b9e45d6c356.jpg"},
  {id: 30, title: "Leche", image: "https://images.ecestaticos.com/VR8NedfEpTVzadPw3Nj6HWbTcWY=/344x137:2069x1430/1200x900/filters:fill(white):format(jpg)/f.elconfidencial.com%2Foriginal%2Fca5%2Fbc7%2F722%2Fca5bc77220eff15f92037b9e45d6c356.jpg"},
  {id: 31, title: "Cereal", image: "https://s1.eestatic.com/2018/11/06/ciencia/nutricion/Cereales-Nutricion-Alimentacion-Nutricion_351228002_104730645_1706x1706.jpg"},
  {id: 32, title: "Cereal", image: "https://s1.eestatic.com/2018/11/06/ciencia/nutricion/Cereales-Nutricion-Alimentacion-Nutricion_351228002_104730645_1706x1706.jpg"},
  {id: 33, title: "Cereal", image: "https://s1.eestatic.com/2018/11/06/ciencia/nutricion/Cereales-Nutricion-Alimentacion-Nutricion_351228002_104730645_1706x1706.jpg"},
  {id: 34, title: "Cereal", image: "https://s1.eestatic.com/2018/11/06/ciencia/nutricion/Cereales-Nutricion-Alimentacion-Nutricion_351228002_104730645_1706x1706.jpg"},
  {id: 35, title: "Cereal", image: "https://s1.eestatic.com/2018/11/06/ciencia/nutricion/Cereales-Nutricion-Alimentacion-Nutricion_351228002_104730645_1706x1706.jpg"},
  {id: 36, title: "Cereal", image: "https://s1.eestatic.com/2018/11/06/ciencia/nutricion/Cereales-Nutricion-Alimentacion-Nutricion_351228002_104730645_1706x1706.jpg"},
]

export default function Home() {

  return (
    <main className={styles.main}>
      <div className={styles.promotion}>
        <div className={styles.promotionText}>
          <h2 className={styles.promotionTitle}><button><HowWorks design="slogan" text="Simplificando"/></button>&nbsp;tus decisiones de compras de supermercado</h2>
          <p className={styles.promotionDescription}>Con nuestra plataforma, puedes&nbsp;<button><HowWorks design="description" text="comparar"/></button>&nbsp;precios y valores nutricionales de una amplia variedad de productos en diferentes tiendas, asegurándote de tomar decisiones más conscientes, saludables y económicas.</p>
        </div>
        <Image
          src="/Big Dandori Promotion.png"
          alt="Descripción de la imagen"
          width={750}
          height={750}
          priority={true}
          className={styles.promotionImage}
        />
      </div>

      {/* <div>
        <h1>Como funcIona</h1>
        <h2>Como funciona</h2>
        <h3>Como funciona</h3>
        <h4>Como funciona</h4>
        <h5>Como funciona</h5>
        <p>Como funciona</p>
        <br/>

        <h1 style={{fontFamily:"var(--font-poppins)"}} className="text-5xl">Encabezado H1</h1>
        <h2 style={{fontFamily:"var(--font-poppins)"}} className="text-4xl">Encabezado H2</h2>
        <h2 style={{fontFamily:"var(--font-poppins)"}} className="text-3xl">Encabezado H3</h2>
        <h2 style={{fontFamily:"var(--font-poppins)"}} className="text-2xl">Encabezado H4</h2>
        <h2 style={{fontFamily:"var(--font-poppins)"}} className="text-1xl">Encabezado H5</h2>
        <p style={{fontFamily:"var(--font-poppins)"}} className="text-base">Este es un párrafo p</p>
        <br/>

        <h1 style={{fontFamily:"var(--font-poppins)"}} className="text-h1">Encabezado H1</h1>
        <h2 style={{fontFamily:"var(--font-poppins)"}} className="text-h2">Encabezado H2</h2>
        <p style={{fontFamily:"var(--font-poppins)"}} className="text-p">Este es un párrafo p</p>

      </div> */}

      <div className={styles.categoriesContainer}>
        <h3>Categorias de comida</h3>
        <Categories categories={categories}/>
      </div>

      {/* <div>
        Comida recomendada
      </div>

      <div>
        Comida popular
      </div> */}


      
      {/* <img src="https://static.vecteezy.com/system/resources/previews/005/068/370/non_2x/abstract-orange-and-white-color-background-with-geometric-shape-illustration-vector.jpg" alt="img"/> */}
      
    </main>
  );
}