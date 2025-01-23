import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CommonLayout from "../layout";
import Toast from "@/components/CustomizedSnackbars";

export const metadata = {
  title: "Dandori - Simplificando tus decisiones de compras de supermercado",
  description: "Con nuestra plataforma, puedes comparar precios y valores nutricionales de una amplia variedad de productos en diferentes tiendas, asegurándote de tomar decisiones más conscientes, saludables y económicas.",
};

export default function MainLayout({ children }) {
  return (
    <CommonLayout>
      <Navbar/>
      <div style={{display:"flex", flexDirection: "column", minHeight: "100vh", justifyContent: "space-between"}}>
          {children}
          <Footer/>
          <Toast/>
      </div>
    </CommonLayout>
  );
}
