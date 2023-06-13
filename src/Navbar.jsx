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
import HomeIcon from "@mui/icons-material/Home";
import Badge from "@mui/material/Badge";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import InfoIcon from "@mui/icons-material/Info";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";


const drawerWidth = "50vw";
  const seconddrawerWidth = "100vw";

const navItems = [
  { label: " Home", link: "/", icon: <HomeIcon /> },
  { label: "Profile", link: "/profile",icon:<AccountCircleIcon/> },
  { label: "Orders", link: "/orders" , icon:<AddShoppingCartIcon/>},
  { label: "About", link: "/about", icon:<InfoIcon/> },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [isOpenMyBag, setMyBagOpen] = React.useState(false);

  const handleMyBagDrawerOpen = () => {
    setMyBagOpen((prevState) => !prevState);
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
      sx={{ textAlign: "start", height: "100%" }}
    >
      <Box
        sx={{
          padding: 3,
          my: 0,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography color="primary" sx={{ fontWeight: 600 }}>
          NKS Collections
        </Typography>
        <ArrowBackIosIcon sx={{ fontSize: "large" }} />
      </Box>
      <List>
        {navItems.map((item) => (
          <ListItem
            key={item.label}
            disablePadding
            component={NavLink}
            to={item.link}
            activeclassname={({ isActive }) =>
              isActive ? classes.activeLink : ""
            }
            sx={{ justifyContent: "center" }}
          >
            <ListItemButton sx={{ borderRadius: "10px" }}>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                {item.icon}
                <ListItemText
                  sx={{ textAlign: "start", marginLeft: "8px" }}
                  primary={item.label.trim()}
                />
              </Box>
            </ListItemButton>
          </ListItem>
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
              display: "flex",
              alignItems: "center",
              gap: 1,
            }}
          >
            <NavLink to="/" style={{ textDecoration: "none",display:"flex" }}>
              <img
                style={{
                  width: "45px",
                  borderRadius: "50%",
                }}
                src="assets\images\Logo.jpeg"
                alt=""
              />
            </NavLink>
            <Typography sx={{ fontWeight: 600 }}>NKS Collection</Typography>
          </Box>
          <Box sx={{ display: { xs: "none", sm: "block" } }}>
            {navItems.map((item) => (
              <Button
                key={item.label}
                sx={{ color: "#fff", paddingLeft:0 }}
              >
                {item.icon} {item.label.trim()}
              </Button>
            ))}
          </Box>
          <Stack
            sx={{
              width: 30,
              height: 25,
              p: 0,
              position: "absolute",
              top: "18px",
              right: "30px",
            }}
          >
            <Badge color="secondary" overlap="circular" badgeContent={1}>
              <ShoppingBagRoundedIcon onClick={handleMyBagDrawerOpen} />
            </Badge>
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
        onClose={handleMyBagDrawerOpen}
        sx={{
          display: { xs: "block", sm: "none" },
          position: "relative",
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: seconddrawerWidth,
          },
        }}
      >
        <MyBag handleCloseIconClick={handleMyBagDrawerOpen} />
      </Drawer>
    </Box>
  );
}
