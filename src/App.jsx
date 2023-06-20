import { Route, Routes } from "react-router-dom";
import "./App.css";
import About from "./About";
import Home from "./Home";
import Layout from "./Layout";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./theme/theme";
import ProductDetail from "./ProductDetail";
import ProductsByCategory from "./ProductsByCategory";
import Login from "./Login";
import Profile from "./Profile";
import Orders from "./Orders";
import ShippingAddress from "./ShippingAddress";
import CheckOut from "./CheckOut";
import Signup from "./Signup";
import axios from "axios";
import BagProvider from "./BagContext";



//Only when we deploy the code use this line
// axios.defaults.baseURL = "https://tam-ecommerce.onrender.com/";

//For Development use this
axios.defaults.baseURL = "http://localhost:3000/";


function App() {
  return (
    <>
      <ThemeProvider theme={theme}>
        <BagProvider>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />}></Route>
              <Route path="login" element={<Login />}></Route>
              <Route path="profile" element={<Profile />}></Route>
              <Route path="signup" element={<Signup />}></Route>
              <Route path="orders" element={<Orders />}></Route>
              <Route
                path="productDetail/:id"
                element={<ProductDetail />}
              ></Route>
              <Route path="about" element={<About />}></Route>
              <Route
                path="shippingaddress"
                element={<ShippingAddress />}
              ></Route>
              <Route path="checkout" element={<CheckOut />}></Route>
              <Route path="signup" element={<Signup />}></Route>
              <Route
                path="productsByCategory/:id"
                element={<ProductsByCategory />}
              ></Route>
            </Route>
          </Routes>
        </BagProvider>
      </ThemeProvider>
    </>
  );
}

export default App;
