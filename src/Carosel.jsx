import React from "react";
import Box from "@mui/material/Box";
import Slider from "react-slick";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import CommonCard from "./CommonCard";
import { Link } from "react-router-dom";

function Carosel(props) {
  const { category } = props;

  const settingsProduct = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 2,
    arrows: false,
  };

  return (
    category &&
    category.products.length > 0 && (
      <Box sx={{ margin: "14px 0px"
}}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
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

        <Link to={`productsByCategory/${category._id}`}>
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
