import InventoryTable from "../db/InventoryTable";
import { CONNECTION_ERROR, INVALID_ITEM_TYPE_ERROR } from "../constants";
import { checkType, TYPE } from "../validations";

async function createInventory(req, res) {
  const name = req.body["name"];
  const description = req.body["description"];
  const price = req.body["price"];
  const quantityAvailable = req.body["quantity_available"];

  try {
    checkType(name, "name", TYPE.STRING);
    checkType(description, "description", TYPE.STRING);
    checkType(price, "price", TYPE.NUMBER);
    checkType(quantityAvailable, "quantity_available", TYPE.NUMBER);

    await InventoryTable.createInventory(
      name,
      description,
      price,
      quantityAvailable
    );

    res.status(200).send("Inventory is successfully added.");
  } catch (err) {
    if (err.error_type === INVALID_ITEM_TYPE_ERROR.type)
      res.status(400).send(INVALID_ITEM_TYPE_ERROR.message(err.name, err.type));
    else res.status(500).send(CONNECTION_ERROR.message());
  }
}

export default createInventory;
