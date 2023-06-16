import { Container, Paper, Typography } from "@mui/material";
import React from "react";
import CloseIcon from "@mui/icons-material/Close";
import Box from "@mui/material/Box";
import { useEffect, useState } from "react";
import ButtonGroup from "@mui/material/ButtonGroup";
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
  const [counter, setCounter] = useState(0);
  const [myBagProducts, setMyBagProducts] = useState([]);
  const [setsizeDetails, setSetsizeDetails] = useState([]);

  const fetchMyBagProducts = async () => {
    // Retrieve the value from local storage
    const value = localStorage.getItem("items");
    const data = JSON.parse(value);

    await axios
      .post("https://drab-rose-xerus-toga.cyclic.app/getMyBag", data)
      .then((response) => {
        if (response.data) setMyBagProducts(response.data);
      })
      .catch((error) => {
        console.error("Error sending data to backend:", error);
      });
  };

  useEffect(() => {
    fetchMyBagProducts();
  }, []);

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
      <Container
        sx={{
          overflow: "auto",
          height: "calc(90vh - 100px)",
        }}
      >
        {myBagProducts &&
          myBagProducts.length > 0 &&
          myBagProducts.map((product) => {
            return (
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
                            maxWidth: "145px",
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
                      <DeleteIcon></DeleteIcon>
                    </Grid>
                  </Grid>
                </Card>
              </Box>
            );
          })}
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
            {counter} Items
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
}

export default MyBag;
