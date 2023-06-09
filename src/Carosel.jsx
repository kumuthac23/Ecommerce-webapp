import React from "react";
import Box from "@mui/material/Box";
import Slider from "react-slick";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import CommonCard from "./CommonCard";

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
        {props.category.products.map((product) => (
          <CommonCard product={product} />
        ))}
      </Slider>
    </Box>
    // </Container>
  );
}

export default Carosel;
