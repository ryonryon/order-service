import InventoryTable from "../../repositories/inventoryRepository";
import { CONNECTION_ERROR } from "../../constants";
import { Request, Response } from "express";

async function getInventories(_: Request, res: Response): Promise<void> {
  try {
    res.send(await InventoryTable.getInventories());
  } catch (err) {
    res.status(400).send(CONNECTION_ERROR.message());
  }
}

export default getInventories;
