import { Request, Response } from "express";

import InventoryTable from "../../repositories/inventoryRepository";
import { INERNAL_SERVER_ERROR } from "../../constants/errors";

async function getInventories(_: Request, res: Response): Promise<void> {
  try {
    res.send(await InventoryTable.getInventories());
  } catch (err) {
    res.status(400).send(INERNAL_SERVER_ERROR.message());
  }
}

export default getInventories;
