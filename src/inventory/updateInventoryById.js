import InventoryTable from "../db/InventoryTable";
import { CONNECTION_ERROR, INVALID_PARAM_ERROR } from "../constants";
import { checkType, TYPE } from "../validations";

async function updateInventoryById(req, res) {
  const inventoryId = req.params.id;
  const name = req.body["name"];
  const description = req.body["description"];
  const price = req.body["price"];
  const quantityAvailable = req.body["quantity_available"];
  try {
    if (undefined === (await InventoryTable.getInventory(inventoryId)))
      throw INVALID_PARAM_ERROR.type;

    checkType(name, "name", TYPE.STRING);
    checkType(description, "description", TYPE.STRING);
    checkType(price, "price", TYPE.NUMBER);
    checkType(quantityAvailable, "quantity_available", TYPE.NUMBER);

    await InventoryTable.updateInventory(
      inventoryId,
      name,
      description,
      price,
      quantityAvailable
    );
    res.send("The inventory is successfully updated");
  } catch (err) {
    if (err === INVALID_PARAM_ERROR.type)
      res.status(400).send(INVALID_PARAM_ERROR.message(inventoryId));

    if (err.error_type === INVALID_ITEM_TYPE_ERROR.type)
      res.status(400).send(INVALID_ITEM_TYPE_ERROR.message(err.name, err.type));

    res.status(400).send(CONNECTION_ERROR.message());
  }
}

export default updateInventoryById;
