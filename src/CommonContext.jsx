import React, { useContext } from "react";
import { useState, createContext, useEffect } from "react";
export const SnackBarContext = createContext();

function CommonProvider({ children }) {
  const [snackBarState, setSnackBarstate] = useState({
    snackbarOpen: false,
    snackbarMessage: "",
    snackbarSeverity: "success",
  });

  const updateSnackBarState = (isOpen, message, severity) => {
    var obj = {
      snackbarOpen: isOpen,
      snackbarMessage: message,
      snackbarSeverity: severity,
    };
    setSnackBarstate({ ...obj });
  };

  return (
    <SnackBarContext.Provider value={{ snackBarState, updateSnackBarState }}>
      {children}
    </SnackBarContext.Provider>
  );
}
export function useSnackBar() {
  const context = useContext(SnackBarContext);
  return context;
}

export default CommonProvider;
