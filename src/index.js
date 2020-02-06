import express from "express";

import InventoryRoute from "./inventory/inventoryRoute";
import OrderRoute from "./order/orderRoute";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/inventories", InventoryRoute);
app.use("/orders", OrderRoute);

export default app;
