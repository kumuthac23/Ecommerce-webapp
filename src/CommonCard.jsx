import React from "react";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import { Container, useMediaQuery, useTheme } from "@mui/material";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";

function CommonCard(props) {
  const { product } = props;
  return (
    <>
      <Box
        sx={{
          padding: 1,
          height: "220px",
        }}
      >
        <Link
          to={`/productDetail/${product._id}`}
          style={{
            textDecoration: "none",
          }}
        >
          <Card sx={{ height: "100%", boxShadow: 4 }}>
            <CardMedia
              sx={{
                padding: 0,
                overflow: "hidden",
                width: "100%",
                height: "75%",
                objectFit: "cover",
              }}
              image={product.posterUrl}
              title="green iguana"
              component={"img"}
            />
            <Box
              sx={{
                padding: "6px",
                maxHeight: "100%",
              }}
            >
              <Typography
                sx={{
                  paddingBottom: 0,
                  fontSize: "small",
                  fontWeight: 600,
                  display: "-webkit-box",
                  WebkitLineClamp: 1,
                  WebkitBoxOrient: "vertical",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
                variant="h6"
              >
                {product.title}
              </Typography>
              <Typography
                sx={{ paddingBottom: 0, fontSize: "small" }}
                variant="h6"
              >
                &#8377;{product.price}
              </Typography>
            </Box>
          </Card>
        </Link>
      </Box>
    </>
  );
}

export default CommonCard;
