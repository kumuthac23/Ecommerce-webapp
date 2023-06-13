import { Container, Typography } from "@mui/material";
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

function MyBag({ handleCloseIconClick }) {
  const [counter, setCounter] = useState(0);
  const [myBagProducts, setMyBagProducts] = useState([]);

  const fetchMyBagProducts = async () => {
    // Retrieve the value from local storage
    const value = localStorage.getItem("Mybag");
    const data = JSON.parse(value);

    await axios
      .post("https://drab-rose-xerus-toga.cyclic.app/getMyBag", data)
      .then((response) => {
        setMyBagProducts(response.data);
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
      <Container>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            position: "sticky",
          }}
          my={2}
        >
          <Typography sx={{ fontSize: "large", fontWeight: 600 }}>
            MyBag
          </Typography>
          <CloseIcon onClick={handleCloseIconClick} />
        </Box>
        <Box my={2}>
          <Divider />
        </Box>
      </Container>
      <Container
        sx={{
          my: 3,
          overflowY: "auto",
          height: "70%",
        }}
      >
        <Grid
          container
          spacing={3}
          justifyContent={"center"}
          alignItems={"center"}
        >
          {myBagProducts.length > 0 &&
            myBagProducts.map((product) => {
              return (
                <>
                  <Grid item xs={4} key={product.productId}>
                    <Card sx={{ height: "60px" }}>
                      <CardMedia
                        sx={{
                          overflow: "hidden",
                          objectFit: "cover",
                        }}
                        image={product.posterURL}
                        alt={product.title}
                        title="green iguana"
                        component={"img"}
                      />
                    </Card>
                  </Grid>
                  <Grid item xs={4}>
                    <Box>
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
                        {product.title}
                      </Typography>
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
                          disabled={counter <= 0}
                          onClick={() => {
                            setCounter(counter - 1);
                          }}
                          color="primary"
                          sx={{
                            lineHeight: 1.3,
                          }}
                        >
                          -
                        </Button>
                        <Button
                          sx={{
                            lineHeight: 1.3,
                          }}
                          disabled
                        >
                          {counter}
                        </Button>
                        <Button
                          onClick={() => {
                            setCounter(counter + 1);
                          }}
                          sx={{
                            lineHeight: 1.3,
                          }}
                        >
                          +
                        </Button>
                      </ButtonGroup>
                    </Box>
                  </Grid>
                  <Grid item xs={2}>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "flex-end",
                        alignItems: "flex-end",
                      }}
                    >
                      <Typography sx={{ fontFamily: "ui- serief" }}>
                        {counter}&#xd7;&nbsp;&nbsp;&#8377;{product.price}
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={2}>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "flex-end",
                        alignItems: "flex-end",
                      }}
                    >
                      <DeleteIcon />
                    </Box>
                  </Grid>
                </>
              );
            })}
        </Grid>
      </Container>
      <Container
        sx={{
          position: "fixed",
          bottom: "20px",
          boxShadow: "0px -4px 4px -2px rgba(0, 0, 0, 0.2)",
          paddingBottom: 1,
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
          py={1}
        >
          <Typography sx={{ fontWeight: 600 }}>SubTotal:</Typography>
          <Typography sx={{ fontWeight: 600 }}>&#8377;1000</Typography>
        </Box>
        <Button variant="contained" fullWidth>
          Place Order
        </Button>
        <Box mt={1}>
          <Button variant="outlined" fullWidth onClick={handleCloseIconClick}>
            Close
          </Button>
        </Box>
      </Container>
    </Box>
  );
}

export default MyBag;
