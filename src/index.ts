import express from "express";

import InventoryRoute from "./routes/inventoryRoute";
import OrderRoute from "./routes/orderRoute";

const app: express.Express = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/inventories", InventoryRoute);
app.use("/orders", OrderRoute);

export default app;
