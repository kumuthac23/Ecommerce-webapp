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
import CardActions from "@mui/material/CardActions";
import Stack from "@mui/material/Stack";
import Snackbar from "@mui/material/Snackbar";
import CloseIcon from "@mui/icons-material/Close";
import MuiAlert from "@mui/material/Alert";
import IconButton from "@mui/material/IconButton";
import Alert from "@mui/material/Alert";

function ProductsByCategory() {
  const [categoryWithProducts, setCategoryWithProducts] = useState(null);
  const [open, setOpen] = React.useState(false);

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
    setOpen(true);

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

  // const handleAddToCart = () => {
  //   setOpen(true);
  // };
  const handleclose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
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
                    <Box>
                      <Button
                        variant="contained"
                        size="small"
                        fullWidth
                        onClick={() => handleAddToCart(product._id)}
                        sx={{ boxShadow: 4, textTransform: "none" }}
                      >
                        Add to Cart
                      </Button>
                      <Snackbar
                        open={open}
                        autoHideDuration={3000}
                        onClose={handleclose}
                        message="Success"
                        anchorOrigin={{
                          vertical: "top",
                          horizontal: "right",
                        }}
                      >
                        <Alert
                          onClose={handleclose}
                          severity="success"
                          sx={{ width: "80%" }}
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
                          This is a success message!
                        </Alert>
                      </Snackbar>
                    </Box>
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
