// import React from "react";
// import { useParams } from "react-router-dom";
// import { useEffect, useState } from "react";
// import axios from "axios";
// import Box from "@mui/material/Box";
// import { Container } from "@mui/material";
// import Typography from "@mui/material/Typography";
// import Card from "@mui/material/Card";
// import CardMedia from "@mui/material/CardMedia";

// function ProductsByCategory() {
//   const [products, setProducts] = useState([]);

//   const { id } = useParams();

//   const fetchAllProductsByCategoryId = async () => {
//     try {
//       const response = await axios.get(
//         `https://drab-rose-xerus-toga.cyclic.app/fetchProductsByCategory/${id}`
//       );
//       const fetchedAllProducts = response.data;
//       setProducts(fetchedAllProducts);
//     } catch (error) {
//       console.error("Error fetching categories:", error);
//     }
//   };
//   useEffect(() => {
//     // if (!id) {
//     // }
//     fetchAllProductsByCategoryId();
//   }, []);

//   return (
//     <div>
//       <Box
//         sx={{
//           padding: 1,
//         }}
//       >
//         {products.map((product, index) => (
//           <Box key={index}>
//             <Card sx={{ boxShadow: 4 }}>
//               <CardMedia
//                 sx={{
//                   padding: 0,
//                   overflow: "hidden",
//                   width: "100%",
//                   height: "170px",
//                 }}
//                 image={product.image}
//                 title="green iguana"
//                 component={"img"}
//               />
//               <Box
//                 sx={{
//                   padding: "6px",
//                 }}
//               >
//                 <Typography
//                   sx={{ paddingBottom: 0, fontSize: "medium", fontWeight: 600 }}
//                   variant="h6"
//                 >
//                   {product.title}
//                 </Typography>
//                 <Typography
//                   sx={{ paddingBottom: 0, fontSize: "small" }}
//                   variant="h6"
//                 >
//                   &#8377;{product.price}
//                 </Typography>
//               </Box>
//             </Card>
//           </Box>
//         ))}
//       </Box>
//     </div>
//   );
// }
// export default ProductsByCategory;


import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";

function ProductsByCategory() {
  const [products, setProducts] = useState([]);
  
  const { id } = useParams();

 const fetchAllProductsByCategoryId = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/fetchProductsByCategory/${id}`
        );
        const fetchedAllProducts = response.data;
        setProducts(fetchedAllProducts);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    useEffect(() => {
      // if (!id) {
      // }
      fetchAllProductsByCategoryId();
    }, []);


  
  return (
    <div>
      <Box sx={{ padding: 1 }}>
        {products.length === 0 ? (
          <Typography>No products available.</Typography>
        ) : (
          products.map((product, index) => (
            <Box key={index}>
              <Card sx={{ boxShadow: 4 }}>
                <CardMedia
                  sx={{
                    padding: 0,
                    overflow: "hidden",
                    width: "100%",
                    height: "170px",
                  }}
                  image={product.image}
                  title="green iguana"
                  component={"img"}
                />
                <Box sx={{ padding: "6px" }}>
                  <Typography
                    sx={{
                      paddingBottom: 0,
                      fontSize: "medium",
                      fontWeight: 600,
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
            </Box>
          )) 
        )}
      </Box>
    </div>
  );
}

export default ProductsByCategory;
