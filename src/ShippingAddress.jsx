import {
  Box,
  Button,
  FormHelperText,
  Grid,
  Link,
  TextField,
  Typography,
  Container
} from "@mui/material";
import React from "react";

function ShippingAddress() {
  return (
    <Container>
      <Typography
        fontSize="20px"
        fontWeight="bold"
        sx={{ textAlign: "center", paddingTop: "10px" }}
      >
        Enter Shipping Details
      </Typography>
      <Box padding="10px">
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography>Address</Typography>
            <TextField
              variant="outlined"
              fullWidth
              multiline
              rows={9}
              placeholder={`Name:  xxxxxxxxxx\nAddress:  xxxxx xxxxx xxxxx\nLandmark:  xxx xxx xxxx xxxxx\nPincode:  xxxxxx\nState:  xxxxxxxxxx\nMobile No.:  xxxxxxxxxx\n--------------------------------\nFrom name:  xxxxxxxxxx\nMobile Number:  xxxxxxxxxx`}
            />
            <FormHelperText sx={{ fontWeight: "bold" }}>
              (Note: Please send the address in this format. If the address is
              not proper, we don't have any responsibility for the parcel.)
            </FormHelperText>
          </Grid>
          <Grid item xs={12}>
            <Typography>LandMark</Typography>
            <TextField
              variant="outlined"
              fullWidth
              inputProps={{ style: { padding: "10px" } }}
            />
          </Grid>
          <Grid item xs={12}>
            <Typography>PhoneNumber</Typography>
            <TextField
              variant="outlined"
              type="number"
              fullWidth
              required
              inputProps={{ style: { padding: "10px" } }}
            />
          </Grid>
          <Grid item xs={12}>
            <Typography>Alternate No.</Typography>
            <TextField
              variant="outlined"
              type="number"
              fullWidth
              inputProps={{ style: { padding: "10px" } }}
            />
          </Grid>
          <Grid item xs={6}>
            <Typography>Pincode</Typography>
            <TextField
              variant="outlined"
              fullWidth
              type="number"
              required
              inputProps={{ style: { padding: "10px" } }}
            />
          </Grid>
          <Grid item xs={6}>
            <Typography>District</Typography>
            <TextField
              variant="outlined"
              fullWidth
              required
              inputProps={{ style: { padding: "10px" } }}
            />
          </Grid>
          <Grid item xs={12}>
            <Typography>State</Typography>
            <TextField
              variant="outlined"
              fullWidth
              value="TamilNadu"
              disabled
            />
          </Grid>
          <Grid item xs={12}>
            <Button variant="contained" fullWidth sx={{ marginTop: "15px" }}>
              Add Address
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}

export default ShippingAddress;
