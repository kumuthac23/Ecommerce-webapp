import { createTheme } from "@mui/material/styles";
import { red } from "@mui/material/colors";

// Create a theme instance.
const theme = createTheme({
  palette: {
    primary: {
      main: "#914298",
    },
    secondary: {
      main: "#CCB0D3",
    },
    error: {
      main: red.A400,
    },
  },
  typography: {
    fontFamily: "Inter-Regular",
  },
});

export default theme;
