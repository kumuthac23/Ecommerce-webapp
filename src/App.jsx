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
import ProductsByCategory from "./ProductsByCategory";
import Login from "./Login";
import Profile from "./Profile";
import Signup from "./Signup";
import Orders from "./Orders";
import SizeModal from "./SizeModal";

function App() {
  return (
    <>
      <ThemeProvider theme={theme}>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />}></Route>
            <Route path="login" element={<Login />}></Route>
            <Route path="profile" element={<Profile />}></Route>
            <Route path="signup" element={<Signup />}></Route>
            <Route path="orders" element={<Orders />}></Route>
            <Route path="productDetail/:id" element={<ProductDetail />}></Route>
            <Route path="about" element={<About />}></Route>
            <Route path="sizemodal" element={<SizeModal/>}></Route>
            <Route
              path="productsByCategory/:id"
              element={<ProductsByCategory />}
            ></Route>
          </Route>
        </Routes>
      </ThemeProvider>
    </>
  );
}

export default App;
