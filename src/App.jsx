import { Route, Routes } from "react-router-dom";
import "./App.css";
import Navbar from "./Navbar";
import About from "./About";
import Home from "./Home";
import Layout from "./Layout";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./theme/theme";
import Carosel from "./Carosel";
import ProductDetail from "./ProductDetail";
import Login from "./Login";
import MyBag from "./MyBag";
import Profile from "./Profile";
import Orders from "./Orders";

function App() {
  return (
    <>
      <ThemeProvider theme={theme}>
        <Routes>
          <Route path="login" element={<Login />}></Route>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />}></Route>
            <Route path="profile" element={<Profile />}></Route>
            <Route path="orders" element={<Orders />}></Route>
            <Route path="productDetail/:id" element={<ProductDetail />}></Route>
            <Route path="myBag" element={<MyBag />}></Route>
            <Route path="about" element={<About />}></Route>
          </Route>
        </Routes>
      </ThemeProvider>
    </>
  );
}

export default App;
