import React, { useEffect } from "react";
import { Toaster, toast } from "react-hot-toast";
import { useSnackBar } from "./CommonContext";

function CustomSnackBar() {
  const { updateSnackBarState, snackBarState } = useSnackBar();

  useEffect(() => {
    if (snackBarState && snackBarState.snackbarOpen) {
      if (snackBarState.snackbarSeverity == "success") {
        toast.success(snackBarState.snackbarMessage, {});
      } else if (snackBarState.snackbarSeverity == "error") {
        toast.error(snackBarState.snackbarMessage);
      }
    }
  }, [snackBarState]);

  return (
    <>
      <Toaster
        position="top-center"
        reverseOrder={false}
        autoClose="3000"
        closeOnClick={true}
        toastOptions={{}}
      />
    </>
  );
}

export default CustomSnackBar;
