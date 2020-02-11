import { Request, Response } from "express";

import InventoryTable from "../../repositories/inventoryRepository";
import { INERNAL_SERVER_ERROR } from "../../constants/errors";
import Inventory from "../../entities/inventory";

async function getInventories(_: Request, res: Response): Promise<void> {
  try {
    const inventories = await InventoryTable.getInventories();
    res.send(inventories.map((inventory: Inventory) => inventory.inventoryObject));
  } catch (err) {
    res.status(400).send(INERNAL_SERVER_ERROR.message());
  }
}

export default getInventories;
