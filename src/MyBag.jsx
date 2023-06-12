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

function MyBag({ handleCloseIconClick }) {
  const [counter, setCounter] = useState(0);

  const addCardImages = [
    {
      image:
        "https://5.imimg.com/data5/SELLER/Default/2021/12/GM/RI/YB/53480653/cotton-designer-saree-for-ladies-500x500.jpg",
      title: "Silk Saree",
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
          {addCardImages.map((product) => {
            return (
              <>
                <Grid item xs={4}>
                  <Card sx={{ height: "60px" }}>
                    <CardMedia
                      sx={{
                        overflow: "hidden",
                        objectFit: "cover",
                      }}
                      image={product.image}
                      title="green iguana"
                      component={"img"}
                    />
                  </Card>
                </Grid>
                <Grid item xs={6}>
                  <Box>
                    <Typography sx={{ fontSize: "small", fontWeight: 400 }}>
                      {product.title}
                    </Typography>
                    <ButtonGroup
                      className="test"
                      sx={{
                        lineHeight: 0.5,
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
                        sx={{
                          lineHeight: 1,
                        }}
                      >
                        -
                      </Button>
                      <Button
                        sx={{
                          lineHeight: 1,
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
                          lineHeight: 1,
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
          position: "sticky",
          bottom: 0,
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
          Checkout
        </Button>
      </Container>
    </Box>
  );
}

export default MyBag;
