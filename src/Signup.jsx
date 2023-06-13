import React, { useState } from "react";
import {
  Modal,
  Paper,
  Typography,
  Button,
  Box,
  TextField,
} from "@mui/material";
import Otp from "./Otp";

const Signup = ({ onClose }) => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [name, setName] = useState("");
  const [showOtp, setShowOtp] = useState(false);

  const handlePhoneNumberChange = (event) => {
    setPhoneNumber(event.target.value);
  };

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleRequestOTP = () => {
    if (phoneNumber.trim() !== "" && name.trim() !== "") {
      setShowOtp(true);
    }
  };

  const handleOtpClose = () => {
    setShowOtp(false);
    onClose();
  };

  const isFormValid = phoneNumber.trim() !== "" && name.trim() !== "";

  return (
    <Modal open={true} onClose={onClose}>
      <Box>
        <Box
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
          textAlign="center"
        >
          <Paper sx={{ p: 2, minWidth: 300, height: 200 }}>
            <Typography variant="h6" gutterBottom fontWeight="bold">
              Signup
            </Typography>
            <Box>
              <TextField
                required
                type="text"
                id="standard-basic"
                label="Enter Name"
                variant="standard"
                value={name}
                onChange={handleNameChange}
              />
            </Box>
            <Box>
              <TextField
                type="number"
                required
                id="standard-basic"
                label="Enter Phone Number"
                variant="standard"
                value={phoneNumber}
                onChange={handlePhoneNumberChange}
              />
            </Box>
            <Button
              variant="contained"
              color="primary"
              onClick={handleRequestOTP}
              style={{ marginTop: "16px" }}
              disabled={!isFormValid}
            >
              Request OTP
            </Button>
          </Paper>
        </Box>
        {showOtp && <Otp phoneNumber={phoneNumber} onClose={handleOtpClose} />}
      </Box>
    </Modal>
  );
};

export default Signup;
