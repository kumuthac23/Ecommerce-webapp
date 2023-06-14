import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import axios from "axios";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useParams } from "react-router-dom";
import Button from "@mui/material/Button";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import {
  Box,
  Typography,
  MenuItem,
  FormControl,
  TextField,
  Divider,
} from "@mui/material";
import Select from "@mui/material/Select";

const ImageSlicker = () => {
  const [product, setProduct] = useState({
    images: [],
    mainImage: "",
    mainTitle: "",
    sizeOptions: [],
    selectedSize: "",
    description: "",
    price: "",
    discount: "",
  });

  useEffect(() => {
    fetchImages();
  }, []);

  const { id } = useParams();

  const fetchImages = async () => {
    try {
      const response = await axios.get(
        `https://drab-rose-xerus-toga.cyclic.app/fetchProductByID/${id}`
      );
      const fetchedImages = response.data.image;
      const fetchTitle = response.data.title;
      const fetchSizeOptions = response.data.sizes;
      const fetchDescription = response.data.description;
      const fetchPrice = response.data.price;
      const fetchDiscount = response.data.discount;

      setProduct({
        images: fetchedImages,
        mainImage: fetchedImages.length > 0 ? fetchedImages[0] : "",
        mainTitle: fetchTitle,
        sizeOptions: fetchSizeOptions,
        selectedSize: "",
        description: fetchDescription,
        price: fetchPrice,
        discount: fetchDiscount,
      });
    } catch (error) {
      console.error("Error fetching images:", error);
    }
  };

  const handleSizeChange = (event) => {
    setProduct({ ...product, selectedSize: event.target.value });
  };

  const settings = {
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
  };

  const handleImageClick = (image) => {
    setProduct({ ...product, mainImage: image });
  };

  return (
    <Box>
      <Box style={{ padding: "13px", overflow: "auto" }}>
        <Box sx={{ padding: "20px" }}>
          <Box
            component="img"
            sx={{
              height: "55vh",
              width: "100%",
              display: "block",
              margin: "1 auto",
              border: "1px solid black",
              borderRadius: "5px",
            }}
            alt="mainImage"
            src={product.mainImage}
          />
        </Box>
        <Slider {...settings}>
          {product &&
            product.images.map((image, index) => (
              <div key={index} onClick={() => handleImageClick(image)}>
                <img
                  src={image}
                  alt={`Image ${index + 1}`}
                  style={{ height: "87px", width: "75px", borderRadius: "5px" }}
                />
              </div>
            ))}
        </Slider>
        <Typography
          variant="h5"
          gutterBottom
          sx={{ fontWeight: "bold", fontSize: "15px" }}
        >
          {product.mainTitle}
        </Typography>
        <Typography
          variant="h6"
          gutterBottom
          sx={{ fontWeight: "bold", fontSize: "16px" }}
        >
          Size
        </Typography>

        <FormControl sx={{ m: 1, minWidth: 120 }}>
          <Select
            value={product.selectedSize}
            onChange={handleSizeChange}
            displayEmpty
            inputProps={{ "aria-label": "Without label" }}
            style={{ height: "30px", marginLeft: "-7px" }}
          >
            <MenuItem value="" disabled>
              Select Size
            </MenuItem>
            {product.sizeOptions &&
              product.sizeOptions.map((item, index) => (
                <MenuItem key={index} value={item.size}>
                  {item.size}
                </MenuItem>
              ))}
          </Select>
        </FormControl>

        <Typography
          variant="h6"
          gutterBottom
          sx={{ fontWeight: "regular", fontSize: "12px" }}
        >
          {product.description}
        </Typography>
        <Typography
          variant="h6"
          gutterBottom
          sx={{ fontWeight: "bold", fontSize: "16px" }}
        >
          Price
        </Typography>
        <Typography variant="h6" gutterBottom sx={{ fontWeight: "bold" }}>
          ₹ {product.price}{" "}
          <b style={{ marginLeft: "20px", color: "red" }}>
            {product.discount}% Offer
          </b>
        </Typography>
      </Box>
      <Box
        style={{
          position: "sticky",
          bottom: 0,
          left: 0,
          width: "100%",
          background: "white",
          borderTop: "1px solid #ccc",
        }}
      >
        <Button
          variant="contained"
          style={{ height: "50px", width: "100%", textAlign: "center" }}
        >
          <ShoppingCartIcon style={{ paddingRight: "10px" }} />
          Add to cart
        </Button>
      </Box>
    </Box>
  );
};

export default ImageSlicker;
