'use client'

import styles from './Navbar.module.css';
import IconButton from '@mui/material/IconButton';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ThemeSwitch from "./ThemeSwitch";
import LightModeIcon from '@mui/icons-material/LightMode';
import QrCode2Icon from '@mui/icons-material/QrCode2';
import SignInButton from './SignInButton';
import Searcher from './Searcher';
import SearchModal from './SearchModal';
import Link from 'next/link';
import { useEffect } from "react";
import Image from 'next/image';
import { Skeleton } from '@mui/material';
import Tooltip from '@mui/material/Tooltip';
import CustomizableModal from './CustomizableModal';
import CodeScanner from './CodeScanner';
import Zoom from '@mui/material/Zoom';


import SimpleSidebar from './SimpleSidebar';

export default function Navbar() {
  useEffect(() => {
    const navbar = document.querySelector("nav");

    const handleScroll = () => {
      if (window.scrollY > 0) {
        navbar.classList.add("scrolled");
      } else {
        navbar.classList.remove("scrolled");
      }
    };

    window.addEventListener("scroll", handleScroll);

    // Cleanup: eliminar el evento cuando el componente se desmonte
    return () => {
      window.removeEventListener("scroll", handleScroll); 
    };v
  }, []);

  return <nav>
    <div className={styles.leftContainer}>
      <div className={styles.SidebarToggle}>
        <SimpleSidebar/>
      </div>
      <Link href="/">
        <Image className={styles.largeLogo}
          src="/Horizontal Dandori Logo.svg"
          alt="Descripción de la imagen"
          width={200}
          height={200}
          priority={true}
        />
        <Image className={styles.shortLogo}
          src="/Dandori Icon.svg"
          alt="Descripción de la imagen"
          width={60}
          height={60}
          priority={true}
        />
      </Link>
      <Searcher/>
    </div>
    <div className={styles.rightContainer}>
      <Skeleton variant="circular" width={40} height={40} className={styles.concealable}/>
      <SearchModal/>
      
      
        <div className={styles.concealable}>
          <ThemeSwitch/>
        </div>
      
      <CodeScanner/>
      {/* <Tooltip title="Lector QR" enterDelay={500} TransitionComponent={Zoom} arrow>
        <button className={`iconButton ${styles.concealable}`}>
          <QrCode2Icon/>
        </button> 
      </Tooltip> */}
      
      <Tooltip title="Carrito" enterDelay={500} TransitionComponent={Zoom} arrow>
        <Link href="/cart" className="iconButton">
          <ShoppingCartIcon/>
        </Link>
      </Tooltip>
      <SignInButton/>
    </div>
  </nav>
}