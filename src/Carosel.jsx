import React from "react";
import Box from "@mui/material/Box";
import Slider from "react-slick";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import CommonCard from "./CommonCard";
import { Container, useMediaQuery, useTheme } from "@mui/material";


function Carosel(props) {
  const settingsProduct = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 3,
    arrows: false,
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
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
        </Typography>
        <Button
          variant="contained"
          size="small"
          sx={{
            padding: 0.5,
          }}
        >
          View All
        </Button>
      </Box>
      <Slider {...settingsProduct}>
        {props.category.products.map((product) => (
          <CommonCard product={product} />
        ))}
      </Slider>
    </>
  );
}

export default Carosel;
