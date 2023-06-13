import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Address from "./Address";
import {
  Box,
  Typography,
  Button,
  TextField,
  Link,
  Container,
  FormHelperText,
} from "@mui/material";
// import Signup from "./Signup";

import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";

function Profile() {
  // const [openSignup, setOpenSignup] = useState(false);
  // const handleSignupOpen = () => {
  //   setOpenSignup(true);
  // };
  // const handleSignupClose = () => {
  //   setOpenSignup(false);
  // };

  const navigate = useNavigate();
  const handleToHome = () => {
    navigate("/");
  };

  return (
    <Container>
      <>
        <Box display="flex" onClick={handleToHome}>
          <KeyboardBackspaceIcon
            float="left"
            sx={{ marginTop: 2 }}
            color="primary"
          />
          <Typography color="primary" sx={{ marginTop: 2, marginLeft: 1 }}>
            Go back
          </Typography>
        </Box>
        <Box
          textAlign="center"
          sx={{
            lineHeight: 0,
          }}
        >
          <AccountCircleIcon sx={{ fontSize: "80px" }} color="primary" />
          <Typography fontWeight="bold" fontSize="20px" color="primary">
            Profile
          </Typography>
        </Box>
      </>
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

      <Box sx={{ marginBottom: "40px" }}>
        <Typography fontWeight="bold" paddingBottom="5px">
          Address
          <Link sx={{ textDecoration: "none", float: "right" }}>
            <strong>+Add New</strong>
          </Link>
        </Typography>
        <Address />
      </Box>

      <Button
        variant="outlined"
        sx={{ width: "100%", marginBottom: "10px" }}
        onClick={handleToHome}
      >
        Cancel
      </Button>

      <Button variant="contained" sx={{ width: "100%", marginBottom: "10px" }}>
        Update Profile
      </Button>

      {/* <Button onClick={handleSignupOpen}>Open</Button>
      {openSignup && <Signup onClose={handleSignupClose} />} */}
    </Container>
  );
}

export default Profile;
