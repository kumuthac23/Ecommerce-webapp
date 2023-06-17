import React, { useState } from "react";
import {
  Box,
  TextField,
  Typography,
  Button,
  FormHelperText,
} from "@mui/material";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function Login({ onLogin }) {
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

  const handlePhoneChange = (event) => {
    setPhone(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleLogin = () => {
    // Perform login logic here
    // ...
    onLogin(); // Call the onLogin function to move to the next step
  };

  const navigate = useNavigate();
  const moveToSignUp = () => {
    navigate("/signup");
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        // height: "100vh",
      }}
    >
      <Box sx={{ width: 300 }}>
        <Typography variant="h5" align="center" gutterBottom>
          Login
        </Typography>
        <TextField
          label="PhoneNumber"
          variant="outlined"
          margin="normal"
          fullWidth
          type="number"
          value={phone}
          onChange={handlePhoneChange}
        />
        <TextField
          label="Password"
          variant="outlined"
          margin="normal"
          fullWidth
          type="password"
          value={password}
          onChange={handlePasswordChange}
        />
        <Button
          variant="contained"
          color="primary"
          fullWidth
          sx={{ marginTop: 3 }}
          onClick={handleLogin}
        >
          Login
        </Button>
        <FormHelperText onClick={moveToSignUp}>
          <Link style={{ textDecoration: "none" }}>New User?</Link>
        </FormHelperText>
      </Box>
    </Box>
  );
}

export default Login;
