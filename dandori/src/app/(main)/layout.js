import { Readex_Pro } from "next/font/google";
import "../globals.css";
import { Providers } from "../providers";

const readexPro = Readex_Pro({ subsets: ["latin"] });

export const metadata = {
  title: "Dandori",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={readexPro.className}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
