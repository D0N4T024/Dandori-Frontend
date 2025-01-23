"use client";
// components/BarcodeScanner.jsx
import { useState, useRef, useEffect } from "react";
import { BrowserMultiFormatReader, NotFoundException } from "@zxing/library";
import { Skeleton } from "@mui/material";
import styles from "./CodeScanner.module.css";
import Button from "@mui/material/Button";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import { useRouter } from "next/navigation";
import CustomizableModal from "./CustomizableModal";
import Tooltip from "@mui/material/Tooltip";
import QrCode2Icon from "@mui/icons-material/QrCode2";
import Zoom from "@mui/material/Zoom";
import { getAllSimpleSupermarkets } from "@/app/services/supermarket";

function Dropdown({ onSelection }) {
  const [supermarkets, setSupermarkets] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("Seleccion");

  console.log("supermercados: ", supermarkets)
  console.log("Seeleccion: ", selectedOption)

  useEffect(() => {
    const fetchSupermarkets = async () => {
      try {
        const response = await getAllSimpleSupermarkets();
        setSupermarkets(response.data);
      } catch (error) {
        console.error("Error fetching supermarkets:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchSupermarkets();
  }, []);

  if (error) return <p style={{ color: "red" }}>{error}</p>;

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleOptionClick = (option, path) => {
    setSelectedOption(option);
    setIsOpen(false);
    onSelection(path);
  };

  return (
    <div className={styles.dropdown}>
      <div className={styles.quantityDropdown} onClick={toggleDropdown}>
        <h5>{selectedOption}</h5>
        {isOpen ? <ExpandMoreIcon /> : <ExpandLessIcon />}
      </div>
      {isOpen && (
        <ClickAwayListener onClickAway={toggleDropdown}>
          <ul className={styles.dropdownMenu}>
            {supermarkets.map((supermarket, index) => (
              <li
                key={index}
                className={styles.dropdownOption}
                onClick={() => handleOptionClick(supermarket.name, supermarket.supermarketId)}
              >
                {supermarket.name}
              </li>
            ))}
          </ul>
        </ClickAwayListener>
      )}
    </div>
  );
}


const CodeScanner = () => {
  const videoRef = useRef(null);
  const codeReader = new BrowserMultiFormatReader();
  const [isCodeDetected, setIsCodeDetected] = useState(false);
  const [scanning, setScanning] = useState(false);
  const [supermarket, setSupermarket] = useState(null);
  const modalRef = useRef(null); // Referencia para controlar el modal

  console.log("Scanning scanning: ", scanning)
  console.log("Scanning Super: ", supermarket)



  const router = useRouter();

  const handleDetected = (code) => {
    if (isCodeDetected) return; // Evita manejar múltiples detecciones
    setIsCodeDetected(true);
    
    console.log("Código detectado:", code);
    //Logica para mandar al producto
    router.push(`/store/${supermarket}/${code}?scanned-code=true`);
    if (modalRef.current) {
      modalRef.current.handleClose(); // Llama a handleClose del modal
    }
  };

  const handleSelection = (value) => {
    setSupermarket(value);
  };

  const startScanning = async () => {
    console.log("Se enciende la camara")
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: "environment", // Usa la cámara trasera
        },
      });
      videoRef.current.srcObject = stream;
      videoRef.current.setAttribute("playsinline", true); // Requiere para iOS
      if (videoRef.current.paused) {
        await videoRef.current.play();
      }
      setScanning(true); // Cambia el estado a escaneando

      codeReader.decodeFromVideoDevice(
        undefined,
        videoRef.current,
        (result, err) => {
          if (result) {
            console.log("detecto un codigo")
            handleDetected(result.text); // Llama a la función onDetected con el código leído
            // handleModalClose(); // Detiene el escaneo
          }
          if (err && !(err instanceof NotFoundException)) {
            console.error(err);
          }
        }
      );
    } catch (err) {
      console.error("Error al acceder a la cámara:", err);
    }
  };

  const stopScanning = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      videoRef.current.srcObject.getTracks().forEach((track) => track.stop());
      // videoRef.current.srcObject = null;
      codeReader.reset();
      console.log("Apagando cámara");
    }
    setScanning(false);
  };

  const handleModalClose = () => {
    console.log("prueba de cerrar 1")
    setScanning(false)
    setSupermarket(null)
    setIsCodeDetected(false);
    if (scanning) {
      stopScanning()
    }
  }

  const renderScanningContent = () => (
    <div className={styles.scanningContainer}>
      <h3>Escáner de Código</h3>
      <div className={styles.videoContainer}>
        <Skeleton
          sx={
            scanning
              ? { display: "none", minHeight: "200px" }
              : { display: "block", minHeight: "200px" }
          }
        />
        <video
          ref={videoRef}
          style={scanning ? { display: "block" } : { display: "none" }}
        />
      </div>
      <div className={styles.options}>
        <h5>Seleccione la tienda: </h5>
        <Dropdown onSelection={handleSelection} />
        {scanning ? (
          <div>
            <Button
              onClick={stopScanning}
              variant="contained"
              className={"font-semibold"}
              sx={{
                background: "#F71735",
                color: "#000000",
                borderRadius: "25px",
                fontFamily: "var(--font-poppins)",
                fontSize: "12px",
              }}
            >
              Detener Escaneo
            </Button>
          </div>
        ) : (
          <div>
            <Button
              onClick={startScanning}
              disabled={supermarket ? false : true}
              variant="contained"
              className={"font-semibold"}
              sx={{
                color: "#000000",
                borderRadius: "25px",
                fontFamily: "var(--font-poppins)",
                fontSize: "12px",
              }}
            >
              Escanear Código
            </Button>
          </div>
        )}
      </div>
    </div>
  )

  return (
    <div>
      <Tooltip
        title="Lector QR"
        enterDelay={500}
        TransitionComponent={Zoom}
        arrow
      >
        <button className="iconButton">
          <CustomizableModal
            ref={modalRef} // Pasa la referencia al modal
            content={renderScanningContent}
            textTag={() => {
              return <QrCode2Icon />;
            }}
            onClose={handleModalClose}
          />
        </button>
      </Tooltip>
    </div>
  );
};

export default CodeScanner;
