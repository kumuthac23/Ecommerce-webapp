import { Route, Routes } from "react-router-dom";
import "./App.css";
import Navbar from "./Navbar";
import About from "./About";
import Home from "./Home";
import Layout from "./Layout";

function App() {
  return (
    <>
      <div>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />}></Route>
            <Route path="/about" element={<About />}></Route>
          </Route>
        </Routes>
      </div>
    </>
  );
}

export default App;
