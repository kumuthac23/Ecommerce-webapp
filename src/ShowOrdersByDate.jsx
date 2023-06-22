import {
  Box,
  CardMedia,
  Chip,
  Container,
  Divider,
  Grid,
  Typography,
  Card,
  TableHead,
  TableRow,
  Table,
  TableContainer,
  TableCell,
  TableBody,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

function ShowOrdersByDate() {
  const [orders, setOrders] = useState([]);

  const fetchOrderDetails = async () => {
    try {
      const response = await axios.get(
        "getOrderDetails?id=6483f095d1aa3e29049d133e"
      );
      if (response.status === 200 && response.data.length > 0) {
        setOrders(response.data);
      } else {
        console.error("No data found");
      }
    } catch (error) {
      console.error("Error:", error.message);
    }
  };

  useEffect(() => {
    fetchOrderDetails();
  }, []);

  return (
    <Container>
          <Box>
              <Typography fontSize="30px" fontWeight="bold">Orders</Typography>
        {orders.map((order) => (
          <Box key={order._id}>
            <Divider>
              <Chip label={order._id} sx={{ margin: "20px 0px 10px 0px" }} />
            </Divider>
            {order.orders.map((suborder) => (
              <Box key={suborder._id}>
                <Accordion>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                    sx={{
                      margin: "10px 0px",
                      "& .MuiAccordionSummary-content": {
                        margin: "5px 0 !important",
                      },
                    }}
                  >
                    <Typography>
                      <span
                        style={{
                          display: "inline-block",
                          width: "180px",
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          verticalAlign: "middle",
                        }}
                      >
                        Order <span style={{opacity:"0.7"}}>(#{suborder._id}</span>
                      </span>
                      )
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    {suborder.productdetail.map((product) => (
                      <Box my={2} key={product.productId}>
                        <Card sx={{ boxShadow: 3 }}>
                          <Grid
                            container
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                            }}
                            spacing={2}
                            py={1}
                          >
                            <Grid
                              item
                              xs={2}
                              sx={{
                                paddingLeft: "10px !important",
                              }}
                            >
                              <CardMedia
                                sx={{
                                  overflow: "hidden",
                                  objectFit: "cover",
                                  height: "100px",
                                }}
                                image={product.posterURL}
                                title="green iguana"
                                component={"img"}
                              />
                            </Grid>
                            <Grid item xs={8}>
                              <Typography
                                sx={{
                                  fontSize: "small",
                                  fontWeight: 600,
                                  display: "-webkit-box",
                                  WebkitLineClamp: 1,
                                  WebkitBoxOrient: "vertical",
                                  overflow: "hidden",
                                  textOverflow: "ellipsis",
                                }}
                              >
                                {product.productcode}&nbsp;&nbsp;{product.title}
                              </Typography>
                              <Box
                                py={0.5}
                                display={"flex"}
                                gap={1}
                                alignItems={"center"}
                              >
                                <TableContainer
                                  sx={{
                                    borderBottom: "none",
                                    maxWidth: "130px",
                                  }}
                                >
                                  <Table stickyHeader>
                                    <TableHead>
                                      <TableRow>
                                        <TableCell
                                          style={{
                                            padding: 0,
                                            fontSize: "0.7rem",
                                          }}
                                          align="center"
                                        >
                                          Size
                                        </TableCell>
                                        <TableCell
                                          style={{
                                            padding: 0,
                                            fontSize: "0.7rem",
                                          }}
                                          align="center"
                                        >
                                          Qty
                                        </TableCell>
                                        <TableCell
                                          style={{
                                            padding: 0,
                                            fontSize: "0.7rem",
                                          }}
                                          align="center"
                                        >
                                          Price
                                        </TableCell>
                                      </TableRow>
                                    </TableHead>
                                    <TableBody>
                                      {product.sizes &&
                                        product.sizes.map((size) => (
                                          <TableRow key={size.name}>
                                            <TableCell
                                              style={{
                                                padding: 0,
                                                fontSize: "0.7rem",
                                              }}
                                              align="center"
                                            >
                                              {size.size}
                                            </TableCell>
                                            <TableCell
                                              style={{
                                                padding: 0,
                                                fontSize: "0.7rem",
                                              }}
                                              align="center"
                                            >
                                              &#xd7;{size.quantity}
                                            </TableCell>
                                            <TableCell
                                              style={{
                                                padding: 0,
                                                fontSize: "0.7rem",
                                              }}
                                              align="center"
                                            >
                                              &#8377;{size.title}
                                            </TableCell>
                                          </TableRow>
                                        ))}
                                    </TableBody>
                                  </Table>
                                </TableContainer>
                              </Box>
                            </Grid>
                          </Grid>
                        </Card>
                      </Box>
                    ))}
                  </AccordionDetails>
                </Accordion>
              </Box>
            ))}
          </Box>
        ))}
      </Box>
    </Container>
  );
}

export default ShowOrdersByDate;
