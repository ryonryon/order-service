import { Request, Response } from "express";

import InventoryTable from "../../repositories/inventoryRepository";
import { INVALID_INVENTORY_ID_ERROR, CONNECTION_ERROR } from "../../constants";

async function getInventoryById(req: Request, res: Response) {
  const id = Number(req.params.id);
  try {
    const inventry = await InventoryTable.getInventory(id);
    if (inventry === null) throw INVALID_INVENTORY_ID_ERROR.type;

    res.status(200).send(inventry);
  } catch (err) {
    if (err === INVALID_INVENTORY_ID_ERROR.type) {
      res.status(400).send(INVALID_INVENTORY_ID_ERROR.message(id));
    } else res.status(500).send(CONNECTION_ERROR.message());
  }
}

export default getInventoryById;
