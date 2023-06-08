import React from "react";
import Box from "@mui/material/Box";
import Slider from "react-slick";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import { Container, useMediaQuery, useTheme } from "@mui/material";
import Typography from "@mui/material/Typography";

function Carosel(props) {
  const settingsProduct = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 2,
    arrows: false,
  };

  return (
    <Box>
      <Typography
        sx={{
          margin: "0px 10px 0px 0px",
          fontWeight: 700,
          color: "black",
        }}
        className="topic-head"
      >
        {props.category.name}
      </Typography>

      <Slider {...settingsProduct}>
        {props.category.products.map((product, index) => (
          <Box
            sx={{
              padding: 1,
              paddingRight: "16px",
              // height: "70px",
              width: "60px",
            }}
          >
            <Card key={index}>
              <CardMedia
                sx={{
                  padding: 0,
                  height: "inherit",
                  overflow: "hidden",
                  width: "100%",
                  maxHeight: "170px", // Adjust the height as per your requirement
                  objectFit: "cover",
                }}
                image={product.imageUrl}
                title="green iguana"
                component={"img"}
              />
              <Box
                sx={{
                  padding: "6px",
                }}
              >
                <Typography
                  sx={{ paddingBottom: 0, fontSize: "medium" }}
                  variant="h6"
                >
                  {product.title}
                </Typography>
                <Typography
                  sx={{ paddingBottom: 0, fontSize: "small" }}
                  variant="h6"
                >
                  &#8377;{product.price}
                </Typography>
              </Box>
            </Card>
          </Box>
        ))}
      </Slider>
    </Box>
  );
}

export default Carosel;
