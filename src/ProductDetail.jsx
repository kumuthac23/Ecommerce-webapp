import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import axios from "axios";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useParams } from "react-router-dom";
import Button from "@mui/material/Button";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Box, Typography } from "@mui/material";

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
      const fetchProductCode = response.data.productCode;
      const fetchSizeOptions = response.data.sizes;
      const fetchDescription = response.data.description;
      const fetchPrice = response.data.price;
      const fetchDiscount = response.data.discount;

      setProduct({
        images: fetchedImages,
        mainImage: fetchedImages.length > 0 ? fetchedImages[0] : "",
        mainTitle: fetchTitle,
        productCode: fetchProductCode,
        sizeOptions: fetchSizeOptions,
        // selectedSize: "",
         selectedSize: fetchSizeOptions.length > 0 ? fetchSizeOptions[0].size : "",
        description: fetchDescription,
        price: fetchPrice,
        discount: fetchDiscount,
      });
    } catch (error) {
      console.error("Error fetching images:", error);
    }
  };

  const handleSizeChange = (event) => {
    const selectedSize = event.target.value;
    const selectedPrice = product.sizeOptions.find(
      (option) => option.size === selectedSize
    ).Price;

    setProduct({
      ...product,
      selectedSize: selectedSize,
      price: selectedPrice,
    });
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
          {product.images.map((image, index) => (
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
          sx={{ fontWeight: "bold", fontSize: "20px" }}
        >
          {product.productCode}&nbsp;&nbsp;{product.mainTitle}
        </Typography>

        <Typography fontWeight="bold" fontSize="14px">
          Size:{" "}
        </Typography>
        {product.sizeOptions && (
          <Box>
            {product.sizeOptions && (
              <Box>
                {product.sizeOptions.map((item) => (
                  <Button
                    key={item.size}
                    variant={
                      product.selectedSize === item.size
                        ? "contained"
                        : "outlined"
                    }
                    color="primary"
                    sx={{
                      minWidth: "40px",
                      padding: "6px 6px",
                      margin: "5px",
                      maxHeight: "20px",
                    }}
                    onClick={handleSizeChange}
                    value={item.size}
                  >
                    {item.size}
                  </Button>
                ))}
              </Box>
            )}
          </Box>
        )}

        <Typography
          variant="h6"
          gutterBottom
          sx={{ fontWeight: "regular", fontSize: "15px" }}
        >
          {product.description}
        </Typography>
        <Typography
          variant="h6"
          gutterBottom
          sx={{ fontWeight: "bold", fontSize: "14px" }}
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
          style={{
            height: "50px",
            width: "100%",
            textAlign: "center",
            fontSize: "18px",
          }}
        >
          <ShoppingCartIcon style={{ paddingRight: "10px" }} />
          Add to cart
        </Button>
      </Box>
    </Box>
  );
};

export default ImageSlicker;
