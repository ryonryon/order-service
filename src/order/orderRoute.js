import express from "express";

import createOrder from "./createOrder";
import getOrders from "./getOrders";
import getOrderById from "./getOrderById";
import updateOrderById from "./updateOrderById";
import deleteOrderById from "./deleteOrderById";

const OrderRoute = express.Router();

OrderRoute.post("/", createOrder);
OrderRoute.get("/", getOrders);
OrderRoute.get("/:id", getOrderById);
OrderRoute.put("/:id", updateOrderById);
OrderRoute.delete("/:id", deleteOrderById);

export default OrderRoute;
