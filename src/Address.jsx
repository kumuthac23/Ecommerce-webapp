import React, { useState, useEffect } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Radio from "@mui/material/Radio";
import { Box, Container } from "@mui/material";

export default function Address() {
  const [shippingDetails, setShippingDetails] = useState([]);
  const [selectedDetail, setSelectedDetail] = useState(null);

  useEffect(() => {
    fetch(
      "https://drab-rose-xerus-toga.cyclic.app/user/6487091f9199239b4ef5bfa2"
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.status === "SUCCESS") {
          setShippingDetails(data.data.ShippingDetails);
        }
      })
      .catch((error) => {
        console.error("Error fetching shipping details:", error);
      });
  }, []);

  const handleSelectDetail = (detail) => {
    if (selectedDetail === detail) {
      setSelectedDetail(null);
    } else {
      setSelectedDetail(detail);
    }
  };

  return (
    <Container sx={{ padding: "0px" }}>
      <Box sx={{ maxWidth: "600px" }}>
        {shippingDetails.map((detail) => (
          <Accordion
            key={detail._id}
            expanded={selectedDetail === detail}
            onChange={() => handleSelectDetail(detail)}
            elevation={0}
            sx={{ boxShadow: 2 }}
          >
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
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Radio
                  checked={selectedDetail === detail}
                  onChange={() => handleSelectDetail(detail)}
                />
                {/* <Typography>{detail.Name}</Typography> */}
                <Typography>
                  <strong>
                    {detail.Name} {detail.AddressType} {detail.PhoneNumber}
                  </strong>
                </Typography>
              </Box>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                {detail.Address}, {detail.Locality}, {detail.City},
                {detail.State} - {detail.Pincode}
              </Typography>
            </AccordionDetails>
          </Accordion>
        ))}
      </Box>
    </Container>
  );
}
