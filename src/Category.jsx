import React from "react";
import Slider from "react-slick";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { shadows } from "@mui/system";
import Box from "@mui/material/Box";
import ImageListItem from "@mui/material/ImageListItem";

function Slick() {
  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
  };
  const categories = [
    {
      img: "https://cdn.shopify.com/s/files/1/0503/7303/4147/products/KP-2053_3_900x1350_crop_center@2x.jpg?v=1660648270",
      name: "silk Saree",
    },
    {
      img: "https://cdn.shopify.com/s/files/1/0503/7303/4147/products/KP-2053_3_900x1350_crop_center@2x.jpg?v=1660648270",
      name: "cotton Saree",
    },
    {
      img: "https://cdn.shopify.com/s/files/1/0503/7303/4147/products/KP-2053_3_900x1350_crop_center@2x.jpg?v=1660648270",
      name: "art Saree",
    },
    {
      img: "https://cdn.shopify.com/s/files/1/0503/7303/4147/products/KP-2053_3_900x1350_crop_center@2x.jpg?v=1660648270",
      name: "malgodi Saree",
    },
    {
      img: "https://cdn.shopify.com/s/files/1/0503/7303/4147/products/KP-2053_3_900x1350_crop_center@2x.jpg?v=1660648270",
      name: "silk Saree",
    },
    {
      img: "https://cdn.shopify.com/s/files/1/0503/7303/4147/products/KP-2053_3_900x1350_crop_center@2x.jpg?v=1660648270",
      name: "silk Saree",
    },
    {
      img: "https://cdn.shopify.com/s/files/1/0503/7303/4147/products/KP-2053_3_900x1350_crop_center@2x.jpg?v=1660648270",
      name: "silk Saree",
    },
  ];

  return (
    <Box
      sx={{
        padding: 2,
      }}
    >
      <Box>
        <Typography
          sx={{
            margin: "0px 10px 0px 0px",
            fontWeight: 700,
            color: "black",
            color: "black",
          }}
          className="topic-head"
        >
          Categories
        </Typography>
      </Box>

      <Slider {...settings}>
        {categories.map((category, index) => (
          <Box
            sx={{
              paddingRight: "16px",
              height: "90px",
              width: "98px",
            }}
          >
            <Card key={index}>
              <CardMedia
                sx={{ height: 55, width: 98 }}
                image={category.img}
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
                  {category.name}
                </Typography>
              </Box>
            </Card>
          </Box>
        ))}
      </Slider>
    </Box>
  );
}

export default Slick;
