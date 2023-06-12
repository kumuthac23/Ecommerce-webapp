import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { NavLink as NavLinkBase } from "react-router-dom";
import { useNavbarStyle } from "./styles/NavbarStyle";
import ShoppingBagRoundedIcon from "@mui/icons-material/ShoppingBagRounded";
import MyBag from "./MyBag";
import { Container } from "@mui/material";

const drawerWidth = "90vw";
const navItems = [
  { label: "Home", link: "/" },
  { label: "Profile", link: "/profile" },
  { label: "Orders", link: "/orders" },
  { label: "About", link: "/about" },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [isOpenMyBag, setMyBagOpen] = React.useState(false);
  
  const handleShoppingBagClick = () => {
    setMyBagOpen(true);
  };

  const classes = useNavbarStyle();

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const NavLink = React.forwardRef((props, ref) => (
    <NavLinkBase
      style={{
        textDecoration: "none",
      }}
      ref={ref}
      {...props}
      className={props.activeclassname ?? ""}
    />
  ));

  const drawer = (
    <Box
      onClick={handleDrawerToggle}
      sx={{ textAlign: "center", height: "100%" }}
    >
      <Box sx={{ my: 0 }}>
        <img
          style={{
            width: "100%",
            height: "inherit",
          }}
          src="/assets/logo.jpeg"
          alt=""
        />
      </Box>
      <List>
        {navItems.map((item) => (
          // <NavLink to={item.link} className="nav-link" aria-current="page">
          <ListItem
            key={item.label}
            disablePadding
            component={NavLink}
            to={item.link}
            activeclassname={({ isActive }) =>
              isActive ? classes.activeLink : ""
            }
          >
            <ListItemButton sx={{ textAlign: "center", borderRadius: "10px" }}>
              <ListItemText primary={item.label} />
            </ListItemButton>
          </ListItem>

          // </NavLink>
        ))}
      </List>
    </Box>
  );

  return (
    <Box
      sx={{ display: "flex", marginBottom: "-48px", flexGrow: 1 }}
      className={classes.root}
    >
      <CssBaseline />
      <AppBar component="nav">
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>

          <Box
            sx={{
              // display: { xs: "flex", md: "none" },
              width: 100,
            }}
          >
            <img
              style={{
                width: "100%",
                height: "inherit",
              }}
              src="/assets/logo.jpeg"
              alt=""
            />
          </Box>
          <Box sx={{ display: { xs: "none", sm: "block" } }}>
            {navItems.map((item) => (
              <Button key={item.label} sx={{ color: "#fff" }}>
                {item.label}
              </Button>
            ))}
          </Box>
          <Stack>
            <ShoppingBagRoundedIcon
              sx={{
                width: 36,
                height: 30,
                p: 0,
                position: "absolute",
                top: "12px",
                right: "25px",
              }}
              onClick={handleShoppingBagClick}
            />
          </Stack>
        </Toolbar>
      </AppBar>
      <Box component="nav">
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
      </Box>
      <Box component="main" sx={{ p: 3 }}>
        <Toolbar />
      </Box>
      <Drawer
        anchor="right"
        open={isOpenMyBag}
        onClose={() => setMyBagOpen(false)}
        sx={{
          display: { xs: "block", sm: "none" },
          position : "relative",
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: drawerWidth,
          },
        }}
      >
        <MyBag></MyBag>
      </Drawer>
    </Box>
  );
}
