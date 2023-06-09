import { makeStyles } from "@mui/styles";

export const useNavbarStyle = makeStyles((theme) => ({
  root: {
   
  },
  activeLink: {
    textDecoration: "none",
    color: `${theme.palette.primary.main} !important`,

    "& .MuiListItemButton-root": {
      backgroundColor: `${theme.palette.primary.main} !important`,
      color: "white",
    },
  },
}));
