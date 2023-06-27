import React, { useState } from "react";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
} from "@mui/material";
import csvtojson from "csvtojson";
import axios from "axios";

function CSVUpdate() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [jsonData, setJsonData] = useState(null);
  const [showButton, setShowButton] = useState(false);

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);

    try {
      const jsonData = await convertCSVtoJSON(file);
      // console.log(jsonData);
      setJsonData(jsonData);
      setShowButton(true);
    } catch (error) {
      console.error("Error converting CSV to JSON:", error);
    }
  };

  const convertCSVtoJSON = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = () => {
        const csvData = reader.result;
        csvtojson({
          ignoreEmpty: true,
          colParser: {
            "Sizes(Size-Instock-Price;)": (item) => {
              const sizesArr = item.split(";").map((sizeItem) => {
                const [size, instock, price] = sizeItem.split("-");
                return { size, instock, price };
              });
              return sizesArr;
            },
            "ImagesLinks(;)": (item) => {
              const imagesArr = item.split(";");
              return imagesArr;
            },
          },
        })
          .fromString(csvData)
          .then((jsonArray) => {
            resolve(jsonArray);
          })
          .catch((error) => {
            reject(error);
          });
      };

      reader.onerror = () => {
        reject(new Error("Error reading CSV file."));
      };

      reader.readAsText(file);
    });
  };

  const handleUpload = async () => {
    try {
      const requestData = jsonData.map((data) => {
        const sizes = data["Sizes(Size-Instock-Price;)"];
        return {
          title: data.Title,
          image: data["ImagesLinks(;)"],
          color: data.Colors,
          discount: data.Discount,
          description: data.Description,
          price: sizes[0].price,
          productCode: data.ProductCode,
          netWeight: data.NetWeight,
          materialType: data.MaterialType,
          posterURL: data.PosterLink,
          category: data.CategoryName,
          sizes: sizes.map((size) => ({
            size: size.size,
            Instock: size.instock,
            Price: size.price,
          })),
        };
      });

      // console.log(requestData);

      const response = await axios.post(
        "http://localhost:3000/bulkupload",
        requestData
      );
      console.log("Products created:", response.data);

      setJsonData(null);
    } catch (error) {
      console.error("Error creating products:", error);
    }
  };

  return (
    <>
      <Box display="flex" sx={{ margin: "20px" }}>
        <Button
          variant="contained"
          component="label"
          sx={{ height: "30px", marginRight: "10px" }}
        >
          Upload File
          <input type="file" hidden onChange={handleFileChange} />
        </Button>
        {selectedFile && <p>{selectedFile.name}</p>}
        {jsonData && showButton && (
          <Button
            variant="contained"
            color="primary"
            sx={{ height: "30px", marginLeft: "auto" }}
            onClick={handleUpload}
          >
            Upload Data
          </Button>
        )}
      </Box>
      <Box>
        {jsonData && (
          <TableContainer
            component={Paper}
            style={{ maxHeight: "500px", minHeight: "auto" }}
          >
            <Table>
              <TableHead
                style={{
                  position: "sticky",
                  top: 0,
                  zIndex: 1,
                  background: "aqua",
                }}
              >
                <TableRow>
                  <TableCell align="center">Title</TableCell>
                  <TableCell align="center">Product Code</TableCell>
                  <TableCell align="center">Poster</TableCell>
                  <TableCell align="center">Material Type</TableCell>
                  <TableCell align="center">Discount</TableCell>
                  <TableCell align="center">Description</TableCell>
                  <TableCell align="center">Material Type</TableCell>
                  <TableCell align="center">Net Weight</TableCell>
                  <TableCell align="center">Colors</TableCell>
                  <TableCell align="center">CatergoryName</TableCell>
                  <TableCell align="center">Sizes</TableCell>
                  <TableCell align="center">Images</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {jsonData.map((data, index) => (
                  <TableRow key={index}>
                    <TableCell align="center">{data.Title}</TableCell>
                    <TableCell align="center">{data.ProductCode}</TableCell>
                    <TableCell align="center">
                      <img
                        src={data.PosterLink}
                        alt="PosterLink"
                        height="50px"
                        width="50px"
                      />
                    </TableCell>
                    <TableCell align="center">{data.MaterialType}</TableCell>
                    <TableCell align="center">{data.Discount}</TableCell>
                    <TableCell align="center">{data.Description}</TableCell>
                    <TableCell align="center">{data.MaterialType}</TableCell>
                    <TableCell align="center">{data.NetWeight}</TableCell>
                    <TableCell align="center">{data.Colors}</TableCell>
                    <TableCell align="center">{data.CategoryName}</TableCell>
                    <TableCell align="center">
                      <Table size="small">
                        <TableBody>
                          {data["Sizes(Size-Instock-Price;)"].map(
                            (size, sizeIndex) => (
                              <TableRow key={sizeIndex}>
                                <TableCell>{size.size}</TableCell>
                                <TableCell>{size.instock}</TableCell>
                                <TableCell>{size.price}</TableCell>
                              </TableRow>
                            )
                          )}
                        </TableBody>
                      </Table>
                    </TableCell>
                    <TableCell align="center">
                      <div style={{ width: "100px" }}>
                        {data["ImagesLinks(;)"].map((image, imageIndex) => (
                          <img
                            key={imageIndex}
                            src={image}
                            alt="ImageLink"
                            height="40px"
                            width="40px"
                          />
                        ))}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Box>
    </>
  );
}

export default CSVUpdate;
