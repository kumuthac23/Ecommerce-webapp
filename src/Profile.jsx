import React, { useState } from "react";
import Address from "./Address";
import { Box, Typography, Button, TextField, Link } from "@mui/material";
// import Signup from "./Signup";

import AccountCircleIcon from "@mui/icons-material/AccountCircle";

function Profile() {
  // const [openSignup, setOpenSignup] = useState(false);
  // const handleSignupOpen = () => {
  //   setOpenSignup(true);
  // };
  // const handleSignupClose = () => {
  //   setOpenSignup(false);
  // };

  return (
    <Box
      sx={{
        // display: "flex",
        // flexDirection: "column",
        // alignItems: "center",
        // justifyContent: "center",
        // minHeight: "100vh",
        padding: "0px 20px 0px 20px",
      }}
    >
      <Box sx={{ textAlign: "center", margin: "5px 0px 5px 0px" }}>
        <AccountCircleIcon sx={{ fontSize: "80px" }} color="primary" />
        <Typography fontWeight="bold" fontSize="20px" color="primary">
          Profile
        </Typography>
      </Box>
      <Box sx={{ marginBottom: "10px" }}>
        <Typography fontWeight="bold" paddingBottom="5px">
          Name
        </Typography>
        <TextField
          id="outlined-basic"
          variant="outlined"
          type="text"
          fullWidth
          inputProps={{
            style: { padding: "10px" },
          }}
        />
      </Box>

      <Box sx={{ marginBottom: "10px" }}>
        <Typography fontWeight="bold" paddingBottom="5px">
          PhoneNumber
        </Typography>
        <TextField
          id="outlined-basic"
          variant="outlined"
          type="number"
          fullWidth
          inputProps={{
            style: { padding: "10px" },
          }}
        />
      </Box>

      <Box sx={{ marginBottom: "15px" }}>
        <Typography fontWeight="bold" paddingBottom="5px">
          Email
        </Typography>
        <TextField
          id="outlined-basic"
          variant="outlined"
          type="email"
          fullWidth
          inputProps={{
            style: { padding: "10px" },
          }}
        />
      </Box>

      <Box sx={{ marginBottom: "20px" }}>
        <Typography fontWeight="bold" paddingBottom="5px">
          Address
          <Link sx={{textDecoration:"none",float:"right"}}>
            <strong>+Add New</strong>
          </Link>
        </Typography>
        <Address />
      </Box>

      <Button variant="contained" sx={{ width: "100%", marginBottom: "10px" }}>
        Update Profile
      </Button>

      {/* <Button onClick={handleSignupOpen}>Open</Button>
      {openSignup && <Signup onClose={handleSignupClose} />} */}
    </Box>
  );
}

export default Profile;
