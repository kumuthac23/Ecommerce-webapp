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
import HomeIcon from "@mui/icons-material/Home";
import Badge from "@mui/material/Badge";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import InfoIcon from "@mui/icons-material/Info";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import SearchIcon from "@mui/icons-material/Search";
import SearchProduct from "./SearchProduct";
import { useMyBag } from "./BagContext";
import { styled } from "@mui/material/styles";

const drawerWidth = "60vw";
const seconddrawerWidth = "100vw";

const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    right: -3,
    top: 13,
    border: `2px solid ${theme.palette.background.paper}`,
    fontWeight: 800,
  },
}));

const navItems = [
  { label: " Home", link: "/", icon: <HomeIcon color="primary" /> },
  {
    label: "Profile",
    link: "/profile",
    icon: <AccountCircleIcon color="primary" />,
  },
  {
    label: "Orders",
    link: "/orders",
    icon: <AddShoppingCartIcon color="primary" />,
  },
  { label: "About", link: "/about", icon: <InfoIcon color="primary" /> },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [isOpenMyBag, setMyBagOpen] = React.useState(false);
  const [openSearch, setOpenSearch] = React.useState(false);

  const { mybagCount } = useMyBag();

  const handleMyBagDrawerOpen = () => {
    setMyBagOpen((prevState) => !prevState);
  };

  const handleMySearchDrawerOpen = () => {
    setOpenSearch((prevState) => !prevState);
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
      sx={{ textAlign: "start", height: "100%" }}
      onClick={handleDrawerToggle}
    >
      <Box
        p={2}
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          backgroundColor: "#ece7ee",
        }}
      >
        <Typography color="primary" sx={{ fontWeight: 600 }} fontSize={"large"}>
          NKS Collections
        </Typography>
        <ArrowBackIosIcon sx={{ fontSize: "large" }} color="primary" />
      </Box>
      <Divider />
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
            <ListItemButton sx={{ borderRadius: "0 10px 10px 0" }}>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                {item.icon}
                <ListItemText
                  sx={{
                    textAlign: "start",
                    marginLeft: "8px",
                    color: "primary.main",
                  }}
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
    <>
      <Box sx={{ display: "flex", flexGrow: 1 }} className={classes.root}>
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
                flexGrow: 0,
              }}
            >
              <NavLink
                to="/"
                style={{ textDecoration: "none", display: "flex" }}
              >
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
            <Box sx={{ display: { xs: "none", sm: "block" }, flexGrow: 0.6 }}>
              {navItems.map((item) => (
                <Button key={item.label} sx={{ color: "#ffff" }}>
                  {item.icon}
                  <ListItemText>{item.label}</ListItemText>
                </Button>
              ))}
            </Box>
            <Stack
              flexDirection={"row"}
              flexGrow={1}
              alignItems={"center"}
              justifyContent={"flex-end"}
              gap={2}
              sx={{
                cursor: "pointer",
              }}
            >
              <SearchIcon onClick={handleMySearchDrawerOpen} />
              <StyledBadge
                color="secondary"
                badgeContent={mybagCount}
                sx={{
                  mr: 0.5,
                }}
                onClick={handleMyBagDrawerOpen}
              >
                <ShoppingBagRoundedIcon />
              </StyledBadge>
            </Stack>
          </Toolbar>
        </AppBar>
      </Box>
      <Toolbar />
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

      <Drawer
        anchor="right"
        open={openSearch}
        onClose={handleMySearchDrawerOpen}
        sx={{
          position: "relative",
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: seconddrawerWidth,
          },
        }}
      >
        <SearchProduct handleSearchCloseIconClick={handleMySearchDrawerOpen} />
      </Drawer>

      <Drawer
        anchor="right"
        open={isOpenMyBag}
        onClose={handleMyBagDrawerOpen}
        sx={{
          position: "relative",
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: seconddrawerWidth,
          },
        }}
      >
        <MyBag
          open={isOpenMyBag}
          handleCloseIconClick={handleMyBagDrawerOpen}
        />
      </Drawer>
    </>
  );
}
