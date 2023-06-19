// import React, { useState } from "react";
// import {
//   Box,
//   TextField,
//   Typography,
//   Button,
//   FormHelperText,
// } from "@mui/material";
// import { Link } from "react-router-dom";
// import { useNavigate } from "react-router-dom";

// function Login({ onLogin }) {
//   const [phone, setPhone] = useState("");
//   const [password, setPassword] = useState("");

//   const handlePhoneChange = (event) => {
//     setPhone(event.target.value);
//   };

//   const handlePasswordChange = (event) => {
//     setPassword(event.target.value);
//   };

//   const handleLogin = () => {
//     // Perform login logic here
//     // ...
//     onLogin(); // Call the onLogin function to move to the next step
//   };

//   const navigate = useNavigate();
//   const moveToSignUp = () => {
//     navigate("/signup");
//   };

//   return (
//     <Box
//       sx={{
//         display: "flex",
//         justifyContent: "center",
//         alignItems: "center",
//         // height: "100vh",
//       }}
//     >
//       <Box sx={{ width: 300 }}>
//         <Typography variant="h5" align="center" gutterBottom>
//           Login
//         </Typography>
//         <TextField
//           label="PhoneNumber"
//           variant="outlined"
//           margin="normal"
//           fullWidth
//           type="number"
//           value={phone}
//           onChange={handlePhoneChange}
//         />
//         <TextField
//           label="Password"
//           variant="outlined"
//           margin="normal"
//           fullWidth
//           type="password"
//           value={password}
//           onChange={handlePasswordChange}
//         />
//         <Button
//           variant="contained"
//           color="primary"
//           fullWidth
//           sx={{ marginTop: 3 }}
//           onClick={handleLogin}
//         >
//           Login
//         </Button>
//         <FormHelperText
//           onClick={moveToSignUp}
//           sx={{ textAlign: "right", paddingTop: "5px" }}
//         >
//           <Link style={{ textDecoration: "none" }}>
//             Don't have an Account? Please Register
//           </Link>
//         </FormHelperText>
//       </Box>
//     </Box>
//   );
// }

// export default Login;

import React from "react";
import {
  Box,
  TextField,
  Typography,
  Button,
  FormHelperText,
} from "@mui/material";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

const schema = yup.object().shape({
  phonenumber: yup
    .string()
    .required("Phone number is required")
    .matches(/^\d{10}$/, "Phone number must be in valid format"),
});

function Login({ onLogin }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const handleLogin = (data) => {
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
      }}
    >
      <Box sx={{ width: 300 }}>
        <Typography variant="h5" align="center" gutterBottom>
          Login
        </Typography>
        <form onSubmit={handleSubmit(handleLogin)}>
          <TextField
            label="PhoneNumber"
            variant="outlined"
            margin="normal"
            fullWidth
            type="number"
            {...register("phonenumber")}
            helperText={errors.phonenumber?.message}
            FormHelperTextProps={{
              sx: { color: "red", marginLeft: "0px" },
            }}
            autoComplete="new"
            onBlur={handleSubmit(handleLogin)}
          />
          <TextField
            label="Password"
            variant="outlined"
            margin="normal"
            fullWidth
            type="text"
            autoComplete="new"
          />

          <Button
            variant="contained"
            color="primary"
            fullWidth
            sx={{ marginTop: 3 }}
            type="submit"
          >
            Login
          </Button>
          <FormHelperText
            onClick={moveToSignUp}
            sx={{ textAlign: "right", paddingTop: "5px" }}
          >
            <Link to="/signup" style={{ textDecoration: "none" }}>
              Don't have an Account? Please Register
            </Link>
          </FormHelperText>
        </form>
      </Box>
    </Box>
  );
}

export default Login;
