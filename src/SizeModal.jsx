import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import axios from "axios";
import {
  ButtonGroup,
  Card,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 350,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 2,
};

export default function BasicModal() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [counters, setCounters] = useState({});
  const [sizeResults, setSizeResults] = useState([]);


  useEffect(() => {
    const initialCounters = sizeResults.reduce((acc, size) => {
      return {
        ...acc,
        [size.size]: 0,
      };
    }, {});
    setCounters(initialCounters);
  }, [sizeResults]);

  return (
    <div>
      <Button onClick={handleOpen}>Open modal</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h2"
            fontWeight="bold"
            textAlign="center"
          >
            Select Size
          </Typography>

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
                {sizeResults.map((size, index) => (
                  <TableRow
                    key={index}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {size.size}
                    </TableCell>
                    <TableCell align="right">{size.quantity}</TableCell>
                    <TableCell>
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
                          disabled={counters[size.size] <= 0}
                          onClick={() => {
                            setCounters((prevCounters) => ({
                              ...prevCounters,
                              [size.size]: prevCounters[size.size] - 1,
                            }));
                          }}
                          color="primary"
                          sx={{
                            lineHeight: 1.3,
                          }}
                        >
                          -
                        </Button>
                        <Button sx={{ lineHeight: 1.3 }} disabled>
                          {counters[size.size]}
                        </Button>
                        <Button
                          onClick={() => {
                            if (counters[size.size] < size.quantity) {
                              setCounters((prevCounters) => ({
                                ...prevCounters,
                                [size.size]: prevCounters[size.size] + 1,
                              }));
                            }
                          }}
                          sx={{
                            lineHeight: 1.3,
                          }}
                        >
                          +
                        </Button>
                      </ButtonGroup>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <Button variant="contained" sx={{ width: "100%" }}>
            Add Now
          </Button>
        </Box>
      </Modal>
    </div>
  );
}
