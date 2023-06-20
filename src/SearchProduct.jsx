import React from "react";
import { Container, Paper, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import Grid from "@mui/material/Grid";
import { Category } from "@mui/icons-material";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import SearchOffIcon from "@mui/icons-material/SearchOff";


function SearchProduct({ handleSearchCloseIconClick }) {
  const [searchText, setSearchText] = useState("");
  const [isIconHidden, setIsIconHidden] = useState(false);

  const handleInputChange = (event) => {
    const value = event.target.value;
    setSearchText(value);
    setIsIconHidden(value !== "");
  };

  const handleSearch = () => {
    // Perform the search functionality here
    console.log("Searching for:", searchText);
    setIsIconHidden(true);
  };
  const categories = [
    {
      img: "https://image.wedmegood.com/resized-nw/600X/wp-content/uploads/2018/02/1512124529__B4_7968.jpg",
      name: "Silk Saree",
      sizes: "L,XL,XXL",
      price: 550,
      code: "A321",
    },
    {
      img: "https://getethnic.com/wp-content/uploads/2020/05/South-Indian-Wedding-Saree-19.jpeg",
      name: "Cotton Saree",
      sizes: "L,XL,XXL",
      price: 550,
      code:"D451",
    },
    {
      img: "https://getethnic.com/wp-content/uploads/2020/05/South-Indian-Wedding-Saree-19.jpeg",
      name: "Cotton Saree",
      sizes: "L,XL,XXL",
      price: 550,
      code: "B681"
    },
    {
      img: "https://getethnic.com/wp-content/uploads/2020/05/South-Indian-Wedding-Saree-19.jpeg",
      name: "Cotton Saree",
      sizes: "L,XL,XXL",
      price: 550,
      code: "C567"
    },
    // {
    //   img: "https://getethnic.com/wp-content/uploads/2020/05/South-Indian-Wedding-Saree-19.jpeg",
    //   name: "Cotton Saree",
    //   sizes: "L,XL,XXL",
    //   price: 550,
    // },
    // {
    //   img: "https://getethnic.com/wp-content/uploads/2020/05/South-Indian-Wedding-Saree-19.jpeg",
    //   name: "Cotton Saree",
    //   sizes: "L,XL,XXL",
    //   price: 550,
    // },
    // {
    //   img: "https://getethnic.com/wp-content/uploads/2020/05/South-Indian-Wedding-Saree-19.jpeg",
    //   name: "Cotton Saree",
    //   sizes: "L,XL,XXL",
    //   price: 550,
    // },

    // {
    //   img: "https://cdn.shopify.com/s/files/1/0503/7303/4147/products/KP-2053_3_900x1350_crop_center@2x.jpg?v=1660648270",
    //   name: "Art Saree",
    //   sizes: "L,XL,XXL",
    //   price: 550,
    // },
  ];

  return (
    <Box>
      <Container>
        <Box
          sx={{
            position: "sticky",
            top: 0,
            height: "50px",
            display: "flex",
            justifyContent: "space-between",
            overflow: "auto",
            alignItems: "center",
          }}
        >
          <Typography sx={{ fontSize: "large", fontWeight: 600 }}>
            Search Product
          </Typography>
          <CloseIcon onClick={handleSearchCloseIconClick}></CloseIcon>
        </Box>
      </Container>
      <Divider />
      <Container>
        <Box
          sx={{
            paddingTop: 1,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <TextField
            fullWidth
            sx={{
              "& .MuiInputBase-input": {
                padding: 0,
              },
            }}
            value={searchText}
            onChange={handleInputChange}
            placeholder="Search Code..."
            InputProps={{
              startAdornment: (
                <IconButton onClick={handleSearch} size="small">
                  <SearchIcon sx={{ opacity: 0.5 }} />
                </IconButton>
              ),
            }}
          />
        </Box>
        <Box
          my={1}
          sx={{
            height: "80vh",
            overflow: "auto",
          }}
        >
          {categories && categories.length > 0 ? (
            categories.map((category, index) => (
              <>
                <Card sx={{ padding: 1 }} elevation={0}>
                  <Grid
                    container
                    spacing={2}
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Grid item xs={3}>
                      <CardMedia
                        sx={{
                          overflow: "hidden",
                          objectFit: "cover",
                          height: "60px",
                          width: "100%",
                        }}
                        image={category.img}
                        title="green iguana"
                        component={"img"}
                      />
                    </Grid>
                    <Grid item xs={8}>
                      <Box>
                        <Typography sx={{fontSize:"small", fontWeight: 600 }}>
                          {category.code}&nbsp;{category.name}
                        </Typography>
                        <Typography sx={{ fontSize: "small" }}>
                          Sizes:&nbsp;
                          {category.sizes}
                        </Typography>
                        <Typography sx={{ fontSize: "0.9rem" }}>
                          &#8377; {category.price}
                        </Typography>
                      </Box>
                    </Grid>
                  </Grid>
                </Card>
                <Divider />
              </>
            ))
          ) : (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
                paddingTop: "160px",
              }}
            >
              <SearchOffIcon
                sx={{ fontSize: "5rem", opacity: 0.5 }}
              ></SearchOffIcon>
              <Typography sx={{ opacity: 0.5 }}>No Result Found</Typography>
            </Box>
          )}
        </Box>
      </Container>
    </Box>
  );
}

export default SearchProduct;
