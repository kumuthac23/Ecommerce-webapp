import { Card, CardMedia } from "@mui/material";
import React from "react";
import Login from "./Login";

function OrdersViewPage() {
  return (
    <div>
      <Card>
        <CardMedia
          component="img"
          style={{ height: "200px", width: "auto", objectFit: "cover" }}
          image="https://static.vecteezy.com/system/resources/previews/004/299/835/original/online-shopping-on-phone-buy-sell-business-digital-web-banner-application-money-advertising-payment-ecommerce-illustration-search-free-vector.jpg"
          alt="Paella dish"
        />
      </Card>

      <Login />
    </div>
  );
}

export default OrdersViewPage;
