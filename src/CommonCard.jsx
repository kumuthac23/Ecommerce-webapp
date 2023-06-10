import React from "react";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import { Container, useMediaQuery, useTheme } from "@mui/material";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";

function CommonCard(props) {
  return (
    <>
      <Box
        sx={{
          padding: 1,
          height: "100%",
        }}
      >
        <Link
          to={`/productDetail/${props.product._id}`}
          style={{
            textDecoration: "none",
            height: "100%",
          }}
        >
          <Card sx={{ height: "100%", boxShadow: 4 }}>
            <CardMedia
              sx={{
                padding: 0,
                overflow: "hidden",
                width: "100%",
                height: "170px",
                objectFit: "cover",
              }}
              image={props.product.posterUrl}
              title="green iguana"
              component={"img"}
            />
            <Box
              sx={{
                padding: "6px",
                maxHeight: "90px",
              }}
            >
              <Typography
                // display="inline"
                sx={{
                  paddingBottom: 0,
                  fontSize: "medium",
                  fontWeight: 600,
                  display: "-webkit-box",
                  WebkitLineClamp: 1,
                  WebkitBoxOrient: "vertical",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
                variant="h6"
              >
                {props.product.title}
              </Typography>
              <Typography
                sx={{ paddingBottom: 0, fontSize: "small" }}
                variant="h6"
              >
                &#8377;{props.product.price}
              </Typography>
            </Box>
          </Card>
        </Link>
      </Box>
    </>
  );
}

export default CommonCard;
