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

function ProductsByCategory() {
  const [categoryWithProducts, setCategoryWithProducts] = useState([]);

  const { id } = useParams();

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
  useEffect(() => {
    fetchAllProductsByCategoryId();
  }, []);

  return (
    <Container sx={{ padding: "20px 20px" }}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
        }}
      >
        <Box sx={{
          paddingRight : 2
        }}>
          <Card
            sx={{
              height: "80px",
              width: "80px",
              boxShadow: 3,
              borderRadius: "50%",
            }}
          >
            <CardMedia
              image={categoryWithProducts.image}
              title="green iguana"
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
            {categoryWithProducts.name}
          </Typography>
        </Box>
      </Box>
      <Grid container spacing={1} mt={1}>
        {categoryWithProducts.length === 0 ? (
          <Typography>No products available.</Typography>
        ) : (
          categoryWithProducts.products.map((product, index) => (
            <Grid item key={index} xs={6}>
              <CommonCard product={product} />
            </Grid>
          ))
        )}
      </Grid>
    </Container>
  );
}

export default ProductsByCategory;
