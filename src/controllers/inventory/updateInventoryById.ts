import { Request, Response } from "express";

import InventoryTable from "../../repositories/inventoryRepository";
import { INVALID_ITEM_TYPE_ERROR, INVALID_INVENTORY_ID_ERROR, CONNECTION_ERROR, INVENTORIES } from "../../constants";
import { checkType, TYPE } from "../../validations";

async function updateInventoryById(req: Request, res: Response) {
  const id = Number(req.params.id);
  const name: string | null = req.body[INVENTORIES.NAME] !== undefined ? req.body[INVENTORIES.NAME] : null;
  const description: string | null =
    req.body[INVENTORIES.DESCRIPTION] !== undefined ? req.body[INVENTORIES.DESCRIPTION] : null;
  const price: number | null = req.body[INVENTORIES.PRICE] !== undefined ? req.body[INVENTORIES.PRICE] : null;
  const quantityAvailable: number | null =
    req.body[INVENTORIES.QUANTITY_AVAILABLE] !== undefined ? req.body[INVENTORIES.QUANTITY_AVAILABLE] : null;

  try {
    if (name !== null) checkType(name, INVENTORIES.NAME, TYPE.STRING);
    if (description !== null) checkType(description, INVENTORIES.DESCRIPTION, TYPE.STRING);
    if (price !== null) checkType(price, INVENTORIES.PRICE, TYPE.NUMBER);
    if (quantityAvailable !== null) checkType(quantityAvailable, INVENTORIES.QUANTITY_AVAILABLE, TYPE.NUMBER);

    await InventoryTable.updateInventory(id, name, description, price, quantityAvailable);

    res.send("The inventory is successfully updated");
  } catch (err) {
    if (err === INVALID_INVENTORY_ID_ERROR.type) {
      res.status(400).send(INVALID_INVENTORY_ID_ERROR.message(id));
    } else if (err.error_type === INVALID_ITEM_TYPE_ERROR.type) {
      res.status(400).send(INVALID_ITEM_TYPE_ERROR.message(err.name, err.type));
    } else res.status(400).send(CONNECTION_ERROR.message());
  }
}

export default updateInventoryById;
