import * as express from "express";

import createInventory from "../controllers/inventory/createInventory";
import deleteInventoryById from "../controllers/inventory/deleteInventoryById";
import getInventories from "../controllers/inventory/getInventories";
import getInventoryById from "../controllers/inventory/getInventoryById";
import updateInventoryById from "../controllers/inventory/updateInventoryById";

const InventoryRoute = express.Router();

InventoryRoute.get("/", getInventories);
InventoryRoute.get("/:id", getInventoryById);
InventoryRoute.post("/", createInventory);
InventoryRoute.put("/:id", updateInventoryById);
InventoryRoute.delete("/:id", deleteInventoryById);

export default InventoryRoute;
