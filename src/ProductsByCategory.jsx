import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import { Container } from "@mui/material";
import Grid from "@mui/material/Grid";
import CommonCard from "./CommonCard";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import CloseIcon from "@mui/icons-material/Close";
import { IconButton, Slide } from "@mui/material";
import Alert from "@mui/material/Alert";
import CloseIcon from "@mui/icons-material/Close";

function ProductsByCategory() {
  const [counter, setCounter] = useState(0);
  const [openAddToCart, setAddToCartOpen] = React.useState(false);
  const [sizeResults, setSizeResults] = useState([]);

  const [categoryWithProducts, setCategoryWithProducts] = useState(null);
  const [openSnackbar, setOpenSnakbacr] = React.useState(false);

  const { id } = useParams();

  const handleAddToCart = (productId) => {
    fetchProductSizeResults(productId);
  };

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

  const fetchProductSizeResults = async (productId) => {
    try {
      const response = await axios.get(
        `https://drab-rose-xerus-toga.cyclic.app/fetchProductsByCategory/${productId}`
      );
      const { size } = response.data;
      setSizeResults(size);
      setAddToCartOpen(true);
    } catch (error) {
      console.error("Error fetching size results:", error);
    }
  };

  useEffect(() => {
    fetchAllProductsByCategoryId();
  }, []);

  const handleAddToCartLocalStorage = (productId) => {
    console.log("Product ID:", productId);

    const existingCartItems = JSON.parse(localStorage.getItem("Mybag")) || [];

    const existingItemIndex = existingCartItems.findIndex(
      (item) => item.productId === productId
    );

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

  const handleclose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSnakbacr(false);
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
                      onClick={() => handleAddToCart(product._id)}
                      sx={{ boxShadow: 4, textTransform: "none" }}
                    >
                      Add to Cart
                    </Button>
                  </CommonCard>
                </Grid>
              ))
            )}
          </Grid>
        </Container>
      )}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={2000}
        onClose={handleclose}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        TransitionComponent={(props) => <Slide {...props} direction="left" />}
        action={
          <IconButton
            size="small"
            aria-label="close"
            color="inherit"
            onClick={handleclose}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        }
      >
        <Alert onClose={handleclose} severity="success">Products Added Successfully</Alert>
      </Snackbar>
    </>
  );
}

export default ProductsByCategory;
