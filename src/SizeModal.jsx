import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  ButtonGroup,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Typography,
} from "@mui/material";
import Box from "@mui/material/Box";
import CloseIcon from "@mui/icons-material/Close";

function SizeModal({ productId, open, onClose }) {
  const [sizeResults, setSizeResults] = useState([]);
  const [sizeWithQuantity, setSizeWithQuantity] = useState([]);
  const [openAddToCart, setAddToCartOpen] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState();

  const fetchProductSizeResults = async (productId) => {
    try {
      const response = await axios.get(
        `https://drab-rose-xerus-toga.cyclic.app/getSizesById/${productId}`
      );
      const { sizes } = response.data;
      setSizeResults(sizes);
    } catch (error) {
      console.error("Error fetching size results:", error);
    }
  };

  useEffect(() => {
    if (productId) {
      fetchProductSizeResults(productId);
    }
  }, [productId]);

  const handleQtyIncrement = (sizeObj) => {
    var itemExist =
      sizeWithQuantity &&
      sizeWithQuantity.length > 0 &&
      sizeWithQuantity.find((item) => item.size === sizeObj.size);

    if (!itemExist) {
      var _sizeObj = {
        size: sizeObj.size,
        qty: 1,
      };

      setSizeWithQuantity((prevSizeWithQuantity) => [
        ...prevSizeWithQuantity,
        _sizeObj,
      ]);
    } else {
      setSizeWithQuantity((prevSizeWithQuantity) => {
        var _localSizeWithQuantity = prevSizeWithQuantity;

        var currentItem = prevSizeWithQuantity.find(
          (item) => item.size === sizeObj.size
        );

        if (currentItem && currentItem.qty < sizeObj.Instock) {
          _localSizeWithQuantity = _localSizeWithQuantity.map((item) => {
            if (item.size === sizeObj.size) {
              return { ...item, qty: item.qty + 1 };
            }
            return item;
          });
        }

        return _localSizeWithQuantity;
      });
    }
  };

  const handleQtyDecrement = (sizeObj) => {
    var itemExist =
      sizeWithQuantity &&
      sizeWithQuantity.length > 0 &&
      sizeWithQuantity.find((item) => item.size == sizeObj.size);

    var currentQty = 0;
    if (itemExist) {
      var currentItem = sizeWithQuantity.find(
        (item) => item.size == sizeObj.size
      );

      var _localSizeWithQuantity = sizeWithQuantity;

      if (currentItem && currentItem.qty - 1 === 0) {
        _localSizeWithQuantity = _localSizeWithQuantity.filter(
          (item) => item.size != sizeObj.size
        );
      } else {
        _localSizeWithQuantity.map((item) => {
          if (item.size == sizeObj.size) {
            item.qty -= 1;
            currentQty = item.qty;
          }
        });
      }

      setSizeWithQuantity([..._localSizeWithQuantity]);
    }

    return currentQty;
  };

  const handleAddToCartDialogClose = () => {
    setAddToCartOpen(false);
      setSizeWithQuantity([]);
      onClose();
  };

  const handleAddNowClick = () => {
    const existingProducts = JSON.parse(localStorage.getItem("items")) || [];
    console.log(existingProducts);
    // debugger;

    if (existingProducts && existingProducts.length > 0) {
      const existingProductIndex = existingProducts.findIndex(
        (product) => product.productId === selectedProductId
      );

      if (existingProductIndex !== -1) {
        existingProducts[existingProductIndex].sizes = sizeWithQuantity;
      } else {
        const newItem = {
          productId: selectedProductId,
          sizes: sizeWithQuantity,
        };
        existingProducts.push(newItem);
      }
    } else {
      const newItem = {
        productId: selectedProductId,
        sizes: sizeWithQuantity,
      };
      existingProducts.push(newItem);
    }

    localStorage.setItem("items", JSON.stringify(existingProducts));

    setSizeWithQuantity([]);
      setAddToCartOpen(false);
      onClose();
  };

  return (
    <>
      <Dialog
        fullWidth
        open={open}
        onClose={onClose}
        sx={{
          padding: "10px 0",
        }}
      >
        <DialogTitle
          id="alert-dialog-title"
          sx={{
            backgroundColor: "#ece7ee",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography sx={{ fontWeight: 700 }} color="primary">
              Add To Cart
            </Typography>
            <CloseIcon
              onClick={handleAddToCartDialogClose}
              color="primary"
            ></CloseIcon>
          </Box>
        </DialogTitle>
        <Divider />
        <DialogContent
          sx={{ display: "flex", flexDirection: "column", p: "0px 10px" }}
        >
          <TableContainer>
            <Table aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell align="center">
                    <strong>Size</strong>
                  </TableCell>
                  <TableCell align="center">
                    <strong>InStock</strong>
                  </TableCell>
                  <TableCell align="center">
                    <strong>Required</strong>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {sizeResults &&
                  sizeResults.map((size, index) => (
                    <TableRow
                      key={index}
                      sx={{
                        "&:last-child td, &:last-child th": {
                          border: 0,
                        },
                      }}
                    >
                      <TableCell component="th" scope="row" align="center">
                        {size.size}
                      </TableCell>
                      <TableCell align="center">{size.Instock}</TableCell>
                      <TableCell>
                              <Box
                                  sx={{
                                      display: "flex",
                                  justifyContent:"center"}}>
                          <ButtonGroup
                            className="test"
                            sx={{
                              lineHeight: 1,
                              padding: 0,
                              "& .MuiButtonGroup-grouped": {
                                minWidth: "32px !important",
                              },
                            }}
                            size="small"
                            aria-label="small outlined button group"
                          >
                            <Button
                              color="primary"
                              sx={{
                                lineHeight: 1,
                                padding: 0,
                                "& .MuiButtonGroup-grouped": {
                                  minWidth: "32px !important",
                                },
                              }}
                              size="small"
                              aria-label="small outlined button group"
                              onClick={() => {
                                handleQtyDecrement(size);
                              }}
                            >
                              -
                            </Button>
                            <Button
                              sx={{
                                lineHeight: 1.3,
                                fontWeight: 600,
                                color: "black !important",
                              }}
                              disabled
                            >
                              {sizeWithQuantity &&
                              sizeWithQuantity.length > 0 &&
                              sizeWithQuantity.find(
                                (item) => item.size == size.size
                              )
                                ? sizeWithQuantity.find(
                                    (item) => item.size == size.size
                                  )?.qty
                                : 0}
                            </Button>
                            <Button
                              onClick={() => {
                                handleQtyIncrement(size);
                              }}
                              sx={{
                                lineHeight: 1.3,
                              }}
                            >
                              +
                            </Button>
                          </ButtonGroup>
                        </Box>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            sx={{ textTransform: "none" }}
            onClick={handleAddNowClick}
          >
            Add Now
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default SizeModal;
