import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import axios from "axios";
import { useParams } from "react-router-dom";
import Button from "@mui/material/Button";
import { Box, Typography } from "@mui/material";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { useMyBag } from "./BagContext";
import { useSnackBar } from "./CommonContext";

const ProductDetail = () => {
  const { id } = useParams();
  const { setMyBagCountValue } = useMyBag();
  const { updateSnackBarState } = useSnackBar();

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
    if (id && id.trim() != "") {
      fetchProductDetailById();
    }
  }, [id]);

  const fetchProductDetailById = async () => {
    try {
      const response = await axios.get(`fetchProductByID/${id}`);
      const fetchedImages = response.data.image;
      const fetchSizeOptions = response.data.sizes;

      setProduct({
        images: response.data.image,
        mainImage: fetchedImages.length > 0 ? fetchedImages[0] : "",
        mainTitle: response.data.title,
        productCode: response.data.productCode,
        sizeOptions: response.data.sizes,
        // selectedSize: "",
        selectedSize:
          fetchSizeOptions.length > 0 ? fetchSizeOptions[0].size : "",
        description: response.data.description,
        price: response.data.price,
        discount: response.data.discount,
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

  const handleAddToCard = () => {
    const existingProducts = JSON.parse(localStorage.getItem("items")) || [];
    const existingProductIndex = existingProducts.findIndex(
      (product) => product.productId === id
    );

    if (existingProductIndex != -1) {
      const existingProduct = existingProducts.find(
        (product) => product.productId === id
      );

      const foundSize = existingProduct.sizes.find(
        (size) => size.size === product.selectedSize
      );
      if (foundSize) {
        var _updatedSizes = existingProduct.sizes.map((size) => {
          if (size.size == product.selectedSize) {
            size.qty += 1;
          }

          return size;
        });

        existingProducts[existingProductIndex].sizes = _updatedSizes;
      } else {
        existingProduct.sizes.push({ size: product.selectedSize, qty: 1 });
        existingProducts[existingProductIndex] = existingProduct;
      }
    } else {
      const newItem = {
        productId: id,
        sizes: [{ size: product.selectedSize, qty: 1 }],
      };
      existingProducts.push(newItem);
    }

    localStorage.setItem("items", JSON.stringify(existingProducts));
    setMyBagCountValue();
    updateSnackBarState(true, "Product added successfully.", "success");
  };

  const settings = {
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    dots: true,
  };

  const handleImageClick = (image) => {
    setProduct({ ...product, mainImage: image });
  };

  return (
    <Box>
      <Box style={{ padding: "13px" }}>
        <Box pb={2}>
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
        <Box my={3}>
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
        </Box>

        <Typography
          variant="h5"
          gutterBottom
          sx={{ fontWeight: "bold", fontSize: "20px" }}
        >
          {product.productCode}&nbsp;&nbsp;{product.mainTitle}
        </Typography>

        <Typography fontWeight="bold" fontSize="14px">
          Size:
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
          ₹ {product.price}
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
            fontWeight: 600,
          }}
          onClick={handleAddToCard}
        >
          <AddShoppingCartIcon
            style={{ paddingRight: "10px", fontSize: "2rem" }}
          />
          Add to cart
        </Button>
      </Box>
    </Box>
  );
};

export default ProductDetail;
