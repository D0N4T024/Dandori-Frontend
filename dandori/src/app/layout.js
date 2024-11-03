import "./globals.css";
import { Providers } from "./providers";
import { readexPro, poppins } from "@/font/font";

export const metadata = {
    title: "Dandori - Simplificando tus decisiones de compras de supermercado",
    description: "Con nuestra plataforma, puedes comparar precios y valores nutricionales de una amplia variedad de productos en diferentes tiendas, asegurándote de tomar decisiones más conscientes, saludables y económicas.",
};

export default function RootLayout({ children }) {
  return (
        <html lang="en" suppressHydrationWarning>
            <body className={`${readexPro.variable} ${poppins.variable} font-sans`}>
                <Providers>
                    {children}
                </Providers>
            </body>
        </html>
    );
}