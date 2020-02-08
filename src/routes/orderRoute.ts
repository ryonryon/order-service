import * as express from "express";

import createOrder from "../controllers/order/createOrder";
import getOrders from "../controllers/order/getOrders";
import getOrderById from "../controllers/order/getOrderById";
import updateOrderById from "../controllers/order/updateOrderById";
import deleteOrderById from "../controllers/order/deleteOrderById";

const OrderRoute = express.Router();

OrderRoute.post("/", createOrder);
OrderRoute.get("/", getOrders);
OrderRoute.get("/:id", getOrderById);
OrderRoute.put("/:id", updateOrderById);
OrderRoute.delete("/:id", deleteOrderById);

export default OrderRoute;
