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
                        {product.title}
                      </Typography>
                      <Typography
                        sx={{
                          fontSize: "0.7rem",
                          opacity: 0.7,
                        }}
                      >
                        <b>Size:&nbsp;</b>
                        S-1&#xd7;&#8377;1000,&nbsp;M-1&#xd7;&#8377;1000,&nbsp;XL-1&#xd7;&#8377;1000
                      </Typography>
                      {/* <Typography sx={{ fontSize: "0.7rem" }}>
                        &#8377;&nbsp;{product.price}
                      </Typography> */}
                      {/* <ButtonGroup
                        sx={{
                          display: "flex",
                        }}
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
                      </ButtonGroup> */}
                      <Button
                        variant="outlined"
                        size="small"
                        sx={{
                          p: "2px",
                        }}
                      >
                        <Typography sx={{ fontSize: "0.6rem" }}>
                          Change Qty.
                        </Typography>
                      </Button>
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
