"use client"
import { useState } from "react";
import styles from "../Forms.module.css"
import TextField from "@mui/material/TextField";
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import { showToast } from "@/components/CustomizedSnackbars";
import CircularProgress from '@mui/material/CircularProgress';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';

const GradientButton = styled(Button)({
    background: "linear-gradient(to right, #F71735, #FF9F1C)",
    borderRadius: "10px",
    color: "#000",
    padding: "14px 30px",
    fontSize: "18px",
    textTransform: "none",
    boxShadow: "0 5px 10px rgba(128, 128, 128, 0.4)",
    "&:hover": {
        boxShadow: "0 5px 10px rgba(128, 128, 128, 0.6)",
    },
    "&:active": {
        filter: "brightness(0.9)",
        boxShadow: "0 0 0 rgba(128, 128, 128, 0.4)",
    },
});

const CustomTextField = styled(TextField)(({ bgcolor }) => ({
    "& .MuiOutlinedInput-root": {
      backgroundColor: bgcolor || "#D6FCE6",
      borderRadius: "10px",
      "& fieldset": {
        border: "1px solid #E0E0E0",
      },
      "&:hover fieldset": {
        borderColor: "#A8A8A8",
      },
      "&.Mui-focused fieldset": {
        borderColor: "#A8A8A8",
      },
    },
    "& .MuiInputBase-input": {
      color: "#0F1111",
    },
}));

export default function DeleteItem({ onItemDeleted, id, title, deleteService }) {
    const [loading, setLoading] = useState(false);

    const onSubmit = async () => {
        if (!deleteService) {
            showToast("No se proporcionó un servicio de eliminación", "error", 5000);
            return;
        }

        try {
            setLoading(true);
            const response = await deleteService(id); // Use the passed delete service
            if (response?.success) {
                showToast("Eliminación exitosa", "success", 5000);
                if (onItemDeleted) {
                    onItemDeleted(); // Notify the parent component to refresh data
                }
            } else {
                showToast(response?.message || "Error al eliminar el elemento", "error", 5000);
            }
        } catch (error) {
            showToast("Error al ejecutar el servicio de eliminación", "error", 5000);
        } finally {
            setLoading(false);
        }
    };

    return(
        <div className={styles.bodyContainer}>
            <div className={styles.centerContainer}>
                <div className={styles.titleContainer}>
                    <h3 className={styles.titles}>{title || "Elimminar"}</h3>
                    <DeleteRoundedIcon fontSize="medium"/>
                </div>

                <div className={styles.fieldsContainer}>
                    <label htmlFor="name"><b>Identificador</b></label>
                    <CustomTextField
                        variant="outlined"
                        type="text"
                        value={id ? id : ""}
                        disabled={true}
                        bgcolor="#ffffff"
                        fullWidth
                    />
                    <GradientButton type="submit" disableRipple disabled={loading} onClick={onSubmit}>
                        {loading
                            ? <CircularProgress sx={{ color:"#fcbac1" }} size="30px"/>
                            : <h4 className={styles.buttonTitle}>Confirmar</h4>}
                    </GradientButton>
                </div>
            </div>
        </div>
    )
}