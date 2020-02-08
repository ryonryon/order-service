import { Request, Response } from "express";

import InventoryTable from "../../repositories/inventoryRepository";

import { CONNECTION_ERROR, INVALID_ITEM_TYPE_ERROR, INVENTORIES } from "../../constants";
import { checkType, TYPE } from "../../validations";

async function createInventory(req: Request, res: Response) {
  const name = req.body[INVENTORIES.NAME];
  const description = req.body[INVENTORIES.DESCRIPTION];
  const price = req.body[INVENTORIES.PRICE];
  const quantityAvailable = req.body[INVENTORIES.QUANTITY_AVAILABLE];

  try {
    checkType(name, INVENTORIES.NAME, TYPE.STRING);
    checkType(description, INVENTORIES.DESCRIPTION, TYPE.STRING);
    checkType(price, INVENTORIES.PRICE, TYPE.NUMBER);
    checkType(quantityAvailable, INVENTORIES.QUANTITY_AVAILABLE, TYPE.NUMBER);

    await InventoryTable.createInventory(name, description, price, quantityAvailable);

    res.status(200).send("The inventory is successfully added.");
  } catch (err) {
    if (err.error_type === INVALID_ITEM_TYPE_ERROR.type) {
      res.status(400).send(INVALID_ITEM_TYPE_ERROR.message(err.name, err.type));
    } else res.status(500).send(CONNECTION_ERROR.message());
  }
}

export default createInventory;
