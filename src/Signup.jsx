import {
  Box,
  Button,
  Container,
  FormHelperText,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function Signup() {
  const navigate = useNavigate();
  const moveToLogin = () => {
    navigate("/checkout");
  };

  return (
    <Container>
      <Typography
        variant="h5"
        fontWeight="bold"
        textAlign="center"
        padding="20px 0px 10px 0px"
      >
        SignUp
      </Typography>
      <Box paddingBottom="20px">
        <Typography padding="5px 0px 5px 0px">
          Name<span style={{ color: "red" }}>*</span>
        </Typography>
        <TextField
          id="outlined-basic"
          variant="outlined"
          fullWidth
          inputProps={{ style: { padding: "10px" } }}
          required
        />
        <Typography padding="5px 0px 5px 0px">
          PhoneNumber<span style={{ color: "red" }}>*</span>
        </Typography>
        <TextField
          id="outlined-basic"
          variant="outlined"
          fullWidth
          inputProps={{ style: { padding: "10px" } }}
          required
        />
        <Typography padding="5px 0px 5px 0px">Email</Typography>
        <TextField
          id="outlined-basic"
          variant="outlined"
          fullWidth
          inputProps={{ style: { padding: "10px" } }}
        />
        <Typography padding="5px 0px 5px 0px">
          Password<span style={{ color: "red" }}>*</span>
        </Typography>
        <TextField
          id="outlined-basic"
          variant="outlined"
          fullWidth
          inputProps={{ style: { padding: "10px" } }}
          required
        />
        <Typography padding="5px 0px 5px 0px">
          Confirm Password<span style={{ color: "red" }}>*</span>
        </Typography>
        <TextField
          id="outlined-basic"
          variant="outlined"
          fullWidth
          inputProps={{ style: { padding: "10px" } }}
          required
        />
      </Box>
      <Button variant="contained" fullWidth>
        Signup
      </Button>
      <FormHelperText onClick={moveToLogin}>
        <Link style={{ textDecoration: "none" }}>
          Already have an Account?. Login
        </Link>
      </FormHelperText>
    </Container>
  );
}

export default Signup;
