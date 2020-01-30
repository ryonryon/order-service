import express from "express";

import InventoryRoute from "./inventory/inventoryRoute";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/inventories", InventoryRoute);

export default app;
