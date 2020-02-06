import express from "express";

import createOrder from "./createOrder";
import getOrders from "./getOrders";
import getOrderById from "./getOrderById";

const OrderRoute = express.Router();

OrderRoute.post("/", createOrder);
OrderRoute.get("/", getOrders);
OrderRoute.get("/:id", getOrderById);

export default OrderRoute;
