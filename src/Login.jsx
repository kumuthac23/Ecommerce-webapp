import React, { useState } from "react";
import { Box, TextField, Typography, Button } from "@mui/material";

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
      </Box>
    </Box>
  );
}

export default Login;
