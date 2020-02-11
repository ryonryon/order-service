import { Request, Response } from "express";

import InventoryTable from "../../repositories/inventoryRepository";
import { INVALID_INVENTORY_ID_ERROR, INERNAL_SERVER_ERROR } from "../../constants/errors";

async function deleteInventoryById(req: Request, res: Response) {
  const id = Number(req.params.id);
  try {
    await InventoryTable.deleteInventry(id);

    res.status(200).send("The inventory is successfully deleted.");
  } catch (err) {
    if (err === INVALID_INVENTORY_ID_ERROR.type) {
      res.status(400).send(INVALID_INVENTORY_ID_ERROR.message(id));
    } else res.status(500).send(INERNAL_SERVER_ERROR.message());
  }
}

export default deleteInventoryById;
