import { Route, Routes } from "react-router-dom";
import "./App.css";
import Navbar from "./Navbar";
import About from "./About";
import Home from "./Home";
import Layout from "./Layout";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./theme/theme";
import Carosel from "./Carosel";
import ProductDetail from "./ProductDetail"

function App() {
  return (
    <>
      <ThemeProvider theme={theme}>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />}></Route>
            <Route path="/about" element={<About />}></Route>
            <Route path="productDetail/:id" element={<ProductDetail/>}></Route>
          </Route>
        </Routes>
      </ThemeProvider>
    </>
  );
}

export default App;
