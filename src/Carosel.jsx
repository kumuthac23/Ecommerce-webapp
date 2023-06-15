import React from "react";
import Box from "@mui/material/Box";
import Slider from "react-slick";
import Typography from "@mui/material/Typography";
import CommonCard from "./CommonCard";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";

function Carosel(props) {
  const { category } = props;

  const settingsProduct = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 2,
    arrows: false,
    lazyLoad: "ondemand",
  };

  return (
    category &&
    category.products.length > 0 && (
      <Box sx={{ margin: "14px 0px" }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
          pb={1}
          className="topic-head"
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
            {category.name}
          </Typography>
          <Link
            to={`productsByCategory/${category._id}`}
            style={{
              textDecoration: "none !important",
            }}
          >
            <Button
              variant="contained"
              size="small"
              sx={{
                padding: 0.5,
              }}
            >
              View All
            </Button>
          </Link>
        </Box>
        <Slider {...settingsProduct}>
          {category.products.map((product, index) => (
            <Box key={index}>
              <CommonCard product={product} />
            </Box>
          ))}
        </Slider>
      </Box>
    )
  );
}

export default Carosel;
