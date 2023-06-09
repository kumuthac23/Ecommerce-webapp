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
<<<<<<< HEAD
    <>
=======
    <Box sx={{ margin: "14px 0px" }}>
>>>>>>> 84816b942ccee9b3651515c26a4188e9e41c2244
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
        {props.category.products.map((product, index) => (
          <Box key={index}>
            <CommonCard product={product} />
          </Box>
        ))}
      </Slider>
<<<<<<< HEAD
    </>
=======
    </Box>
>>>>>>> 84816b942ccee9b3651515c26a4188e9e41c2244
  );
}

export default Carosel;
