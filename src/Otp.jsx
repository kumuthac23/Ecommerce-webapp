import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Modal,
  Paper,
  Typography,
  Button,
  Box,
  TextField,
  Link,
} from "@mui/material";
import { MuiOtpInput } from "mui-one-time-password-input";

const Otp = ({ onClose, phoneNumber }) => {
  const [otp, setOtp] = React.useState("");

  const handleChange = (newValue) => {
    setOtp(newValue);
  };

  const navigate = useNavigate();
  const handleSignupClick = () => {
    navigate("/Signup");
  };

  const handleSubmit = () => {
    if (otp.trim() !== "") {
      // Handle OTP verification or other actions here
      onClose();
    }
  };

  return (
    <Modal open={true} onClose={onClose}>
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
            Please Enter the OTP sent to
          </Typography>
          <Typography variant="body1" gutterBottom>
            {phoneNumber}{" "}
            <Link paddingLeft="10px" onClick={handleSignupClick}>
              <strong>Change</strong>
            </Link>
          </Typography>
          <Box>
            <MuiOtpInput
              value={otp}
              onChange={handleChange}
              inputStyle={{ fontSize: "14px", width: "30px", height: "30px" }}
              paddingTop="10px"
            />
          </Box>
          <Button
            variant="contained"
            color="primary"
            onClick={handleSubmit}
            style={{ marginTop: "16px" }}
            disabled={otp.trim() === ""}
          >
            Submit
          </Button>
        </Paper>
      </Box>
    </Modal>
  );
};

export default Otp;
