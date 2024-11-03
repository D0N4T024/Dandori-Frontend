import { Readex_Pro, Poppins } from "next/font/google";


export const readexPro = Readex_Pro({ 
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700"],
  variable: '--font-readexPro'
});

export const poppins = Poppins({ 
    subsets: ["latin"],
    weight: ["100", "200", "300", "400", "500", "600", "700"],
    variable: '--font-poppins'
  });