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
import { Link, NavLink } from "react-router-dom";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import { NavLink as NavLinkBase } from "react-router-dom";
import { useNavbarStyle } from "./styles/NavbarStyle";

const drawerWidth = 240;
const navItems = [
  { label: "Home", link: "/" },
  { label: "About", link: "/about" },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = React.useState(false);

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
      className={props.activeclassname}
    />
  ));

  const drawer = (
    <Box
      onClick={handleDrawerToggle}
      sx={{ textAlign: "center", height: "100%" }}
    >
      {/* <AdbIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
      <Typography
        variant="h6"
        noWrap
        component="a"
        href="/"
        sx={{
          mr: 2,
          // display: { xs: "none", md: "flex" },
          fontFamily: "monospace",
          fontWeight: 700,
          letterSpacing: ".3rem",
          color: "inherit",
          textDecoration: "none",
        }}
      >
        LOGO
      </Typography> */}
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
            activeClassName={({ isActive }) =>
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

          {/* <AdbIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            LOGO
          </Typography> */}
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
            <Avatar
              alt="Remy Sharp"
              src="https://images.unsplash.com/photo-1641699862936-be9f49b1c38d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHNhcmVlfGVufDB8fDB8fHww&w=1000&q=80"
              sx={{
                width: 46,
                height: 46,
                p: 0,
                position: "absolute",
                top: "4px",
                right: "35px",
              }}
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
        <Typography></Typography>
      </Box>
    </Box>
  );
}
