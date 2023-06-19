import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import { Container } from "@mui/material";
import Grid from "@mui/material/Grid";
import CommonCard from "./CommonCard";
import Button from "@mui/material/Button";
import SizeModel from "./SizeModel";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import StoreIcon from "@mui/icons-material/Store";

function ProductsByCategory() {
  const [openAddToCart, setAddToCartOpen] = useState(false);
  const [sizeResults, setSizeResults] = useState([]);
  const [categoryWithProducts, setCategoryWithProducts] = useState(null);
  const [sizeWithQuantity, setSizeWithQuantity] = useState([]);
  const [selectedProductId, setSelectedProductId] = useState();

  const { id } = useParams();

  const handleAddToCart = (productId) => {
    fetchProductSizeResults(productId).then((response) => {
      setSelectedProductId(productId);
      setSizeWithQuantity([]);
      const existingCartProducts =
        JSON.parse(localStorage.getItem("items")) || [];

      if (existingCartProducts && existingCartProducts.length > 0) {
        var currentAddToCartProduct = existingCartProducts.find(
          (product) => product.productId === productId
        );

        if (currentAddToCartProduct && currentAddToCartProduct.sizes) {
          var existingSizes = currentAddToCartProduct.sizes;
          setSizeWithQuantity([...existingSizes]);
          setAddToCartOpen(true);
        }
      }
    });
  };

  const fetchAllProductsByCategoryId = async () => {
    try {
      const response = await axios.get(
        `https://drab-rose-xerus-toga.cyclic.app/fetchProductsByCategory/${id}`
      );

      setCategoryWithProducts(response.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const fetchProductSizeResults = async (productId) => {
    try {
      const response = await axios.get(
        `https://drab-rose-xerus-toga.cyclic.app/getSizesById/${productId}`
      );
      const { sizes } = response.data;
      setSizeResults(sizes);
      setAddToCartOpen(true);
    } catch (error) {
      console.error("Error fetching size results:", error);
    }
  };

  useEffect(() => {
    fetchAllProductsByCategoryId();
  }, []);

  return (
    <>
      {categoryWithProducts && (
        <Container sx={{ padding: "10px" }}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <Box
              sx={{
                paddingRight: 2,
              }}
            >
              <Card
                sx={{
                  height: "80px",
                  width: "80px",
                  boxShadow: 3,
                  borderRadius: "50%",
                }}
              >
                <CardMedia
                  image={categoryWithProducts?.image}
                  component={"img"}
                />
              </Card>
            </Box>
            <Box
              sx={{
                padding: "6px",
                width: "100%",
              }}
            >
              <Typography
                sx={{
                  fontWeight: 600,
                  display: "-webkit-box",
                  WebkitLineClamp: 1,
                  WebkitBoxOrient: "vertical",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
                variant="h5"
              >
                {categoryWithProducts?.name}
              </Typography>
            </Box>
          </Box>

          {categoryWithProducts &&
          categoryWithProducts.products.length === 0 ? (
              <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                flexDirection="column"
              sx={{
                  height: "60vh",
                overflow:"hidden"
                }}
                
            >
              <StoreIcon sx={{ fontSize: "5rem", opacity: 0.5 }}></StoreIcon>
              <Typography sx={{ opacity: 0.5 }}>
                No products available
              </Typography>
            </Box>
          ) : (
            <Grid
              container
              spacing={0.5}
              pt={1}
              sx={{
                display: "flex",
                justifyContent: "Space-around",
                alignItems: "center",
              }}
            >
              {categoryWithProducts &&
                categoryWithProducts.products.map((product, index) => (
                  <Grid item key={index} xs={6}>
                    <CommonCard product={product} height="100%">
                      <Button
                        variant="contained"
                        size="small"
                        fullWidth
                        onClick={() => handleAddToCart(product._id)}
                        sx={{
                          boxShadow: 4,
                          textTransform: "none",
                          display: "flex",
                          gap: 1,
                        }}
                      >
                        <AddShoppingCartIcon sx={{ fontSize: "medium" }} /> Add
                        to Cart
                      </Button>
                    </CommonCard>
                  </Grid>
                ))}
            </Grid>
          )}
        </Container>
      )}
      <SizeModel
        productId={selectedProductId}
        openAddToCart={openAddToCart}
        onClose={() => setAddToCartOpen(false)}
        sizeResults={sizeResults}
        data={sizeWithQuantity}
      />
    </>
  );
}

export default ProductsByCategory;
