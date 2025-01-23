"use client";
import React, { useState, forwardRef } from "react";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import styled from "@mui/system/styled";

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


const TextFields = forwardRef(function TextFields({ type, icon: Icon, errorMessage, bgcolor, value: Value, disabled: Disabled, placeholder: Placeholder, ...props }, ref) {
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return type === "text" ? (
    <CustomTextField
      placeholder={Placeholder ? Placeholder : null}
      {...props} // Pasamos todas las props, incluido {...register}
      inputRef={ref} // Usamos inputRef para forwardRef
      variant="outlined"
      type="text"
      value={Value ? Value : undefined}
      disabled={Disabled ? Disabled : false}
      error={!!errorMessage}
      helperText={errorMessage}
      bgcolor={bgcolor}
      slotProps={{
        input: {
          startAdornment: Icon ? (
            <InputAdornment position="start">
              <Icon />
            </InputAdornment>
          ) : undefined
        }
      }}
      fullWidth
    />
  ) : (
    <CustomTextField
      placeholder={Placeholder ? Placeholder : null}
      {...props}
      inputRef={ref}
      variant="outlined"
      type={showPassword ? "text" : "password"}
      value={Value ? Value: undefined}
      error={!!errorMessage}
      helperText={errorMessage}
      bgcolor={bgcolor}
      slotProps={{
        input: {
          startAdornment: Icon ? (
            <InputAdornment position="start">
              <Icon />
            </InputAdornment>
          ) : undefined,
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={handleClickShowPassword} edge="end">
                {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
              </IconButton>
            </InputAdornment>
          )
        }
      }}
      fullWidth
    />
  );
});

export default TextFields;