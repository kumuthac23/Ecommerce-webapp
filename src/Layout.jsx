import React from "react";
import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";
import { Box } from "@mui/material";

function Layout() {
  return (
    <div>
      <Navbar></Navbar>
      <Box
        sx={{
          marginTop: "1px",
          marginBottom: "40px",
        }}
      >
        <Outlet />
      </Box>
    </div>
  );
}

export default Layout;
