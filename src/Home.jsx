import React from "react";
import Slider from "react-slick";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import { Container, useMediaQuery, useTheme } from "@mui/material";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Carosel from "./Carosel";
import CommonCard from "./CommonCard";
import { useEffect, useState } from "react";
import axios from "axios";
import Skeleton from "@mui/material/Skeleton";

function Home() {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [isCategoryLoading, setIsCategoryLoading] = useState(false);

  const fetchCategories = async () => {
    setIsCategoryLoading(true);
    try {
      const response = await axios.get(
        "https://drab-rose-xerus-toga.cyclic.app/fetchCategory"
      );
      const fetchedCategories = response.data;
      setCategories(fetchedCategories);
      setIsCategoryLoading(false);
    } catch (error) {
      setIsCategoryLoading(false);
      console.error("Error fetching categories:", error);
    }
  };

  const fetchProductByCategories = async () => {
    var response = await axios.get(
      "http://localhost:3000/getAllProductsByCategory"
    );
    var fetchedProduct = response.data;
    setProducts(fetchedProduct);
  };

  useEffect(() => {
    fetchCategories();
    fetchProductByCategories();
  }, []);

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  console.log(isSmallScreen);
  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    adaptiveHeight: true,
    autoplaySpeed: 3000,
    pauseOnHover: true,
    appendDots: (dots) => (
      <div style={{ position: "absolute", bottom: "10px" }}>{dots}</div>
    ),
  };

  const imageUrls = [
    "https://img.freepik.com/free-psd/horizontal-banner-online-fashion-sale_23-2148585404.jpg?w=1060&t=st=1686116702~exp=1686117302~hmac=dcf185099620346f7b9ae76d9028780dd2239dc6f91df8f23cd091b2ffc99b6e",
    "https://img.freepik.com/free-psd/horizontal-banner-template-big-sale-with-woman-shopping-bags_23-2148786755.jpg?w=1060&t=st=1686116924~exp=1686117524~hmac=af6331d29c9320731e3798a78b9445b67fdfd7b529df28643b0fac72de5674ad",
    "https://img.freepik.com/free-psd/banner-template-online-shopping_23-2148537543.jpg?w=1060&t=st=1686118829~exp=1686119429~hmac=257d4fb6081b562dc574041345923c92a6304f2659c98cee337f67867a18f258",
    "https://img.freepik.com/premium-psd/summer-sales-banner-template_23-2149015979.jpg?w=1060",
    "https://img.freepik.com/free-vector/horizontal-sale-banner-template_23-2148897328.jpg?w=1380&t=st=1686199259~exp=1686199859~hmac=cc5188d451f9dd53f3fc6b3951b7f3832ee1658375c5cf023d0d1c1ca2b9fe75",
  ];

  const settingsProduct = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 2,
  };

  return (
    <Box>
      <Slider {...settings}>
        {imageUrls.map((imageUrl, index) => (
          <Box
            key={index}
            elevation={0}
            sx={{
              width: "100%",
              height: isSmallScreen ? 150 : 350,
            }}
          >
            <CardMedia
              component="img"
              alt={`Image ${index + 1}`}
              image={imageUrl}
              style={{
                height: "inherit",
                overflow: "hidden",
                width: "100%",
                objectFit: "fill",
              }}
            />
          </Box>
        ))}
      </Slider>
      <Container
        sx={{
          maxHeight: "300px",
          marginBottom: "10px",
          height: "160px",
        }}
      >
        <Box>
          <Typography
            sx={{
              margin: "0px 10px 0px 0px",
              fontWeight: 800,
              color: "black",
              lineHeight: 3,
              marginTop: -1,
            }}
            className="topic-head"
          >
            Categories
          </Typography>
        </Box>
        <>
          {isCategoryLoading ? (
            <Slider {...settingsProduct}>
              <Box>
                <Skeleton variant="circular" width={"80px"} height={"80px"} />
              </Box>
              <Box>
                <Skeleton variant="circular" width={"80px"} height={"80px"} />
              </Box>
              <Box>
                <Skeleton variant="circular" width={"80px"} height={"80px"} />
              </Box>
            </Slider>
          ) : (
            <Slider {...settingsProduct}>
              {categories &&
                categories.length > 0 &&
                categories.map((category, index) => (
                  <Box
                    key={index}
                    sx={{
                      display: "flex !important",
                      justifyContent: "center",
                      alignItems: "flex-start",
                      flexDirection: "column",
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
                        image={category.image}
                        title="green iguana"
                        component={"img"}
                      />
                    </Card>
                    <Box
                      sx={{
                        padding: "6px",
                        width: "100%",
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
                        {category.name}
                      </Typography>
                    </Box>
                  </Box>
                ))}
            </Slider>
          )}
        </>
      </Container>

      <Container>
        {products.map((category, index) => (
          <Box key={index}>
            <Carosel category={category} />
          </Box>
        ))}
      </Container>
    </Box>
  );
}

export default Home;
