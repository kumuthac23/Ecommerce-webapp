import React, { useEffect } from "react";
import CloseIcon from "@mui/icons-material/Close";
import Snackbar from "@mui/material/Snackbar";
import { IconButton, Slide } from "@mui/material";
import Alert from "@mui/material/Alert";
import { Toaster, toast } from "react-hot-toast";

function CustomSnackBar({ snackBarObj, onClose }) {
  useEffect(() => {
    if (snackBarObj && snackBarObj.snackbarOpen) {
      if (snackBarObj.snackbarSeverity == "success") {
        toast.success(snackBarObj.snackbarMessage, {});
      } else if (snackBarObj.snackbarSeverity == "error") {
        toast.error(snackBarObj.snackbarMessage);
      }
    }
  }, [snackBarObj]);
  return (
    <>
      <Toaster 
      position="top-center" 
      reverseOrder={false} 
      autoClose="3000" 
      closeOnClick= {true}
      toastOptions={{}} />
    </>
  );
}

export default CustomSnackBar;
