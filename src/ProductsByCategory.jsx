import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import {
  Container,
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  DialogActions,
} from "@mui/material";
import Grid from "@mui/material/Grid";
import CommonCard from "./CommonCard";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import { IconButton, Slide } from "@mui/material";
import Alert from "@mui/material/Alert";
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
  const [openAddToCart, setAddToCartOpen] = React.useState(false);
  const [sizeResults, setSizeResults] = useState([]);
  const [categoryWithProducts, setCategoryWithProducts] = useState(null);
  const [openSnackbar, setOpenSnakbacr] = React.useState(false);
  const [sizeWithQuantity, setSizeWithQuantity] = useState([]);
  const [selectedProductId, setSelectedProductId] = useState();

  const { id } = useParams();

  const handleAddToCart = (productId) => {
    //need to get the data from the local storage for the product and set that to the sizeWithQuantity
    fetchProductSizeResults(productId).then((response) => {
      debugger;
      setSelectedProductId(productId);
      setSizeWithQuantity([]);

      const existingCartProducts =
        JSON.parse(localStorage.getItem("items")) || [];

      if (existingCartProducts && existingCartProducts.length > 0) {
        var currentAddToCartProduct = existingCartProducts.find(
          (product) => product.productId == productId
        );

        var existingSizes = currentAddToCartProduct.sizes;
        setSizeWithQuantity([...existingSizes]);
      }
    });
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
        `https://drab-rose-xerus-toga.cyclic.app/getSizesById/${productId}`
      );
      const { sizes } = response.data;
      setSizeResults(sizes);
      // setCounter(sizes.reduce((obj, size) => ({ ...obj, [size.size]: 0 }), {}));

      setAddToCartOpen(true);
    } catch (error) {
      console.error("Error fetching size results:", error);
    }
  };

  useEffect(() => {
    fetchAllProductsByCategoryId();
  }, []);

  const handleAddNowClick = () => {
    const existingProducts = JSON.parse(localStorage.getItem("items")) || [];
    console.log(existingProducts);
    // debugger;

    if (existingProducts && existingProducts.length > 0) {
      const existingProductIndex = existingProducts.findIndex(
        (product) => product.productId === selectedProductId
      );

      if (existingProductIndex !== -1) {
        existingProducts[existingProductIndex].sizes = sizeWithQuantity;
      } else {
        const newItem = {
          productId: selectedProductId,
          sizes: sizeWithQuantity,
        };
        existingProducts.push(newItem);
      }
    } else {
      const newItem = {
        productId: selectedProductId,
        sizes: sizeWithQuantity,
      };
      existingProducts.push(newItem);
    }

    localStorage.setItem("items", JSON.stringify(existingProducts));

    setSizeWithQuantity([]);
    setAddToCartOpen(false);
  };

  const handleclose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSnakbacr(false);
  };

  const handleAddToCartDialogClose = () => {
    setAddToCartOpen(false);
    sizeWithQuantity([]);
  };

  const handleQtyIncrement = (sizeObj) => {
    var itemExist =
      sizeWithQuantity &&
      sizeWithQuantity.length > 0 &&
      sizeWithQuantity.find((item) => item.size == sizeObj.size);

    if (!itemExist) {
      var _sizeObj = {
        size: sizeObj.size,
        qty: 1,
      };

      sizeWithQuantity.push(_sizeObj);
      setSizeWithQuantity([...sizeWithQuantity]);
    } else {
      var _localSizeWithQuantity = sizeWithQuantity;

      var currentItem = sizeWithQuantity.find(
        (item) => item.size == sizeObj.size
      );

      if (currentItem && currentItem.qty < sizeObj.Instock) {
        _localSizeWithQuantity.map((item) => {
          if (item.size == sizeObj.size) {
            item.qty += 1;
          }
        });

        setSizeWithQuantity([..._localSizeWithQuantity]);
      } else {
        return;
      }
    }
  };

  const handleQtyDecrement = (sizeObj) => {
    var itemExist =
      sizeWithQuantity &&
      sizeWithQuantity.length > 0 &&
      sizeWithQuantity.find((item) => item.size == sizeObj.size);

    var currentQty = 0;
    if (itemExist) {
      var currentItem = sizeWithQuantity.find(
        (item) => item.size == sizeObj.size
      );

      var _localSizeWithQuantity = sizeWithQuantity;

      if (currentItem && currentItem.qty - 1 === 0) {
        _localSizeWithQuantity = _localSizeWithQuantity.filter(
          (item) => item.size != sizeObj.size
        );
      } else {
        _localSizeWithQuantity.map((item) => {
          if (item.size == sizeObj.size) {
            item.qty -= 1;
            currentQty = item.qty;
          }
        });
      }

      setSizeWithQuantity([..._localSizeWithQuantity]);
    }

    return currentQty;
  };

  return (
    <>
      {categoryWithProducts && (
        <Container sx={{ padding: "10px" }}>
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
          <Grid container spacing={0.5} pt={1}>
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
        onClose={handleAddToCartDialogClose}
        sx={{
          padding: "10px 0",
        }}
      >
        <DialogTitle
          id="alert-dialog-title"
          sx={{
            backgroundColor: "#ece7ee",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography sx={{ fontWeight: 700 }} color="primary">
              Add To Cart
            </Typography>
            <CloseIcon
              onClick={handleAddToCartDialogClose}
              color="primary"
            ></CloseIcon>
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
                      <TableCell>{size.Instock}</TableCell>
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
                            color="primary"
                            sx={{
                              lineHeight: 1,
                              padding: 0,
                              "& .MuiButtonGroup-grouped": {
                                minWidth: "32px !important",
                              },
                            }}
                            size="small"
                            aria-label="small outlined button group"
                            onClick={() => {
                              handleQtyDecrement(size);
                            }}
                          >
                            -
                          </Button>
                          <Button
                            sx={{
                              lineHeight: 1.3,
                              fontWeight: 600,
                              color: "black !important",
                            }}
                            disabled
                          >
                            {sizeWithQuantity &&
                            sizeWithQuantity.length > 0 &&
                            sizeWithQuantity.find(
                              (item) => item.size == size.size
                            )
                              ? sizeWithQuantity.find(
                                  (item) => item.size == size.size
                                )?.qty
                              : 0}
                          </Button>
                          <Button
                            onClick={() => {
                              handleQtyIncrement(size);
                            }}
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
            onClick={handleAddNowClick}
          >
            Add Now
          </Button>
        </DialogActions>
      </Dialog>

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
        <Alert onClose={handleclose} severity="success">
          Products Added Successfully
        </Alert>
      </Snackbar>
    </>
  );
}

export default ProductsByCategory;
