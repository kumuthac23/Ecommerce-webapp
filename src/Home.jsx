import React from "react";
import Slider from "react-slick";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import useMediaQuery from "@mui/material/useMediaQuery";

function Home() {
  //const matches = useMediaQuery((_theme) => _theme?.breakpoints.down("sm"));

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
  ];

  return (
    <div >
      <Slider {...settings}>
        {imageUrls.map((imageUrl, index) => (
          <div key={index}>
            <Card
              elevation={0}
              sx={{
                maxWidth: "100%",
                width: "100%",
                height: true ? 200 : 350,
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
            </Card>
          </div>
        ))}
      </Slider>
    </div>
  );
}

export default Home;
