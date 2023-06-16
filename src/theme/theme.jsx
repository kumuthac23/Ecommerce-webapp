import { createTheme, styled } from "@mui/material/styles";
import { red } from "@mui/material/colors";
import { Button } from "@mui/material";

// Create a theme instance.
const theme = createTheme({
  palette: {
    primary: {
      main: "#914298",
    },
    secondary: {
      main: "#ece7ee",
    },
    error: {
      main: red.A400,
    },
  },
  typography: {
    fontFamily: "Inter-Regular",
    button: {
      textTransform: "none",
      fontWeight: 500,
      textDecoration: "none",
    },
  },
});

// export const StyledButton = styled(Button)({
//   textTransform: "none",
//   fontWeight: 500,
//   textDecoration: "none",
// });

export default theme;
