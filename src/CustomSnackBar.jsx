import React from "react";
import CloseIcon from "@mui/icons-material/Close";
import Snackbar from "@mui/material/Snackbar";
import { IconButton, Slide } from "@mui/material";
import Alert from "@mui/material/Alert";

function CustomSnackBar({ snackbarOpen, snackbarMessage, onClose,severity }) {
  return (
    <div>
      
      <Snackbar
      
        open={snackbarOpen}
        autoHideDuration={2000}
        onClose={onClose}
        message={snackbarMessage}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        TransitionComponent={(props) => <Slide {...props} direction="left" />}
        action={
          <IconButton
            size="small"
            aria-label="close"
            color="inherit"
            onClick={onClose}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        }
      >
        <Alert onClose={onClose} severity={severity} >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </div>
  );
}

export default CustomSnackBar;
