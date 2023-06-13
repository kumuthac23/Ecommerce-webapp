import React, { useState } from "react";
import Address from "./Address";
import { Box, Typography, Button } from "@mui/material";
import Signup from "./Signup";

import AccountCircleIcon from "@mui/icons-material/AccountCircle";

function Profile() {
  const [openSignup, setOpenSignup] = useState(false);

  const handleSignupOpen = () => {
    setOpenSignup(true);
  };

  const handleSignupClose = () => {
    setOpenSignup(false);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        padding:"0px 20px 0px 20px"
      }}
    >
      <Box sx={{ textAlign: "center", marginBottom: "20px" }}>
        <AccountCircleIcon sx={{ fontSize: "100px", marginBottom: "10px" }} />
        <Typography fontWeight="bold" fontSize="30px">
          Profile
        </Typography>
      </Box>
      <Address />

      <Button onClick={handleSignupOpen}>Open</Button>
      {openSignup && <Signup onClose={handleSignupClose} />}

      
        <Button variant="contained" sx={{ width: "100%" }}>
          Update
        </Button>
    </Box>
  );
}

export default Profile;
