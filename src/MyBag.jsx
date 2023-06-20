import React from "react";
import CloseIcon from "@mui/icons-material/Close";
import Box from "@mui/material/Box";
import { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import DeleteIcon from "@mui/icons-material/Delete";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import Divider from "@mui/material/Divider";
import axios from "axios";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Link } from "react-router-dom";
import ProductionQuantityLimitsIcon from "@mui/icons-material/ProductionQuantityLimits";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { useMyBag } from "./BagContext";
import SizeModel from "./SizeModel";
import { useSnackBar } from "./CommonContext";

function MyBag({ handleCloseIconClick, open }) {
  const { updateSnackBarState, snackBarState } = useSnackBar();
  const navigate = useNavigate();
  const { setMyBagCountValue } = useMyBag();

  const [myBagProducts, setMyBagProducts] = useState([]);
  const [isGetMyBagIsLoading, setIsGetMyBagIsLoading] = useState(false);
  const [deleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false);
  const [productIdToDelete, setProductIdToDelete] = useState(null);
  const [sizeWithQuantity, setSizeWithQuantity] = useState([]);
  const [selectedProductId, setSelectedProductId] = useState();
  const [openAddToCart, setAddToCartOpen] = useState(false);
  const [sizeResults, setSizeResults] = useState([]);

  const handleChangeQuantity = (productId) => {
    fetchProductSizeResults(productId).then((response) => {
      setSelectedProductId(productId);
      setSizeWithQuantity([]);
      const existingCartProducts =
        JSON.parse(localStorage.getItem("items")) || [];

      if (existingCartProducts && existingCartProducts.length > 0) {
        var currentAddToCartProduct = existingCartProducts.find(
          (product) => product.productId === productId
        );

        if (currentAddToCartProduct && currentAddToCartProduct.sizes) {
          var existingSizes = currentAddToCartProduct.sizes;
          setSizeWithQuantity([...existingSizes]);
          setAddToCartOpen(true);
        }
      }
    });
  };

  const fetchProductSizeResults = async (productId) => {
    try {
      const response = await axios.get(`getSizesById/${productId}`);
      const { sizes } = response.data;
      setSizeResults(sizes);
      setAddToCartOpen(true);
    } catch (error) {
      console.error("Error fetching size results:", error);
    }
  };

  const fetchMyBagProducts = async () => {
    const value = localStorage.getItem("items");
    const data = JSON.parse(value);

    setIsGetMyBagIsLoading(true);

    await axios
      .post("getMyBag", data)
      .then((response) => {
        if (response.data) {
          setMyBagProducts([...response.data]);
        } else {
          setMyBagProducts([]);
        }

        setIsGetMyBagIsLoading(false);
      })
      .catch((error) => {
        console.error("Error sending data to backend:", error);
      });
  };

  useEffect(() => {
    if (open) {
      fetchMyBagProducts();
    }
  }, [open]);

  const handleDeleteProduct = (product) => {
    setProductIdToDelete(product._id);
    setDeleteConfirmationOpen(true);
  };

  const handleDeleteConfirmation = () => {
    setDeleteConfirmationOpen(false);
    if (productIdToDelete) {
      const existingCartProducts =
        JSON.parse(localStorage.getItem("items")) || [];

      const updatedCardProducts = existingCartProducts.filter(
        (item) => item.productId !== productIdToDelete
      );
      localStorage.setItem("items", JSON.stringify(updatedCardProducts));

      var _myBagProducts = myBagProducts.filter(
        (item) => item._id !== productIdToDelete
      );
      setMyBagProducts([..._myBagProducts]);
    }

    updateSnackBarState(true, "Product removed successfully.", "success");
    setMyBagCountValue();
  };

  const moveToCheckout = () => {
    handleCloseIconClick();
    navigate("checkout");
  };

  const moveToHome = () => {
    handleCloseIconClick();
    navigate("/");
  };

  const handleSnackBarClose = () => {
    updateSnackBarState({
      snackbarOpen: false,
      snackbarMessage: "",
      snackbarSeverity: "",
    });
  };

  return (
    <>
      <Box
        sx={{
          overflow: "hidden",
          height: "100vh",
        }}
      >
        <Box
          sx={{
            position: "sticky",
            top: 0,
            padding: 2,
            height: "50px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography sx={{ fontSize: "large", fontWeight: 600 }}>
            MyBag
          </Typography>
          {/* <Typography sx={{ fontSize: "medium" }}>Total:{mybagCount}</Typography> */}

          <CloseIcon onClick={handleCloseIconClick} />
        </Box>
        <Divider />
        <Container
          sx={{
            overflow: "auto",
            height: "calc(90vh - 100px)",
          }}
        >
          {myBagProducts && myBagProducts.length > 0
            ? myBagProducts.map((product, index) => {
                return (
                  <Box my={2} key={index}>
                    <Card sx={{ boxShadow: 1 }} elevation={0}>
                      <Grid
                        container
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                        spacing={2}
                        py={1}
                      >
                        <Grid
                          item
                          xs={2}
                          sx={{
                            paddingLeft: "10px !important",
                          }}
                        >
                          <Link to={`/productDetail/${product._id}`}>
                            <CardMedia
                              sx={{
                                overflow: "hidden",
                                objectFit: "cover",
                                height: "100px",
                              }}
                              image={product.posterURL}
                              title="green iguana"
                              component={"img"}
                              onClick={moveToHome}
                            />
                          </Link>
                        </Grid>
                        <Grid item xs={8}>
                          <Typography
                            sx={{
                              fontSize: "small",
                              fontWeight: 600,
                              display: "-webkit-box",
                              WebkitLineClamp: 1,
                              WebkitBoxOrient: "vertical",
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                            }}
                          >
                            {product.productCode}&nbsp;&nbsp;{product.title}
                          </Typography>
                          <Box
                            py={0.5}
                            display={"flex"}
                            gap={1}
                            alignItems={"center"}
                          >
                            <TableContainer
                              sx={{
                                borderBottom: "none",
                                maxWidth: "130px",
                              }}
                            >
                              <Table stickyHeader>
                                <TableHead>
                                  <TableRow>
                                    <TableCell
                                      style={{
                                        padding: 0,
                                        fontSize: "0.7rem",
                                      }}
                                      align="center"
                                    >
                                      Size
                                    </TableCell>
                                    <TableCell
                                      style={{
                                        padding: 0,
                                        fontSize: "0.7rem",
                                      }}
                                      align="center"
                                    >
                                      Qty
                                    </TableCell>
                                    <TableCell
                                      style={{
                                        padding: 0,
                                        fontSize: "0.7rem",
                                      }}
                                      align="center"
                                    >
                                      Price
                                    </TableCell>
                                  </TableRow>
                                </TableHead>
                                <TableBody>
                                  {product.sizes &&
                                    product.sizes.map((size, index) => (
                                      <TableRow key={index}>
                                        <TableCell
                                          style={{
                                            padding: 0,
                                            fontSize: "0.7rem",
                                          }}
                                          align="center"
                                        >
                                          {size.size}
                                        </TableCell>
                                        <TableCell
                                          style={{
                                            padding: 0,
                                            fontSize: "0.7rem",
                                          }}
                                          align="center"
                                        >
                                          {size.qty}&#xd7;
                                        </TableCell>
                                        <TableCell
                                          style={{
                                            padding: 0,
                                            fontSize: "0.7rem",
                                          }}
                                          align="center"
                                        >
                                          &#8377;{size.price}
                                        </TableCell>
                                      </TableRow>
                                    ))}
                                </TableBody>
                              </Table>
                            </TableContainer>
                            <Box
                              sx={{
                                marginTop: "-16px",
                              }}
                            >
                              <Button
                                variant="outlined"
                                size="medium"
                                sx={{
                                  padding: "2px 5px",
                                }}
                                onClick={() =>
                                  handleChangeQuantity(product._id)
                                }
                              >
                                <Typography sx={{ fontSize: "0.6rem" }}>
                                  Change Qty.
                                </Typography>
                              </Button>
                            </Box>
                          </Box>
                        </Grid>
                        <Grid
                          xs={1}
                          item
                          sx={{ display: "flex", justifyContent: "center" }}
                        >
                          <DeleteIcon
                            onClick={() => handleDeleteProduct(product)}
                          ></DeleteIcon>
                        </Grid>
                      </Grid>
                    </Card>
                  </Box>
                );
              })
            : !isGetMyBagIsLoading && (
                <Box sx={{ width: "100%" }}>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      flexDirection: "column",
                      paddingTop: "100px",
                    }}
                  >
                    <ProductionQuantityLimitsIcon
                      sx={{ fontSize: "7rem", opacity: 0.5 }}
                    ></ProductionQuantityLimitsIcon>
                    <h2>YOUR BAG IS EMPTY</h2>
                  </Box>
                  <Box>
                    <Box>
                      <Typography
                        sx={{ fontSize: "small", textAlign: "center" }}
                      >
                        Before Proceed to checkout you must add some
                        <br />
                        products to Your shopping Card.
                        <br />
                        You will find a lot of interesting products on our
                        <br />
                        "Shop" page.
                      </Typography>
                    </Box>
                    <Box sx={{ padding: "20px" }}>
                      <Button
                        variant="contained"
                        fullWidth
                        onClick={moveToHome}
                      >
                        Return to Shop
                        <ArrowRightAltIcon />
                      </Button>
                    </Box>
                  </Box>
                </Box>
              )}
        </Container>
        {myBagProducts && myBagProducts.length != 0 && (
          <Box
            sx={{
              position: "fixed",
              bottom: 0,
              height: "100px",
              display: "flex",
              paddingX: 2,
              justifyContent: "space-between",
              alignItems: "center",
              width: "100%",
              boxShadow: 2,
            }}
          >
            <Box>
              <Typography sx={{ fontSize: "small", fontWeight: 600 }}>
                1 Items
              </Typography>
              <Typography sx={{ fontSize: "1rem", fontWeight: 600 }}>
                &#8377;&nbsp;1000
              </Typography>
            </Box>
            <Button variant="contained" size="large" onClick={moveToCheckout}>
              Proceed to checkout
            </Button>
          </Box>
        )}
      </Box>
      <Dialog
        open={deleteConfirmationOpen}
        onClose={() => setDeleteConfirmationOpen(false)}
      >
        <DialogTitle sx={{ backgroundColor: "#ece7ee" }}>
          <Box
            display={"flex"}
            justifyContent={"space-between"}
            alignItems={"center"}
          >
            <Typography sx={{ fontWeight: 700 }} color="primary">
              Remove Product
            </Typography>
            <CloseIcon
              color="primary"
              onClick={() => setDeleteConfirmationOpen(false)}
            ></CloseIcon>
          </Box>
        </DialogTitle>
        <Divider />
        <DialogContent>
          <Typography>Are you sure you want to remove this product?</Typography>
        </DialogContent>
        <DialogActions>
          <Button
            variant="outlined"
            onClick={() => setDeleteConfirmationOpen(false)}
          >
            Cancel
          </Button>
          <Button variant="contained" onClick={handleDeleteConfirmation}>
            Remove
          </Button>
        </DialogActions>
      </Dialog>

      <SizeModel
        productId={selectedProductId}
        openAddToCart={openAddToCart}
        onClose={() => {
          setAddToCartOpen(false);
        }}
        onAddNowClick={() => fetchMyBagProducts()}
        sizeResults={sizeResults}
        data={sizeWithQuantity}
      />
    </>
  );
}

export default MyBag;
