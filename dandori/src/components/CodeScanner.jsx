"use client"
// components/BarcodeScanner.jsx
import { useState, useRef } from 'react';
import { BrowserMultiFormatReader, NotFoundException } from '@zxing/library';
import { Skeleton } from '@mui/material';
import styles from './CodeScanner.module.css'
import Button from "@mui/material/Button";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import { useRouter } from 'next/navigation';
import CustomizableModal from './CustomizableModal';
import Tooltip from "@mui/material/Tooltip"
import QrCode2Icon from '@mui/icons-material/QrCode2';
import Zoom from '@mui/material/Zoom';

const supermarkets = [
  {id: 1, title: "Sirena"},
  {id: 2, title: "Jumbo"},
  {id: 3, title: "Bravo"},
  {id: 4, title: "Nacional"},
]

function Dropdown ({ onSelection}) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("Seleccion");

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleOptionClick = (option) => {
      setSelectedOption(option);
      setIsOpen(false);
      onSelection(option)
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
                      {supermarkets.map((supermarket, index) => (
                          <li
                              key={index}
                              className={styles.dropdownOption}
                              onClick={() => handleOptionClick(supermarket.title)}
                          >
                              {supermarket.title}
                          </li>
                      ))}
                  </ul>
              </ClickAwayListener>
          )}
      </div>
  )
}

const Scanning = () => {
  const videoRef = useRef(null);
  const codeReader = new BrowserMultiFormatReader();
  const [scanning, setScanning] = useState(false);

  // const [scannedCode, setScannedCode] = useState(null);
  const [supermarket, setSupermarket] = useState(null);

  const router = useRouter();

  const handleDetected = (code) => {
    // setScannedCode(code);
    console.log('Código detectado:', code);
    //Logica para mandar al producto
    router.push(`/store/${supermarket}/${code}`);
  };

  const handleSelection = (value) => {
    setSupermarket(value)
  }


  

  const startScanning = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: 'environment', // Usa la cámara trasera
        },
      });
      videoRef.current.srcObject = stream;
      videoRef.current.setAttribute('playsinline', true); // Requiere para iOS
      videoRef.current.play();
      setScanning(true); // Cambia el estado a escaneando

      codeReader.decodeFromVideoDevice(undefined, videoRef.current, (result, err) => {
        if (result) {
          handleDetected(result.text); // Llama a la función onDetected con el código leído
          stopScanning(); // Detiene el escaneo
        }
        if (err && !(err instanceof NotFoundException)) {
          console.error(err);
        }
      });
    } catch (err) {
      console.error('Error al acceder a la cámara:', err);
    }
  };

  const stopScanning = () => {
    if (videoRef.current) {
      videoRef.current.srcObject.getTracks().forEach((track) => track.stop()); // Detiene la cámara
      codeReader.reset(); // Reinicia el lector
      setScanning(false); // Cambia el estado a no escaneando
    }
  };

  return (
    <div className={styles.scanningContainer}>
      <h3>Escáner de Código</h3>
      <div className={styles.videoContainer}>
        <Skeleton sx={scanning ? {display:"none", minHeight:"200px"} : {display:"block", minHeight:"200px"}}/>
        <video ref={videoRef} style={scanning ? {display:"block"} : {display:"none"}}/>
      </div>
      <div className={styles.options}>
        <h5>Seleccione la tienda: </h5>
        <Dropdown onSelection={handleSelection}/>
        {scanning ?
          ( 
            <div>
              <Button onClick={stopScanning} variant="contained" className={"font-semibold"} sx={{ background:"#F71735", color: "#000000", borderRadius: "25px", fontFamily: "var(--font-poppins)", fontSize: "12px"}}>
                Detener Escaneo
              </Button>
            </div>
          ) : (
            <div>
              <Button onClick={startScanning} disabled={supermarket ? false : true} variant="contained" className={"font-semibold"} sx={{  color: "#000000", borderRadius: "25px", fontFamily: "var(--font-poppins)", fontSize: "12px"}}>
                Escanear Código
              </Button>
            </div>
          )}
      </div>
    </div>
  );
};

const CodeScanner = () => {
  return (
    <div>
      <Tooltip title="Lector QR" enterDelay={500} TransitionComponent={Zoom} arrow>
        <button className='iconButton'>
          <CustomizableModal
            content={Scanning}
            textTag={() => {return <QrCode2Icon/>}}
          />
        </button>
      </Tooltip>
    </div>
  );
};

export default CodeScanner;