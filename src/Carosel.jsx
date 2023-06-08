import React from "react";
import Box from "@mui/material/Box";
import Slider from "react-slick";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import { Container, useMediaQuery, useTheme } from "@mui/material";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

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
    // <Container>
    <Box position={"relative"} sx={{ margin: "14px 0px" }}>
      <Typography
        sx={{
          margin: "0px 10px 0px 0px",
          fontWeight: 800,
          color: "black",
          lineHeight: 2,
        }}
        className="topic-head"
      >
        {props.category.name}
        <Button
          variant="contained"
          size="small"
          sx={{
            position: "absolute",
            top: 0,
            right: 0,
            zIndex: 1,
            padding: 0.5,
          }}
        >
          View All
        </Button>
      </Typography>
      <Slider {...settingsProduct}>
        {props.category.products.map((product, index) => (
          <Box
            sx={{
              padding: 1,
              paddingRight: "10px",
              width: "90%",
            }}
          >
            <Card key={index} sx={{ height: "100%", boxShadow: 4 }}>
              <CardMedia
                sx={{
                  padding: 0,
                  // height: "inherit",
                  overflow: "hidden",
                  width: "100%",
                  height: "170px",
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
                  sx={{ paddingBottom: 0, fontSize: "medium", fontWeight: 600 }}
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
    // </Container>
  );
}

export default Carosel;
