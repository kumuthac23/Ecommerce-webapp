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
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

function MyBag({ handleCloseIconClick }) {
  const [counter, setCounter] = useState(0);

  const addCardImages = [
    {
      image:
        "https://5.imimg.com/data5/SELLER/Default/2021/12/GM/RI/YB/53480653/cotton-designer-saree-for-ladies-500x500.jpg",
      title: "Silk Saree",
      size: "XL",
      price: 400,
    },
    {
      image:
        "https://5.imimg.com/data5/SELLER/Default/2021/12/GM/RI/YB/53480653/cotton-designer-saree-for-ladies-500x500.jpg",
      title: "Silk Saree",
      price: 500,
    },
    {
      image:
        "https://5.imimg.com/data5/SELLER/Default/2021/12/GM/RI/YB/53480653/cotton-designer-saree-for-ladies-500x500.jpg",
      title: "Silk Saree",
      price: 550,
    },
    {
      image:
        "https://5.imimg.com/data5/SELLER/Default/2021/12/GM/RI/YB/53480653/cotton-designer-saree-for-ladies-500x500.jpg",
      title: "Silk Saree",
      price: 550,
    },
    {
      image:
        "https://5.imimg.com/data5/SELLER/Default/2021/12/GM/RI/YB/53480653/cotton-designer-saree-for-ladies-500x500.jpg",
      title: "Silk Saree",
      price: 550,
    },
    {
      image:
        "https://5.imimg.com/data5/SELLER/Default/2021/12/GM/RI/YB/53480653/cotton-designer-saree-for-ladies-500x500.jpg",
      title: "Silk Saree fffffffffffffff",
      price: 550,
    },
    {
      image:
        "https://5.imimg.com/data5/SELLER/Default/2021/12/GM/RI/YB/53480653/cotton-designer-saree-for-ladies-500x500.jpg",
      title: "Silk Saree",
      price: 550,
    },
    {
      image:
        "https://5.imimg.com/data5/SELLER/Default/2021/12/GM/RI/YB/53480653/cotton-designer-saree-for-ladies-500x500.jpg",
      title: "Silk Saree",
      price: 550,
    },
    {
      image:
        "https://5.imimg.com/data5/SELLER/Default/2021/12/GM/RI/YB/53480653/cotton-designer-saree-for-ladies-500x500.jpg",
      title: "Silk Saree",
      price: 550,
    },
  ];

  return (
    <Box
      sx={{
        overflow: "hidden",
      }}
    >
      <Box
        sx={{
          position: "sticky",
          top: 0,
          padding: 2,
          boxShadow: 2,
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
      <Box
        sx={{
          flexGrow: 1,
          overflow: "auto",
          padding: 2,
          height: "calc(90vh - 100px)",
          borderRadius: 2,
        }}
      >
        {addCardImages.map((product) => {
          return (
            <Box my={2}>
              <Card sx={{ height: "100px", boxShadow: 1 }} elevation={0}>
                <Grid
                  container
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                  spacing={2}
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
                      image={product.image}
                      title="green iguana"
                      component={"img"}
                    />
                  </Grid>
                  <Grid item xs={8}>
                    <Typography
                      sx={{
                        fontSize: "medium",
                        fontWeight: 500,
                        display: "-webkit-box",
                        WebkitLineClamp: 1,
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                    >
                      {product.title}
                    </Typography>
                    <Typography sx={{ fontSize: "small", opacity: 0.3 }}>
                      Size:{product.size}
                    </Typography>
                    <Typography sx={{ fontSize: "1rem" }}>
                      &#8377;&nbsp;{product.price}
                    </Typography>
                    <ButtonGroup
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
      </Box>
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
            {counter} Items
          </Typography>
          <Typography
            sx={{ fontSize: "1rem", fontFamily: "fangsong", fontWeight: 600 }}
          >
            &#8377;&nbsp;1000
          </Typography>
        </Box>
        <Button variant="contained" size="small">
          PROCEED TO CHECKOUT
        </Button>
      </Box>
    </Box>
  );
}

export default MyBag;
