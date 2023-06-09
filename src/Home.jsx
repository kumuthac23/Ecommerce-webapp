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

function Home() {
  const [getProduct, setGetProduct] = useState("");
  const [categories, setCategories] = useState([]);

const fetchCategories = async () => {
    try {
      const response = await axios.get("https://drab-rose-xerus-toga.cyclic.app/fetchCategory");
      const fetchedCategories = response.data; 
      setCategories(fetchedCategories);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  useEffect(() => {
    fetchCategories()
  }, []);
  
  const categoryWithProducts = [
    {
      _id: 11,
      name: "Silk Saree",
      products: [
        {
          _id: "647ef497c5c66ac0bb29ee2c",
          imageUrl:
            "https://cdn.shopify.com/s/files/1/0503/7303/4147/products/KP-2053_3_900x1350_crop_center@2x.jpg?v=1660648270",
          title: "Cotton saree",
          price: 500,
        },
        {
          _id: "647ef410c5c66ac0bb29ee2a",
          imageUrl:
            "https://5.imimg.com/data5/SELLER/Default/2021/12/GM/RI/YB/53480653/cotton-designer-saree-for-ladies-500x500.jpg",
          title: "Art saree",
          price: 400,
        },
        {
          _id: 3,
          imageUrl:
            "https://images.unsplash.com/photo-1618901185975-d59f7091bcfe?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8c2FyZWV8ZW58MHx8MHx8fDA%3D&w=1000&q=80",
          title: "Silk saree",
          price: 700,
        },
      ],
    },
    {
      id: 22,
      name: "Chudi",
      products: [
        {
          _id: 1,
          imageUrl:
            "https://5.imimg.com/data5/HO/RA/GU/ANDROID-36499891/product-jpeg-500x500.jpg",
          title: "cotton",
          price: 450,
        },
        {
          _id: 2,
          imageUrl:
            "https://assets.myntassets.com/dpr_1.5,q_60,w_400,c_limit,fl_progressive/assets/images/10340125/2019/8/7/0419f4ed-6d77-4365-b6ee-4ae2117201191565180545617-Inddus-Women-Dress-Material-5461565180543577-1.jpg",
          title: "material",
          price: 600,
        },
        {
          _id: 3,
          imageUrl:
            "https://www.jiomart.com/images/product/500x630/rvnqef12rc/pink-cotton-satin-women-s-unstitched-dress-material-product-images-rvnqef12rc-0-202202250516.jpg",
          title: "raw",
          price: 700,
        },
      ],
    },
  ];

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
    slidesToScroll: 1,
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

          <Slider {...settingsProduct}>
          {categories.map((category, index) => (
            <Box key={index}>
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
                }}
              >
                <Typography
                  sx={{
                    paddingBottom: 0,
                    fontSize: "medium",
                    fontWeight: 600,
                  }}
                  variant="h6"
                >
                  {category.name}
                </Typography>
              </Box>
            </Box>
          ))}
        </Slider> 
 


      </Container>

      <Container>
        {categoryWithProducts.map((category, index) => (
          <Box key={index}>
            <Carosel category={category} />
          </Box>
        ))}
      </Container>
    </Box>
  );
}

export default Home;
