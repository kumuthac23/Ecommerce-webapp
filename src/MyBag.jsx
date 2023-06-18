import { Container, Paper, Typography } from "@mui/material";
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

function createData(size, qty, price) {
  return { size, qty, price };
}
const rows = [
  createData("L", 3, 1000),
  createData("M", 2, 1000),
  createData("XL", 1, 1000),
  createData("XXL", 2, 1000),
  createData("XXL", 4, 1000),
];

function MyBag({ handleCloseIconClick }) {
  const [myBagProducts, setMyBagProducts] = useState([]);
const [isGetMyBagIsLoading, setIsGetMyBagIsLoading] = useState(false);

  const fetchMyBagProducts = async () => {
    const value = localStorage.getItem("items");
    const data = JSON.parse(value);

    setIsGetMyBagIsLoading(true);
    await axios
      .post("https://drab-rose-xerus-toga.cyclic.app/getMyBag", data)
      .then((response) => {
        if (response.data && response.data !== "") {
          setMyBagProducts(response.data);
        } else {
          setMyBagProducts([]);
        }

        setIsGetMyBagIsLoading(false)
      })
      .catch((error) => {
        console.error("Error sending data to backend:", error);
      });
  };

  useEffect(() => {
    fetchMyBagProducts();
  }, []);

  const handleDeleteProduct = (product) => {
    const productIndex = myBagProducts.findIndex(
      (item) => item.id === product.id
    );
    if (productIndex !== -1) {
      const updatedProducts = [...myBagProducts];
      updatedProducts.splice(productIndex, 1);
      setMyBagProducts(updatedProducts);

      // Update the local storage value
      const updatedData = JSON.stringify(updatedProducts);
      localStorage.setItem("items", updatedData);
    }
  }

  const navigate = useNavigate();
  
  const moveToCheckout = () => {
    handleCloseIconClick();
    navigate("/checkout");
  };

  return (
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
        <CloseIcon onClick={handleCloseIconClick} />
      </Box>
      <Divider />
      {myBagProducts && myBagProducts.length > 0 ? (
        myBagProducts.map((product) => {
          return (
            <Box>
              <Container>
                <Box my={2}>
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
                        <CardMedia
                          sx={{
                            overflow: "hidden",
                            objectFit: "cover",
                            height: "100px",
                          }}
                          image={product.posterURL}
                          title="green iguana"
                          component={"img"}
                        />
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
                                    style={{ padding: 0, fontSize: "0.7rem" }}
                                    align="center"
                                  >
                                    Size
                                  </TableCell>
                                  <TableCell
                                    style={{ padding: 0, fontSize: "0.7rem" }}
                                    align="center"
                                  >
                                    Qty
                                  </TableCell>
                                  <TableCell
                                    style={{ padding: 0, fontSize: "0.7rem" }}
                                    align="center"
                                  >
                                    Price
                                  </TableCell>
                                </TableRow>
                              </TableHead>
                              <TableBody>
                                {rows.map((row) => (
                                  <TableRow key={row.name}>
                                    <TableCell
                                      style={{
                                        padding: 0,
                                        fontSize: "0.7rem",
                                      }}
                                      align="center"
                                    >
                                      {row.size}
                                    </TableCell>
                                    <TableCell
                                      style={{
                                        padding: 0,
                                        fontSize: "0.7rem",
                                      }}
                                      align="center"
                                    >
                                      {row.qty}
                                    </TableCell>
                                    <TableCell
                                      style={{
                                        padding: 0,
                                        fontSize: "0.7rem",
                                      }}
                                      align="center"
                                    >
                                      &#8377;{row.price}
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
              </Container>
              <Box
                sx={{
                  position: "fixed",
                  bottom: 0,
                  height: "80px",
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
                <Button variant="contained" size="large">
                  Proceed to checkout
                </Button>
              </Box>
            </Box>
          );
        })
      ) : !isGetMyBagIsLoading && (
        <Box>
          <Box sx={{ height: "100vh", width: "100%" }}>
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
                sx={{ fontSize: "7rem" }}
              ></ProductionQuantityLimitsIcon>
              <h2>YOUR BAG IS EMPTY</h2>
            </Box>
            <Box>
              <Box>
                <Typography sx={{ fontSize: "small", textAlign: "center" }}>
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
                <Link to={"/"} onClick={handleCloseIconClick}>
                  <Button variant="contained" fullWidth>
                    Return to Shop
                    <ArrowRightAltIcon />
                  </Button>
                </Link>
              </Box>
            </Box>
          </Box>
        </Box>
      )}
    </Box>
  );
}

export default MyBag;


