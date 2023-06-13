import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import { Container, Divider } from "@mui/material";
import Grid from "@mui/material/Grid";
import CommonCard from "./CommonCard";
import Button from "@mui/material/Button";
import CardActions from "@mui/material/CardActions";
import Modal from '@mui/material/Modal';
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import ButtonGroup from "@mui/material/ButtonGroup";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import CloseIcon from "@mui/icons-material/Close";






const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 300,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 3,
  p: 4,
};


function ProductsByCategory() {
  const [counter, setCounter] = useState(0);

  const [open, setOpen] = React.useState(false);
  const [age, setAge] = React.useState("");
  
  const handleChange = (event) => {
    setAge(event.target.value);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [categoryWithProducts, setCategoryWithProducts] = useState(null);

  const { id } = useParams();

  const fetchAllProductsByCategoryId = async () => {
    try {
      const response = await axios.get(
        `https://drab-rose-xerus-toga.cyclic.app/fetchProductsByCategory/${id}`
      );

      setCategoryWithProducts(response.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  useEffect(() => {
    fetchAllProductsByCategoryId();
  }, []);

  const handleAddToCart = (productId) => {
    console.log("Product ID:", productId);
    
    const existingCartItems = JSON.parse(localStorage.getItem("Mybag")) || [];

    
    const existingItemIndex = existingCartItems.findIndex(item => item.productId === productId);

    if (existingItemIndex !== -1) {
      // If the product exists in the cart, update the quantity
      existingCartItems[existingItemIndex].quantity += 1;
    } else {
      // If the product is not in the cart, add it with quantity 1
      existingCartItems.push({ productId, quantity: 1 });
    }

    // Save the updated cart items in local storage
    localStorage.setItem("Mybag", JSON.stringify(existingCartItems));

    console.log("Product ID:", productId);
    console.log("Mybag:", existingCartItems);
  };

  return (
    <>
      {categoryWithProducts && (
        <Container sx={{ padding: "20px 20px" }}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <Box
              sx={{
                paddingRight: 2,
              }}
            >
              <Card
                sx={{
                  height: "80px",
                  width: "80px",
                  boxShadow: 3,
                  borderRadius: "50%",
                }}
              >
                <CardMedia
                  image={categoryWithProducts?.image}
                  component={"img"}
                />
              </Card>
            </Box>
            <Box
              sx={{
                padding: "6px",
                width: "100%",
              }}
            >
              <Typography
                sx={{
                  fontWeight: 600,
                  display: "-webkit-box",
                  WebkitLineClamp: 1,
                  WebkitBoxOrient: "vertical",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
                variant="h5"
              >
                {categoryWithProducts?.name}
              </Typography>
            </Box>
          </Box>
          <Grid container rowGap={1} pt={1}>
            {categoryWithProducts &&
            categoryWithProducts.products.length === 0 ? (
              <Typography>No products available.</Typography>
            ) : (
              categoryWithProducts &&
              categoryWithProducts.products.map((product, index) => (
                <Grid item key={index} xs={6}>
                  <CommonCard product={product} height="100%">
                    <Button
                      variant="contained"
                      size="small"
                      fullWidth
                      onClick={handleClickOpen}
                      sx={{ boxShadow: 4, textTransform: "none" }}
                    >
                      Add to Cart
                    </Button>
                    <Dialog
                      fullWidth
                      open={open}
                      onClose={handleClose}
                      aria-labelledby="alert-dialog-title"
                      aria-describedby="alert-dialog-description"
                    >
                      <DialogTitle id="alert-dialog-title">
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                          }}
                        >
                          <Typography sx={{ fontWeight: 700 }}>
                            Add To Cart
                          </Typography>
                          <CloseIcon onClick={handleClose}></CloseIcon>
                        </Box>
                      </DialogTitle>
                      <Divider />
                      <DialogContent
                        sx={{ display: "flex", flexDirection: "column" }}
                      >
                        <FormControl sx={{ m: 1, minWidth: 80 }} size="small">
                          <InputLabel id="demo-select-small-label">
                            Select Size
                          </InputLabel>
                          <Select
                            labelId="demo-select-small-label"
                            id="demo-select-small"
                            label="select size"
                            onChange={handleChange}
                          >
                            <MenuItem value="M">M</MenuItem>
                            <MenuItem value="L">L</MenuItem>
                            <MenuItem value="XL">XL</MenuItem>
                            <MenuItem value="XXL">XXL</MenuItem>
                            <MenuItem value="XXXL">XXXL</MenuItem>
                            <MenuItem value="4XL">4XL</MenuItem>
                          </Select>
                        </FormControl>
                        <Typography
                          variant="subtitle1" 
                          sx={{ lineHeight: 2, paddingLeft: 1, fontWeight: 500 }}
                        >
                          Quantity
                        </Typography>
                        <ButtonGroup
                          className="test"
                          sx={{
                            lineHeight: 2,
                            padding: 0,
                            paddingLeft: 1,
                            "& .MuiButtonGroup-grouped": {
                              minWidth: "32px !important",
                            },
                          }}
                          size="small"
                          aria-label="small outlined button group"
                        >
                          <Button
                            disabled={counter <= 0}
                            onClick={() => {
                              setCounter(counter - 1);
                            }}
                            sx={{
                              lineHeight: 1.5,
                            }}
                          >
                            -
                          </Button>
                          <Button
                            sx={{
                              lineHeight: 1.5,
                            }}
                          >
                            {counter}
                          </Button>
                          <Button
                            onClick={() => {
                              setCounter(counter + 1);
                            }}
                            sx={{
                              lineHeight: 1.5,
                            }}
                          >
                            +
                          </Button>
                        </ButtonGroup>
                      </DialogContent>
                      <DialogActions sx={{ justifyContent: "center" }}>
                        <Button variant="contained" color="primary">
                          Add Now
                        </Button>
                      </DialogActions>
                    </Dialog>
                  </CommonCard>
                </Grid>
              ))
            )}
          </Grid>
        </Container>
      )}
    </>
  );
}

export default ProductsByCategory;
