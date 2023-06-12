import React from "react";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import { Container, useMediaQuery, useTheme } from "@mui/material";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
import CardActions from "@mui/material/CardActions";

function CommonCard(props) {
  const { product, children } = props;
  return (
    <>
      <Box
        sx={{
          padding: 1,
        }}
      >
        <Card
          sx={{
            height: "100%",
            boxShadow: 4,
            boxSizing: "border-box",
            display: "block",
          }}
          elevation={0}
        >
          <Link
            to={`/productDetail/${product._id}`}
            style={{
              textDecoration: "none",
            }}
          >
            <CardMedia
              sx={{
                padding: 0,
                overflow: "hidden",
                height: "200px",
                objectFit: "cover",
              }}
              image={product.posterUrl}
              title="green iguana"
              component={"img"}
            />
          </Link>
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
            {/* <CardActions>{children}</CardActions> */}
          </Box>
          {children && <Box p={1}>{children}</Box>}
        </Card>
      </Box>
    </>
  );
}

export default CommonCard;
