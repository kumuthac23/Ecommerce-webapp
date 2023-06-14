import { Box, Button, Container } from "@mui/material";
import React from "react";
import axios from "axios";

function Payment() {
  const initPayment = (data) => {
    const options = {
      key: "rzp_test_v7C0lBThBvuLHV",
      amount: data.amount,
      currency: data.currency,
      name: "test book",
      description: "Test Transaction",
      image:
        "https://images.unsplash.com/photo-1481349518771-20055b2a7b24?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8cmFuZG9tfGVufDB8fDB8fHww&w=1000&q=80",
      order_id: data.id,
      method: "card",
      handler: async (response) => {
        try {
          const verifyUrl = "http://localhost:3000/verify";
          const { data } = await axios.post(verifyUrl, response);
          console.log(data);
        } catch (error) {
          console.log(error);
        }
      },
      theme: {
        color: "#914298",
      },
    };
    const rzp1 = new window.Razorpay(options);
    rzp1.open();
  };

  const handlePayment = async () => {
    try {
      const orderUrl = "http://localhost:3000/orders";
      const { data } = await axios.post(orderUrl, { amount: 10 });
      console.log(data);
      initPayment(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container>
      <Button onClick={handlePayment} variant="contained">
        Pay Now
      </Button>
    </Container>
  );
}

export default Payment;
