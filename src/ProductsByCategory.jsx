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
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import CloseIcon from "@mui/icons-material/Close";
import {
  ButtonGroup,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

function ProductsByCategory() {
  const [counter, setCounter] = useState(0);
  const [openAddToCart, setAddToCartOpen] = React.useState(false);
  const [sizeResults, setSizeResults] = useState([]);

  const [categoryWithProducts, setCategoryWithProducts] = useState(null);

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

      <Dialog
        fullWidth
        open={openAddToCart}
        onClose={() => setAddToCartOpen(false)}
        sx={{
          padding: "10px 0",
        }}
      >
        <DialogTitle id="alert-dialog-title">
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography sx={{ fontWeight: 700 }}>Add To Cart</Typography>
            <CloseIcon onClick={() => setAddToCartOpen(false)}></CloseIcon>
          </Box>
        </DialogTitle>
        <Divider />
        <DialogContent
          sx={{ display: "flex", flexDirection: "column", p: "0px 10px" }}
        >
          <TableContainer>
            <Table aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell align="center">
                    <strong>Size</strong>
                  </TableCell>
                  <TableCell align="center">
                    <strong>InStock</strong>
                  </TableCell>
                  <TableCell align="center">
                    <strong>Required</strong>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {sizeResults &&
                  sizeResults.map((size, index) => (
                    <TableRow
                      key={index}
                      sx={{
                        "&:last-child td, &:last-child th": {
                          border: 0,
                        },
                      }}
                    >
                      <TableCell component="th" scope="row">
                        {size.size}
                      </TableCell>
                      <TableCell>{size.quantity}</TableCell>
                      <TableCell>
                        <ButtonGroup
                          className="test"
                          sx={{
                            lineHeight: 1,
                            padding: 0,
                            "& .MuiButtonGroup-grouped": {
                              minWidth: "32px !important",
                            },
                          }}
                          size="small"
                          aria-label="small outlined button group"
                        >
                          <Button
                            //disabled={counters[size.size] <= 0}
                            // onClick={() => {
                            //   setCounters((prevCounters) => ({
                            //     ...prevCounters,
                            //     [size.size]: prevCounters[size.size] - 1,
                            //   }));
                            // }}
                            color="primary"
                            sx={{
                              lineHeight: 1.3,
                            }}
                          >
                            -
                          </Button>
                          <Button sx={{ lineHeight: 1.3 }} disabled>
                            1
                          </Button>
                          <Button
                            // onClick={() => {
                            //   if (counters[size.size] < size.quantity) {
                            //     setCounters((prevCounters) => ({
                            //       ...prevCounters,
                            //       [size.size]: prevCounters[size.size] + 1,
                            //     }));
                            //   }
                            // }}
                            sx={{
                              lineHeight: 1.3,
                            }}
                          >
                            +
                          </Button>
                        </ButtonGroup>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            sx={{ textTransform: "none" }}
          >
            Add Now
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default ProductsByCategory;
